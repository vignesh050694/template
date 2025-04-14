"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CollaborationPanelProps {
  caseId: string
}

const messages = [
  {
    id: "MSG-001",
    user: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
    timestamp: "2023-04-03T10:45:00Z",
    content: "I've started investigating the suspicious login activity.",
  },
  {
    id: "MSG-002",
    user: "System",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SYS",
    timestamp: "2023-04-03T10:50:00Z",
    content: "Vignesh was added as a watcher.",
    isSystem: true,
  },
  {
    id: "MSG-003",
    user: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
    timestamp: "2023-04-03T11:15:00Z",
    content: "@vignesh Can you check this IP against threat intel?",
    mentions: ["vignesh"],
  },
  {
    id: "MSG-004",
    user: "Vignesh Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VK",
    timestamp: "2023-04-03T11:30:00Z",
    content: "IP 192.168.1.100 is associated with a known threat actor group. It's on multiple blocklists.",
  },
  {
    id: "MSG-005",
    user: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    timestamp: "2023-04-03T12:00:00Z",
    content: "I've reset the admin password and enabled MFA. We should monitor for any additional suspicious activity.",
  },
]

const activeUsers = [
  {
    id: "user-001",
    name: "John Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JD",
  },
  {
    id: "user-002",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JS",
  },
  {
    id: "user-003",
    name: "Vignesh Kumar",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "VK",
  },
]

export function CollaborationPanel({ caseId }: CollaborationPanelProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="hidden w-80 flex-shrink-0 border-l bg-background md:flex md:flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold">Collaboration</h2>
        <div className="mt-4">
          <p className="mb-2 text-sm text-muted-foreground">Active now</p>
          <div className="flex -space-x-2">
            {activeUsers.map((user) => (
              <Avatar key={user.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={message.avatar} alt={message.user} />
                <AvatarFallback>{message.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.user}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className={`text-sm ${message.isSystem ? "italic text-muted-foreground" : ""}`}>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
