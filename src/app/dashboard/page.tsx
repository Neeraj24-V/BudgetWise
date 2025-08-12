"use client";

import { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your AI Financial Co-Pilot. How can I help you today?", isUser: false },
    { id: '2', text: "How much did I spend on coffee last month?", isUser: true },
    { id: '3', text: "Let me check... You spent $78.50 on coffee last month.", isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: input,
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setInput('');
    // TODO: Add backend call to get AI response
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.isUser ? 'justify-end' : ''
              )}
            >
              {!message.isUser && (
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <Card
                className={cn(
                  'max-w-[75%] p-3 rounded-lg',
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <CardContent className="p-0 text-sm">
                  {message.text}
                </CardContent>
              </Card>
              {message.isUser && (
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t bg-background p-4 md:p-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your finances..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
