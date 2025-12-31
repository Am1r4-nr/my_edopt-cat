import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { mockMessages } from '@/lib/mockData';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';

export default function Messages() {
    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">
            {/* Sidebar List */}
            <Card className="w-1/3 flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search chats..." className="pl-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {mockMessages.map((msg) => (
                        <div key={msg.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer flex gap-4 items-start relative">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                {msg.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-semibold text-gray-900">{msg.sender}</span>
                                    <span className="text-xs text-gray-500">{msg.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
                            </div>
                            {msg.unread && (
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600"></span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Window */}
            <Card className="flex-1 flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                            DA
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Dr. Aminah</h3>
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

                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
                    <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none max-w-sm">
                            <p className="text-sm">Hi Dr. Aminah, just checking on Oliver's status?</p>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-white border text-gray-900 p-3 rounded-lg rounded-tl-none max-w-sm shadow-sm">
                            <p className="text-sm">Hello! Yes, I've updated his vaccination schedule. He's doing great!</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t bg-white rounded-b-xl">
                    <div className="flex gap-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
