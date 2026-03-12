"use client"

import { useState } from "react"
import Link from "next/link"
import { MobileLayout } from "@/components/mobile-layout"
import { useRole } from "@/contexts/role-context"
import { 
  MessageCircle, 
  Search, 
  MoreVertical,
  Check,
  CheckCheck
} from "lucide-react"

interface ChatItem {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  isRead: boolean
  avatar: string
  isOnline: boolean
}

const driverChats: ChatItem[] = [
  {
    id: "1",
    name: "Sardor Aliyev",
    lastMessage: "Salom, safar hali bormi?",
    time: "10:30",
    unread: 2,
    isRead: false,
    avatar: "S",
    isOnline: true
  },
  {
    id: "2", 
    name: "Dilshod Karimov",
    lastMessage: "Rahmat, yaxshi yetib oldim",
    time: "09:15",
    unread: 0,
    isRead: true,
    avatar: "D",
    isOnline: false
  },
  {
    id: "3",
    name: "Aziz Toshmatov",
    lastMessage: "Qaysi mashinada kelasiz?",
    time: "Kecha",
    unread: 0,
    isRead: true,
    avatar: "A",
    isOnline: false
  },
]

const passengerChats: ChatItem[] = [
  {
    id: "4",
    name: "Bobur - Haydovchi",
    lastMessage: "5 daqiqada yetib boraman",
    time: "11:45",
    unread: 1,
    isRead: false,
    avatar: "B",
    isOnline: true
  },
  {
    id: "5",
    name: "Jasur - Haydovchi", 
    lastMessage: "Xayr, yaxshi yo'l!",
    time: "Kecha",
    unread: 0,
    isRead: true,
    avatar: "J",
    isOnline: false
  },
]

export default function ChatPage() {
  const { role } = useRole()
  const [searchQuery, setSearchQuery] = useState("")
  
  const chats = role === "driver" ? driverChats : passengerChats
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-background">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border/50">
          <h1 className="text-xl font-bold text-foreground mb-3">Xabarlar</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </header>

        {/* Chat List */}
        <div className="flex-1 overflow-auto">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Xabarlar yo'q</h3>
              <p className="text-sm text-muted-foreground">
                {role === "driver" 
                  ? "Yo'lovchilar bilan suhbatlar shu yerda ko'rinadi"
                  : "Haydovchilar bilan suhbatlar shu yerda ko'rinadi"
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {filteredChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-muted/50 transition-colors text-left"
                >
                  {/* Avatar with online indicator */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      role === "driver" ? "bg-emerald-500" : "bg-primary"
                    }`}>
                      {chat.avatar}
                    </div>
                    {chat.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                      <span className={`text-xs ${chat.unread > 0 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate pr-2">{chat.lastMessage}</p>
                      {chat.unread > 0 ? (
                        <span className={`min-w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                          role === "driver" ? "bg-emerald-500" : "bg-primary"
                        }`}>
                          {chat.unread}
                        </span>
                      ) : (
                        <CheckCheck className={`w-4 h-4 ${chat.isRead ? "text-primary" : "text-muted-foreground"}`} />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}
