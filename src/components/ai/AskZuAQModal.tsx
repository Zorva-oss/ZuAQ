import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { Product, UserActivity } from '../../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedProductIds?: string[];
}

interface AskZuAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  userActivity: UserActivity;
}

export const AskZuAQModal: React.FC<AskZuAQModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  userActivity,
}) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I'm your ZuAQ AI Shopping Stylist. Based on your activity, I've curated items tailored for sound quality, athletic comfort, and modern minimalism. What are you looking to elevate today?`,
      suggestedProductIds: ['beosound-horizon', 'cloudstrider-runner'],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickPrompts = [
    'Recommend running shoes for road and lifestyle',
    'Best waterproof speaker for travel & outdoors',
    'What audio gear goes best with urban fits?',
    'Show me top items on 30% bundle sale',
  ];

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-4),
          catalog: products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            department: p.department,
            price: p.price,
            stock: p.stock,
            tags: p.tags,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          data.reply ||
          `Here are the best curated recommendations matching "${textToSend}" from our catalog:`,
        suggestedProductIds: data.suggestedProductIds || ['beosound-horizon', 'cloudstrider-runner'],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Heuristic fallback
      const fallbackAiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `I recommend our top-trending BeoSound Horizon Max Wireless and CloudStrider V3 Pastel Runner! Both feature studio craftsmanship and qualify for 30% flash bundle savings today.`,
        suggestedProductIds: ['beosound-horizon', 'cloudstrider-runner'],
      };
      setMessages((prev) => [...prev, fallbackAiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden h-[85vh] max-h-[750px] flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base leading-none">
                  Ask ZuAQ — AI Shopping Stylist
                </h3>
                <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-blue-100 mt-0.5">
                Personalized product intelligence, styling pairings & live suggestions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const matchedProducts = (msg.suggestedProductIds || [])
              .map((id) => products.find((p) => p.id === id))
              .filter(Boolean) as Product[];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] space-y-3 ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Inline Suggested Products Cards */}
                  {!isUser && matchedProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {matchedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 shadow-2xs flex items-center gap-2.5 transition-all"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {prod.name}
                            </p>
                            <p className="text-xs text-blue-600 font-black">
                              ${prod.price}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={() => {
                                onSelectProduct(prod);
                                onClose();
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold rounded-lg cursor-pointer"
                            >
                              View
                            </button>
                            {prod.stock > 0 && (
                              <button
                                onClick={() => onAddToCart(prod)}
                                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                              >
                                + Add
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-500">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>Stylist is analyzing catalog & preferences...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
            Try:
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-[11px] transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for advice, gift ideas, or styling combinations..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 text-xs sm:text-sm border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-2xl shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
