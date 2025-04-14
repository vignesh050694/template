"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/main-layout"
import { MessageSquare, Users, Video, Calendar, Plus, FileText } from "lucide-react"

// Mock data for active discussions
const activeDiscussions = [
  {
    id: "DISC-001",
    title: "Suspicious Login Activity Investigation",
    participants: ["John Doe", "Jane Smith", "Alex Johnson"],
    lastMessage: "I've identified the source IP address as belonging to a known threat actor.",
    lastActivity: "10 minutes ago",
    unreadCount: 3,
    relatedCase: "CASE-001",
  },
  {
    id: "DISC-002",
    title: "Ransomware Response Planning",
    participants: ["Jane Smith", "Alex Johnson", "Sarah Williams"],
    lastMessage: "We should update our playbook based on the latest TTPs we've observed.",
    lastActivity: "1 hour ago",
    unreadCount: 0,
    relatedCase: "CASE-002",
  },
  {
    id: "DISC-003",
    title: "Phishing Campaign Analysis",
    participants: ["John Doe", "Sarah Williams", "Michael Brown"],
    lastMessage: "The emails are coming from a compromised legitimate domain.",
    lastActivity: "3 hours ago",
    unreadCount: 5,
    relatedCase: "CASE-003",
  },
]

// Mock data for scheduled meetings
const scheduledMeetings = [
  {
    id: "MEET-001",
    title: "Daily Security Briefing",
    time: "Today, 9:00 AM",
    participants: ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    status: "upcoming",
  },
  {
    id: "MEET-002",
    title: "Incident Response Review",
    time: "Today, 2:00 PM",
    participants: ["John Doe", "Jane Smith", "Michael Brown"],
    status: "upcoming",
  },
  {
    id: "MEET-003",
    title: "Threat Intelligence Sharing",
    time: "Tomorrow, 10:00 AM",
    participants: ["Alex Johnson", "Sarah Williams", "Michael Brown"],
    status: "scheduled",
  },
]

// Mock data for team members
const teamMembers = [
  {
    id: "USER-001",
    name: "John Doe",
    role: "Senior SOC Analyst",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  },
  {
    id: "USER-002",
    name: "Jane Smith",
    role: "Threat Hunter",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
  },
  {
    id: "USER-003",
    name: "Alex Johnson",
    role: "Incident Responder",
    status: "away",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
  },
  {
    id: "USER-004",
    name: "Sarah Williams",
    role: "Malware Analyst",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
  },
  {
    id: "USER-005",
    name: "Michael Brown",
    role: "Security Engineer",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
  },
]

export function CollaborationHubView() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDiscussions = activeDiscussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.relatedCase.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredMeetings = scheduledMeetings.filter((meeting) =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTeamMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Collaboration Hub</h1>
          <p className="text-muted-foreground">Collaborate with your team on security incidents and investigations.</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search discussions, meetings, or team members..."
              className="w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button className="bg-navy-700 hover:bg-navy-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
            <Button variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="discussions">
              <MessageSquare className="mr-2 h-4 w-4" />
              Active Discussions
            </TabsTrigger>
            <TabsTrigger value="meetings">
              <Calendar className="mr-2 h-4 w-4" />
              Scheduled Meetings
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="mr-2 h-4 w-4" />
              Team Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-4">
            {filteredDiscussions.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No discussions found matching your criteria.</p>
              </div>
            ) : (
              filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">{discussion.id}</span>
                            <h3 className="font-semibold">{discussion.title}</h3>
                            {discussion.unreadCount > 0 && (
                              <Badge className="bg-navy-700">{discussion.unreadCount} new</Badge>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Related to: {discussion.relatedCase}</span>
                            <span>•</span>
                            <span>Last activity: {discussion.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">"{discussion.lastMessage}"</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {discussion.participants.map((participant, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-background">
                              <AvatarFallback>{getInitials(participant)}</AvatarFallback>
                            </Avatar>
                          ))}
                          <Button variant="outline" size="icon" className="ml-2 h-8 w-8 rounded-full">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            {filteredMeetings.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No meetings found matching your criteria.</p>
              </div>
            ) : (
              filteredMeetings.map((meeting) => (
                <Card key={meeting.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">{meeting.id}</span>
                            <h3 className="font-semibold">{meeting.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{meeting.time}</p>
                        </div>
                        <Badge
                          variant={meeting.status === "upcoming" ? "default" : "outline"}
                          className={meeting.status === "upcoming" ? "bg-navy-700" : ""}
                        >
                          {meeting.status === "upcoming" ? "Starting Soon" : "Scheduled"}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Participants:</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {meeting.participants.map((participant, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{getInitials(participant)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{participant}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                        <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTeamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          <span
                            className={`h-2 w-2 rounded-full ${
                              member.status === "online"
                                ? "bg-green-500"
                                : member.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-gray-300"
                            }`}
                          ></span>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                <MessageSquare className="h-6 w-6 text-navy-700" />
                <span>Start Group Chat</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                <Video className="h-6 w-6 text-navy-700" />
                <span>Instant Meeting</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                <FileText className="h-6 w-6 text-navy-700" />
                <span>Share Documents</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                <Calendar className="h-6 w-6 text-navy-700" />
                <span>Schedule Briefing</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}
