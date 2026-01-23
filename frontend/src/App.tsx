import { useState } from 'react';
import { IntakeForm } from './components/IntakeForm';
import { ChatInterface } from './components/ChatInterface';
import type { IntakeFormData } from './lib/schemas';

type AppState = 'form' | 'chat' | 'rejected';

function App() {
  const [state, setState] = useState<AppState>('form');
  const [conversationId, setConversationId] = useState<string>('');
  const [requestType, setRequestType] = useState<'RETURN' | 'COMPLAINT'>('RETURN');
  const [initialImages, setInitialImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (data: IntakeFormData, id: string) => {
    setConversationId(id);
    setRequestType(data.requestType);
    setInitialImages(data.images);
    setState('chat');
    setError(null);
  };

  const handleFormError = (message: string) => {
    setError(message);
    setState('rejected');
  };

  const handleNewRequest = () => {
    setState('form');
    setConversationId('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Promotional Banner - Sinsay Style */}
      <div className="bg-[#DC2626] text-white py-2.5 px-4 text-center">
        <div className="container mx-auto max-w-[1200px] flex items-center justify-center gap-2 text-sm">
          <span className="text-base">❤</span>
          <span className="font-medium">AI-Powered Returns & Complaints Verification</span>
          <span className="hidden sm:inline ml-auto text-xs opacity-90">Online Support</span>
        </div>
      </div>

      {/* Main Header - Sinsay Style */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-[1200px]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black lowercase tracking-tight">
              sinsay
            </h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-[#64748B]">
                <span className="uppercase font-medium">en</span>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-[800px]">
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-2 md:mb-3">
            Returns & Complaints Verification
          </h2>
          <p className="text-sm md:text-base text-[#64748B] max-w-[600px] mx-auto">
            Submit your return or complaint request for AI-powered verification
          </p>
        </div>

        {error && (
          <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] px-6 py-5 rounded-sinsay-lg mb-6 shadow-sm">
            <p className="font-semibold text-base md:text-lg mb-2">Request Rejected</p>
            <p className="text-sm md:text-base mb-4">{error}</p>
            <button
              onClick={handleNewRequest}
              className="sinsay-button-primary px-6 py-2.5 text-sm md:text-base"
            >
              Start New Request
            </button>
          </div>
        )}

        {state === 'form' && (
          <div className="bg-white rounded-sinsay-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] p-8 md:p-12">
            <IntakeForm
              onSubmit={handleFormSubmit}
              onError={handleFormError}
            />
          </div>
        )}

        {state === 'chat' && conversationId && (
          <div className="bg-white rounded-sinsay-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] p-6 md:p-8 lg:p-12 flex flex-col min-h-[500px] max-h-[80vh] md:h-[600px]">
            <ChatInterface
              conversationId={conversationId}
              requestType={requestType}
              initialImages={initialImages}
              onNewRequest={handleNewRequest}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
