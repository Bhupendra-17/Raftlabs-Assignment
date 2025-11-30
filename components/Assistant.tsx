import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { askAssistant } from '../services/geminiService';

export const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
      {role: 'model', content: 'Hi! I\'m your Nebula assistant. How can I help you manage your project today?'}
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    
    setIsThinking(true);
    const reply = await askAssistant(messages, userMsg);
    setIsThinking(false);
    
    setMessages(prev => [...prev, { role: 'model', content: reply }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-transform hover:scale-105 z-50 flex items-center justify-center"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-console-border z-50 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 flex justify-between items-center text-white shrink-0">
        <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <Bot size={18} />
            </div>
            <div>
                <h3 className="font-semibold text-sm">Nebula Assistant</h3>
                <p className="text-[10px] text-indigo-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                    Gemini 2.5 Flash
                </p>
            </div>
        </div>
        <div className="flex space-x-1">
             <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                <Minimize2 size={16} />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                <X size={16} />
            </button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 mt-1 shrink-0">
                        <Bot size={14} />
                    </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'
                }`}>
                    {msg.content}
                </div>
            </div>
        ))}
        {isThinking && (
             <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2 mt-1">
                        <Bot size={14} />
                    </div>
                 <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                     <div className="flex space-x-1">
                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                     </div>
                 </div>
             </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 shrink-0">
        <div className="relative">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your data..."
                className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all border border-transparent focus:border-indigo-200"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
                <Send size={14} />
            </button>
        </div>
        <div className="text-[10px] text-center text-gray-400 mt-2">
            AI can make mistakes. Verify important info.
        </div>
      </div>
    </div>
  );
};