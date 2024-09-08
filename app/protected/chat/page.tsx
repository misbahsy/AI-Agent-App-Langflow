'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SendIcon, BotIcon, UserIcon, MenuIcon, XIcon, PlusIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  last_message_date: Date;
}

interface ChatSessionData {
  session_id: string;
  title: string;
  timestamp: string;
}

const GlowingCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className="relative bg-black bg-opacity-50 rounded-lg p-6 ring-1 ring-gray-900/5 shadow-lg">
      {children}
    </div>
  </div>
)

const ShimmeringButton: React.FC<{ children: React.ReactNode; onClick: () => void; className?: string }> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 font-bold text-white rounded-full group ${className}`}
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
    <span className="relative">{children}</span>
  </button>
)

export default function EnhancedChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchChatSessions();
    newChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatSessions = async () => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('session_id, title, timestamp')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching chat sessions:', error);
    } else {
      const uniqueSessions = (data as ChatSessionData[]).reduce((acc: ChatSession[], curr) => {
        if (!acc.find(session => session.id === curr.session_id)) {
          acc.push({
            id: curr.session_id,
            title: curr.title,
            last_message_date: new Date(curr.timestamp)
          });
        }
        return acc;
      }, []);
      setChatSessions(uniqueSessions);
    }
  };

  const newChat = () => {
    const sessionId = uuidv4();
    setCurrentSessionId(sessionId);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: uuidv4(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: currentSessionId,
          title: chatSessions.find(session => session.id === currentSessionId)?.title || inputMessage.substring(0, 50) + '...',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (data.message) {
        const aiResponse: Message = {
          id: uuidv4(),
          content: data.message,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } else {
        throw new Error('No message in response');
      }

      fetchChatSessions();
    } catch (error) {
      console.error('Error calling chat API:', error);
      setMessages(prevMessages => [...prevMessages, {
        id: uuidv4(),
        content: `Error: ${(error as Error).message}`,
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const loadChatSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error loading chat session:', error);
    } else {
      const loadedMessages: Message[] = (data as any[]).map(msg => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender as 'user' | 'ai',
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(loadedMessages);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50 z-0"></div>
      
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 z-50 overflow-y-auto flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
              <h2 className="text-xl font-bold">Chat History</h2>
              <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                <XIcon size={24} />
              </button>
            </div>
            <div className="p-4 flex-grow">
              <ShimmeringButton onClick={newChat} className="w-full mb-4">
                <PlusIcon size={16} className="mr-2" />
                New Chat
              </ShimmeringButton>
              {chatSessions.map((session) => (
                <div 
                  key={session.id} 
                  className="mb-2 p-2 hover:bg-gray-800 rounded cursor-pointer"
                  onClick={() => loadChatSession(session.id)}
                >
                  <h3 className="font-medium truncate">{session.title}</h3>
                  <p className="text-sm text-gray-400">{session.last_message_date.toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-800">
              <Link href="/" className="block w-full mb-2">
                <ShimmeringButton onClick={toggleSidebar} className="w-full">
                  Home
                </ShimmeringButton>
              </Link>
              <LogoutButton className="w-full" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-grow flex flex-col relative z-10">
        <header className="p-4 border-b border-gray-800 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <MenuIcon size={24} />
          </button>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AI Research Assistant Chat</h1>
          <div className="w-6"></div> {/* Placeholder for alignment */}
        </header>

        <main className="flex-grow p-4 overflow-hidden">
          <GlowingCard className="h-full flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3/4 p-3 rounded-lg ${message.sender === 'user' ? 'bg-purple-700' : 'bg-blue-700'}`}>
                    <div className="flex items-center mb-1">
                      {message.sender === 'user' ? (
                        <UserIcon className="w-4 h-4 mr-2" />
                      ) : (
                        <BotIcon className="w-4 h-4 mr-2" />
                      )}
                      <span className="text-xs text-gray-300">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-blue-700 p-3 rounded-lg">
                    <p>AI is typing...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-grow p-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ShimmeringButton onClick={handleSendMessage} className="p-2 rounded-full">
                <SendIcon className="w-6 h-6" />
              </ShimmeringButton>
            </div>
          </GlowingCard>
        </main>

        <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2023 AI Research Assistant. All rights reserved.
        </footer>
      </div>
    </div>
  )
}