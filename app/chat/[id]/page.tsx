"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { useRole } from "@/contexts/role-context"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  Trash2,
  Copy,
  X,
  Loader2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  text: string
  time: string
  isMe: boolean
  isRead: boolean
  type: "text" | "image"
  imageUrl?: string
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: string
}

// Mock data - in real app this would come from API/database
const mockUsers: Record<string, ChatUser> = {
  "1": { id: "1", name: "Sardor Aliyev", avatar: "S", isOnline: true },
  "2": { id: "2", name: "Dilshod Karimov", avatar: "D", isOnline: false, lastSeen: "30 daqiqa oldin" },
  "3": { id: "3", name: "Aziz Toshmatov", avatar: "A", isOnline: false, lastSeen: "2 soat oldin" },
  "4": { id: "4", name: "Bobur - Haydovchi", avatar: "B", isOnline: true },
  "5": { id: "5", name: "Jasur - Haydovchi", avatar: "J", isOnline: false, lastSeen: "Kecha" },
}

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Salom, safar hali bormi?", time: "10:25", isMe: false, isRead: true, type: "text" },
    { id: "2", text: "Salom! Ha, bor. Soat 14:00 da jo'naymiz", time: "10:28", isMe: true, isRead: true, type: "text" },
    { id: "3", text: "Juda yaxshi, men tayyor bo'laman", time: "10:30", isMe: false, isRead: true, type: "text" },
  ],
  "2": [
    { id: "1", text: "Yaxshi yetib oldingizmi?", time: "09:10", isMe: true, isRead: true, type: "text" },
    { id: "2", text: "Rahmat, yaxshi yetib oldim", time: "09:15", isMe: false, isRead: true, type: "text" },
  ],
  "3": [
    { id: "1", text: "Assalomu alaykum", time: "Kecha", isMe: false, isRead: true, type: "text" },
    { id: "2", text: "Vaalaykum assalom", time: "Kecha", isMe: true, isRead: true, type: "text" },
    { id: "3", text: "Qaysi mashinada kelasiz?", time: "Kecha", isMe: false, isRead: true, type: "text" },
  ],
  "4": [
    { id: "1", text: "Qayerdasiz hozir?", time: "11:40", isMe: true, isRead: true, type: "text" },
    { id: "2", text: "5 daqiqada yetib boraman", time: "11:45", isMe: false, isRead: false, type: "text" },
  ],
  "5": [
    { id: "1", text: "Rahmat, yaxshi safar bo'ldi", time: "Kecha", isMe: true, isRead: true, type: "text" },
    { id: "2", text: "Xayr, yaxshi yo'l!", time: "Kecha", isMe: false, isRead: true, type: "text" },
  ],
}

export default function ChatConversationPage() {
  const params = useParams()
  const router = useRouter()
  const { role } = useRole()
  const chatId = params.id as string
  
  const [messages, setMessages] = useState<Message[]>(mockMessages[chatId] || [])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const user = mockUsers[chatId] || { id: chatId, name: "Foydalanuvchi", avatar: "?", isOnline: false }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (user.isOnline && messages.length > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 2000)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [messages, user.isOnline])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    
    setIsSending(true)
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      isRead: false,
      type: "text"
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setMessages(prev => [...prev, message])
    setNewMessage("")
    setIsSending(false)
    
    // Simulate read receipt after a delay
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === message.id ? { ...m, isRead: true } : m)
      )
    }, 2000)
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId))
    setSelectedMessage(null)
  }

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
    setSelectedMessage(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const message: Message = {
          id: Date.now().toString(),
          text: "",
          time: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
          isMe: true,
          isRead: false,
          type: "image",
          imageUrl: event.target?.result as string
        }
        setMessages(prev => [...prev, message])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const primaryColor = role === "driver" ? "bg-emerald-500" : "bg-primary"
  const primaryColorText = role === "driver" ? "text-emerald-500" : "text-primary"

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${primaryColor}`}>
            {user.avatar}
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-foreground truncate">{user.name}</h1>
            <p className="text-xs text-muted-foreground">
              {user.isOnline ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Online
                </span>
              ) : (
                user.lastSeen || "Offline"
              )}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Suhbatni o'chirish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.isMe
                    ? `${primaryColor} text-white`
                    : "bg-muted text-foreground"
                } ${selectedMessage === message.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
              >
                {message.type === "image" && message.imageUrl ? (
                  <img 
                    src={message.imageUrl} 
                    alt="Yuborilgan rasm" 
                    className="rounded-lg max-w-full h-auto"
                  />
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                )}
                
                <div className={`flex items-center justify-end gap-1 mt-1 ${
                  message.isMe ? "text-white/70" : "text-muted-foreground"
                }`}>
                  <span className="text-[10px]">{message.time}</span>
                  {message.isMe && (
                    message.isRead 
                      ? <CheckCheck className="w-3 h-3" />
                      : <Check className="w-3 h-3" />
                  )}
                </div>

                {/* Message actions */}
                {selectedMessage === message.id && (
                  <div className="absolute -top-10 right-0 flex items-center gap-1 bg-background border border-border rounded-lg p-1 shadow-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyMessage(message.text)
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    {message.isMe && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteMessage(message.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMessage(null)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border/50 px-4 py-3 bg-background">
          <div className="flex items-end gap-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            <div className="flex-1 relative">
              <textarea
                placeholder="Xabar yozing..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                rows={1}
                className="w-full px-4 py-2.5 bg-muted rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 max-h-32"
                style={{ minHeight: "42px" }}
              />
            </div>
            
            <Button
              size="icon"
              className={`shrink-0 rounded-full ${primaryColor} hover:opacity-90`}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
            >
              {isSending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
