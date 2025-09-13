import { useState, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm CampusAI, your virtual assistant. How can I help you today?", isUser: false },
    { text: "You can ask me about academic schedules, facility hours, campus events, dining services, or library resources.", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses: Record<string, string> = {
    'hello': 'Hello! How can I assist you today?',
    'hi': 'Hi there! What can I help you with?',
    'library hours': 'The library is open Monday-Thursday from 8 AM to 10 PM, Friday from 8 AM to 6 PM, Saturday from 10 AM to 6 PM, and Sunday from 12 PM to 8 PM.',
    'dining hours': 'The main dining hall serves breakfast from 7-10 AM, lunch from 11:30 AM-2 PM, and dinner from 5-8 PM.',
    'events': 'We have a Welcome Back Festival on September 5 and a Career Fair on October 12.',
    'career fair': 'The Career Fair is on October 12, 2023 from 10:00 AM to 3:00 PM at the University Conference Center.',
    'recreation center': 'The Recreation Center is open Monday-Friday from 6 AM to 10 PM, Saturday from 8 AM to 8 PM, and Sunday from 10 AM to 6 PM.',
    'study room': 'Library study rooms can be reserved online or at the front desk for up to 4 hours per session.',
    'parking': 'Student parking is available in lots B, C, and D. A parking permit is required, which can be obtained from Campus Security.',
    'it department': 'The IT department is located in the Technology Building, room 100. They can be reached at it-support@mallareddy.edu or (555) 123-ITHELP.',
    'scholarship': 'Scholarship applications are available through the Financial Aid office. You can find applications on the student portal under "Financial Aid".',
    'default': 'I\'m not sure I understand. Could you please rephrase your question? You can ask me about academic schedules, facility hours, campus events, dining services, or library resources.'
  };

  const sampleQuestions = [
    "What are the library hours?",
    "When is the career fair?",
    "How do I reserve a study room?",
    "What dining options are available?",
    "How to apply for scholarships?",
    "Where is the IT department?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processInput = (input: string): string => {
    const lowerInput = input.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = processInput(input);
      const botMessage: Message = { text: response, isUser: false };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="flex-1 bg-card rounded-2xl overflow-hidden flex flex-col shadow-sm">
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <Bot className="h-5 w-5" />
        <h2 className="text-lg font-semibold">CampusAI Assistant</h2>
      </div>

      <div className="flex-1 p-5 overflow-y-auto h-80 md:h-96 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
              message.isUser
                ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                : "bg-accent text-accent-foreground rounded-bl-md"
            }`}
          >
            {message.text}
          </div>
        ))}
        
        {isTyping && (
          <div className="bg-accent text-accent-foreground p-3 rounded-2xl rounded-bl-md max-w-[80%]">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSampleQuestion(question)}
              className="bg-accent hover:bg-primary hover:text-primary-foreground text-accent-foreground px-3 py-1.5 rounded-full text-xs transition-all duration-300"
            >
              {question}
            </button>
          ))}
        </div>
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border flex gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          className="flex-1 rounded-full"
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="rounded-full h-11 w-11 hover:scale-110 transition-transform"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatContainer;