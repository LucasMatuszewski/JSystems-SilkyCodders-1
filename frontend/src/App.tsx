import { useState, Fragment } from 'react';
import { IntakeForm } from './components/IntakeForm';
import { ChatInterface } from './components/ChatInterface';
import { Layout } from './components/Layout';
import './App.css';

export type SessionContext = {
  orderId: string;
  intent: string;
  description: string;
  image?: string | null;
};

function App() {
  const [session, setSession] = useState<SessionContext | null>(null);

  const steps = [
    { id: 1, label: 'Informacje', active: !session },
    { id: 2, label: 'Weryfikacja AI', active: !!session },
    { id: 3, label: 'Decyzja', active: false },
  ];

  return (
    <Layout>
      <div className="bg-white p-2 md:p-6 animate-fade-in">
        <div className="max-w-lg mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-3xl font-black mb-4 tracking-tight">
              Automatyczny Asystent Zwrotów
            </h1>

            {/* Progress Chart / Steps */}
            <div className="flex justify-center items-center gap-2 md:gap-8 mb-12">
              {steps.map((step, i) => (
                <Fragment key={step.id}>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        step.active ? 'text-black' : 'text-gray-300'
                      }`}
                    >
                      {step.id}. {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 md:w-16 h-[1px] bg-gray-300">
                      <div
                        className={`h-full bg-black transition-all duration-1000 ${
                          session && i === 0 ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {!session
                ? 'Wypełnij poniższe dane, aby rozpocząć proces analizy Twojego zgłoszenia przez sztuczną inteligencję.'
                : 'Nasza AI analizuje teraz Twój przypadek. Możesz doprecyzować szczegódy w czacie.'}
            </p>
          </header>

          <div className="relative">
            {!session ? (
              <IntakeForm onSubmit={setSession} />
            ) : (
              <ChatInterface session={session} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
