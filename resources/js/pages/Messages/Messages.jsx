import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import api from '@/lib/api';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get('/api/messages');
                setMessages(response.data);
                if (response.data.length > 0) setActiveChat(response.data[0]);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;
        // Optimistic update
        // In real app, would post to backend
        console.log('Sending message:', text);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading messages...</div>;

    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">
            {/* Sidebar List */}
            <Card className="w-1/3 flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search chats..." className="pl-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setActiveChat(msg)}
                            className={`p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex gap-4 items-start relative
                                ${activeChat?.id === msg.id ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
                        >
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                {msg.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-semibold text-gray-900 dark:text-white">{msg.sender}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{msg.preview}</p>
                            </div>
                            {msg.unread && (
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600"></span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Window */}
            {activeChat ? (
                <Card className="flex-1 flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                                {activeChat.avatar}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{activeChat.sender}</h3>
                                <span className="text-xs text-green-600 flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-1"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                        {activeChat.content.map((c, i) => (
                            <div key={i} className={`flex ${c.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-sm shadow-sm
                                    ${c.sender === 'me'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-900 border dark:border-gray-700 rounded-tl-none'}`}>
                                    <p className="text-sm">{c.text}</p>
                                </div>
                            </div>
                        ))}
                        {activeChat.content.length === 0 && (
                            <div className="text-center text-gray-400 mt-10">No messages yet. Say hello!</div>
                        )}
                    </div>

                    <div className="p-4 border-t bg-white dark:bg-gray-800 rounded-b-xl">
                        <div className="flex gap-2">
                            <Input placeholder="Type a message..." className="flex-1" />
                            <Button size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    Select a chat to start messaging
                </div>
            )}
        </div>
    );
}
