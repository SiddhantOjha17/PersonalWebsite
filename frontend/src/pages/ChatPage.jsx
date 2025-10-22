import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { postChatMessage } from '../api.js';

const normalizeNavigation = (payload) => {
  if (!payload) return null;
  const normalized = payload.toLowerCase().trim();

  if (['project', 'projects', 'projects page', 'project page'].includes(normalized)) {
    return 'projects';
  }
  if (['blog', 'blogs', 'blog page', 'blogs page'].includes(normalized)) {
    return 'blog';
  }
  if (['home', 'home page', 'homepage'].includes(normalized)) {
    return 'home';
  }
  if (['chat', 'chat page'].includes(normalized)) {
    return 'chat';
  }
  return null;
};

const ChatPage = ({ setActivePage }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! Ask me anything about the projects or articles in this portfolio.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await postChatMessage(trimmed);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.response ?? 'I am here to help with projects and articles.' }
      ]);
      if (data.action && data.action.type === 'NAVIGATE') {
        const target = normalizeNavigation(data.action.payload);
        if (target) {
          setActivePage(target);
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I can only answer questions about the projects and articles on this portfolio. Try asking about a project.'
        }
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <section className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-[#90a4ff]/15 backdrop-blur-xl dark:border-white/10 dark:bg-[#101733]/80 dark:shadow-black/40">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6f8cff]/20 via-transparent to-transparent opacity-80 dark:from-[#2f3f70]/40" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[#0f1a35] dark:text-[#eef1ff]">Chat with the Digital Twin</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3b4d78] dark:text-[#b8c6ff]">
              Ask about architecture decisions, evaluation strategies, or specific projects. The agent is grounded in
              the curated knowledge base and will guide you around the site when it makes sense.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4c5f93] shadow-inner shadow-white/60 dark:bg-[#1c264a]/80 dark:text-[#9fb2ff]">
            NAVIGATION AWARE
          </div>
        </div>
      </header>
      <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/80 shadow-2xl shadow-[#90a4ff]/20 backdrop-blur-2xl dark:border-white/5 dark:bg-[#0f142b]/90 dark:shadow-black/50">
        <div className="absolute inset-x-12 top-0 h-32 rounded-full bg-gradient-to-r from-[#6f8cff]/15 to-transparent blur-3xl dark:from-[#2f3f70]/30" />
        <div className="relative flex min-h-[32rem] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-6 pt-8 sm:px-10">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`message-bubble ${message.sender} ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#4c6ad7] to-[#6f8cff] text-white'
                      : 'bg-white/90 text-[#1a2746] shadow-white/50 dark:bg-[#151f3d]/90 dark:text-[#dce3ff]'
                  }`}
                >
                  {message.sender === 'bot' ? <ReactMarkdown>{message.text}</ReactMarkdown> : message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <span className="message-bubble bot bg-white/90 text-[#3b4d78] dark:bg-[#151f3d]/90 dark:text-[#9fb2ff]">
                  thinking…
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-4 border-t border-white/40 px-6 py-6 sm:flex-row sm:items-center sm:px-10 dark:border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Spotlight AI or the GraphRAG evaluation harness…"
              className="flex-1 rounded-full border border-transparent bg-white/90 px-6 py-4 text-sm text-[#121c3d] shadow-inner shadow-white/60 transition focus:outline-none focus:ring-2 focus:ring-[#6f8cff]/40 dark:bg-[#161f3a]/90 dark:text-[#eef1ff] dark:shadow-black/40 dark:focus:ring-[#6f8cff]/50"
            />
            <button
              type="submit"
              className="soft-btn-primary whitespace-nowrap px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

ChatPage.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

export default ChatPage;
