import React, { useState } from 'react';
import { Brain, Send, FileText, Calculator, BookOpen, MessageSquare, Sparkles } from 'lucide-react';
import LoadingSpinner from '../../global-components/ui/LoadingSpinner';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const suggestedQuestions = [
  "Comment enregistrer une facture fournisseur ?",
  "Quelles sont les écritures comptables pour une vente ?",
  "Comment calculer la TVA ?",
  "Quelles sont les règles OHADA pour l'amortissement ?",
  "Comment établir un bilan comptable ?",
];

export default function AccountantCopilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je suis votre assistant comptable OHADA. Je peux vous aider avec vos questions de comptabilité, fiscalité et conformité OHADA.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Copilote Comptable</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">Fonctionnalités</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <Calculator className="w-5 h-5" />
                <span className="text-sm">Calculs Comptables</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <FileText className="w-5 h-5" />
                <span className="text-sm">Documentation OHADA</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm">Guides Pratiques</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">Questions Fréquentes</h2>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">Assistant IA OHADA</h2>
          </div>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Nouvelle Conversation</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <Brain className="w-16 h-16 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bienvenue sur votre Copilote Comptable
              </h3>
              <p className="text-gray-600 max-w-md">
                Je suis votre assistant IA spécialisé en comptabilité OHADA. Posez-moi vos questions sur la comptabilité, la fiscalité, ou la conformité OHADA.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <LoadingSpinner fullScreen={false} size="md" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question sur la comptabilité OHADA..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 