import type { SessionContext } from '../App';
import { useRef, useEffect, useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface({ session }: { session: SessionContext }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-1', role: 'user', content: session.description },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSentInitialRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(
    async (userMessages: Message[], isInitial = false) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('[Chat] Sending request to /api/chat');
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: session.orderId,
            intent: session.intent,
            description: session.description,
            messages: userMessages.map((m, i) => ({
              role: m.role,
              content: m.content,
              ...(i === 0 && isInitial && session.image
                ? {
                    experimental_attachments: [{ url: session.image }],
                  }
                : {}),
            })),
          }),
        });

        console.log('[Chat] Response status:', response.status);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = '';
        const assistantId = `assistant-${Date.now()}`;
        let buffer = ''; // Buffer for incomplete lines across chunks

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          console.log('[Chat] Raw chunk:', chunk);

          // Append chunk to buffer and process complete lines
          buffer += chunk;
          const lines = buffer.split('\n');

          // Keep the last incomplete line in the buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data:0:')) {
              try {
                const jsonStr = line.slice(7); // Remove 'data:0:'
                const text = JSON.parse(jsonStr);
                assistantContent += text;

                setMessages((prev) => {
                  const existing = prev.find((m) => m.id === assistantId);
                  if (existing) {
                    return prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: assistantContent }
                        : m,
                    );
                  }
                  return [
                    ...prev,
                    {
                      id: assistantId,
                      role: 'assistant' as const,
                      content: assistantContent,
                    },
                  ];
                });
              } catch (e) {
                console.log('[Chat] Parse error for line:', line, e);
              }
            }
          }
        }

        // Process any remaining data in buffer after stream ends
        if (buffer.startsWith('data:0:')) {
          try {
            const jsonStr = buffer.slice(7);
            const text = JSON.parse(jsonStr);
            assistantContent += text;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: assistantContent } : m,
              ),
            );
          } catch (e) {
            console.log('[Chat] Parse error for final buffer:', buffer, e);
          }
        }

        console.log(
          '[Chat] Stream complete, total content length:',
          assistantContent.length,
        );
      } catch (err) {
        console.error('[Chat] Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [session],
  );

  // Send initial message on mount
  useEffect(() => {
    if (!hasSentInitialRef.current) {
      hasSentInitialRef.current = true;
      sendMessage(
        [{ id: 'init-1', role: 'user', content: session.description }],
        true,
      );
    }
  }, [sendMessage, session.description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    await sendMessage(
      newMessages.filter((m) => m.role === 'user' || m.role === 'assistant'),
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                m.role === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{m.content}</div>
              {m.id === 'init-1' && session.image && (
                <img
                  src={session.image}
                  alt="attachment"
                  className="mt-2 max-h-40 rounded border border-white/20"
                />
              )}
            </div>
          </div>
        ))}
        {isLoading &&
          messages.filter((m) => m.role === 'assistant').length === 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 text-sm animate-pulse">
                Checking policy...
              </div>
            </div>
          )}
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-100 text-red-700 rounded-lg p-3 text-sm">
              Error: {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t flex gap-2 bg-gray-50"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1 border rounded px-3 py-2 focus:ring-black focus:border-black outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white px-6 py-2 rounded font-medium disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
