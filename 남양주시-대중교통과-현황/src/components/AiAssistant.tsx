import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `안녕하세요! **남양주시 대중교통과 AI 정책 도우미**입니다. 🚍✨\n\n남양주시의 수송분담률, 버스 노선(M버스, 직행좌석, 땡큐버스), 스마트 승강장 위치, 택시 현황 및 **K-패스 · 어르신 · 어린이청소년 교통비 지원 정책**에 대해 무엇이든 편하게 물어보세요!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    '만 65세 어르신 교통비 신청 방법과 지원 금액은?',
    'K-패스 환급 비율과 신청 자격이 궁금해요',
    'M버스(광역급행) 준공영제 노선 목록 알려줘',
    '땡큐버스 및 트롤리버스 운영 현황',
    '관내 스마트 승강장 주요 편의 시설은?'
  ];

  const handleSend = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, history })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || '답변을 불러오지 못했습니다.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('AI error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `죄송합니다. 서비스 통신 중 오류가 발생했습니다: ${err.message || '다시 시도해주세요.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: `대화가 초기화되었습니다. 궁금한 점을 질문해 주세요!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md border border-emerald-800/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-900/50">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">남양주시 대중교통 AI 정책 도우미</h2>
            <p className="text-xs text-emerald-200">
              실시간 AI 맞춤 답변 (교통비 환급 신청, 노선 정보, 스마트승강장 등)
            </p>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>대화 초기화</span>
        </button>
      </div>

      {/* Quick Question Pills */}
      <div className="space-y-1.5">
        <span className="text-xs text-slate-500 font-semibold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>자주 묻는 대표 질문:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-full shadow-xs transition disabled:opacity-50 text-left font-medium"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-[480px] overflow-y-auto space-y-4 flex flex-col">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2.5 max-w-[85%] ${
              m.sender === 'user' ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                m.sender === 'user' ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              <div className="whitespace-pre-line font-sans">
                {m.text}
              </div>
              <span className={`text-[10px] block mt-1 ${m.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="self-start flex items-center space-x-2 bg-slate-100 p-3 rounded-2xl text-xs text-slate-600 animate-pulse">
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>AI가 답변을 생성하고 있습니다...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-300 shadow-xs">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="교통 정책 또는 버스/택시 현황 질문을 입력하세요..."
          disabled={loading}
          className="flex-1 px-3 py-2 text-xs sm:text-sm focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1"
        >
          <span>전송</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
