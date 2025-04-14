"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/main-layout"
import {
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Share2,
  Star,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for playbooks
const playbooks = [
  {
    id: "PB-001",
    title: "Ransomware Response",
    description: "Step-by-step guide for responding to ransomware incidents",
    category: "Incident Response",
    steps: 12,
    lastUpdated: "2 weeks ago",
    author: "Jane Smith",
    authorInitials: "JS",
    status: "published",
    starred: true,
    tags: ["Ransomware", "Critical", "Incident Response"],
    usageCount: 8,
    completionRate: 92,
  },
  {
    id: "PB-002",
    title: "Phishing Investigation",
    description: "Procedures for investigating and responding to phishing attacks",
    category: "Investigation",
    steps: 8,
    lastUpdated: "1 month ago",
    author: "John Doe",
    authorInitials: "JD",
    status: "published",
    starred: true,
    tags: ["Phishing", "Email", "Investigation"],
    usageCount: 15,
    completionRate: 88,
  },
  {
    id: "PB-003",
    title: "Data Breach Response",
    description: "Comprehensive response plan for data breach incidents",
    category: "Incident Response",
    steps: 15,
    lastUpdated: "3 weeks ago",
    author: "Alex Johnson",
    authorInitials: "AJ",
    status: "published",
    starred: false,
    tags: ["Data Breach", "Critical", "Compliance"],
    usageCount: 5,
    completionRate: 95,
  },
  {
    id: "PB-004",
    title: "Malware Analysis",
    description: "Procedures for analyzing and containing malware",
    category: "Analysis",
    steps: 10,
    lastUpdated: "2 months ago",
    author: "Sarah Williams",
    authorInitials: "SW",
    status: "published",
    starred: false,
    tags: ["Malware", "Analysis", "Containment"],
    usageCount: 12,
    completionRate: 85,
  },
  {
    id: "PB-005",
    title: "Insider Threat Investigation",
    description: "Guidelines for investigating potential insider threats",
    category: "Investigation",
    steps: 9,
    lastUpdated: "1 week ago",
    author: "Michael Brown",
    authorInitials: "MB",
    status: "draft",
    starred: false,
    tags: ["Insider Threat", "Investigation", "HR"],
    usageCount: 3,
    completionRate: 70,
  },
  {
    id: "PB-006",
    title: "DDoS Mitigation",
    description: "Steps to mitigate and recover from DDoS attacks",
    category: "Incident Response",
    steps: 7,
    lastUpdated: "3 months ago",
    author: "Jane Smith",
    authorInitials: "JS",
    status: "published",
    starred: false,
    tags: ["DDoS", "Network", "Mitigation"],
    usageCount: 6,
    completionRate: 90,
  },
]

// Mock data for recent runs
const recentRuns = [
  {
    id: "RUN-001",
    playbookId: "PB-001",
    playbookTitle: "Ransomware Response",
    startedBy: "John Doe",
    startedByInitials: "JD",
    startTime: "2023-04-03T10:15:30Z",
    status: "completed",
    caseId: "CASE-002",
    completionTime: "2023-04-03T12:45:30Z",
  },
  {
    id: "RUN-002",
    playbookId: "PB-002",
    playbookTitle: "Phishing Investigation",
    startedBy: "Sarah Williams",
    startedByInitials: "SW",
    startTime: "2023-04-02T14:30:00Z",
    status: "in-progress",
    caseId: "CASE-003",
    completionTime: null,
  },
  {
    id: "RUN-003",
    playbookId: "PB-003",
    playbookTitle: "Data Breach Response",
    startedBy: "Alex Johnson",
    startedByInitials: "AJ",
    startTime: "2023-04-01T09:00:00Z",
    status: "completed",
    caseId: "CASE-001",
    completionTime: "2023-04-01T15:20:00Z",
  },
]

export function PlaybooksView() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredPlaybooks = playbooks.filter((playbook) => {
    // Filter by search query
    if (
      searchQuery &&
      !playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !playbook.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !playbook.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by category
    if (categoryFilter !== "all" && playbook.category !== categoryFilter) {
      return false
    }

    // Filter by tab
    if (activeTab === "starred" && !playbook.starred) {
      return false
    }

    if (activeTab === "drafts" && playbook.status !== "draft") {
      return false
    }

    return true
  })

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Security Playbooks</h1>
          <p className="text-muted-foreground">
            Standardized procedures and workflows for handling security incidents and investigations.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search playbooks..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Incident Response">Incident Response</SelectItem>
                <SelectItem value="Investigation">Investigation</SelectItem>
                <SelectItem value="Analysis">Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-navy-700 hover:bg-navy-800">
              <Plus className="mr-2 h-4 w-4" />
              Create Playbook
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Playbooks</TabsTrigger>
            <TabsTrigger value="starred">
              <Star className="mr-2 h-4 w-4" />
              Starred
            </TabsTrigger>
            <TabsTrigger value="drafts">
              <FileText className="mr-2 h-4 w-4" />
              Drafts
            </TabsTrigger>
            <TabsTrigger value="runs">
              <Clock className="mr-2 h-4 w-4" />
              Recent Runs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredPlaybooks.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No playbooks found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlaybooks.map((playbook) => (
                  <PlaybookCard key={playbook.id} playbook={playbook} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="starred" className="space-y-4">
            {filteredPlaybooks.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No starred playbooks found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlaybooks.map((playbook) => (
                  <PlaybookCard key={playbook.id} playbook={playbook} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {filteredPlaybooks.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No draft playbooks found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlaybooks.map((playbook) => (
                  <PlaybookCard key={playbook.id} playbook={playbook} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="runs" className="space-y-4">
            {recentRuns.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No recent playbook runs found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentRuns.map((run) => (
                  <Card key={run.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">{run.id}</span>
                              <h3 className="font-semibold">{run.playbookTitle}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Started: {new Date(run.startTime).toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            variant={run.status === "completed" ? "outline" : "default"}
                            className={run.status === "in-progress" ? "bg-navy-700" : ""}
                          >
                            {run.status === "completed" ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{run.startedByInitials}</AvatarFallback>
                            </Avatar>
                            <span>Run by: {run.startedBy}</span>
                          </div>
                          <div>
                            <span className="font-medium">Case: </span>
                            <span>{run.caseId}</span>
                          </div>
                          {run.completionTime && (
                            <div>
                              <span className="font-medium">Completed: </span>
                              <span>{new Date(run.completionTime).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                            View Results
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

interface PlaybookCardProps {
  playbook: (typeof playbooks)[0]
}

function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{playbook.title}</CardTitle>
              {playbook.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
            </div>
            <CardDescription>{playbook.description}</CardDescription>
          </div>
          <Badge variant={playbook.status === "published" ? "outline" : "secondary"}>
            {playbook.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {playbook.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span>{playbook.steps} steps</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Used {playbook.usageCount} times</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Completion rate</span>
              <span>{playbook.completionRate}%</span>
            </div>
            <Progress value={playbook.completionRate} className="h-1" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{playbook.authorInitials}</AvatarFallback>
          </Avatar>
          <span>
            Updated {playbook.lastUpdated} by {playbook.author}
          </span>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
