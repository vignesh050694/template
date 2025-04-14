"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar, Filter, Save, Search, User, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MainLayout } from "@/components/main-layout"
import { DateRangePicker } from "@/components/date-range-picker"
import { SavedSearches } from "@/components/saved-searches"

// Mock data for search results
const mockCases = [
  {
    id: "CASE-001",
    title: "Suspicious Login Activity from Unknown IP",
    severity: "high",
    status: "open",
    assignedTo: "John Doe",
    lastUpdated: "2 hours ago",
    tags: ["Unauthorized Access", "Suspicious IP"],
    snippet:
      "Multiple failed login attempts were detected from IP address <mark>103.12.45.77</mark> targeting the admin account.",
  },
  {
    id: "CASE-002",
    title: "Ransomware Attack on File Server",
    severity: "critical",
    status: "open",
    assignedTo: "Jane Smith",
    lastUpdated: "1 day ago",
    tags: ["Ransomware", "Malware"],
    snippet:
      "Detected <mark>ransomware</mark> encryption activity on file server FS-001. Multiple files have been encrypted with .locked extension.",
  },
  {
    id: "CASE-003",
    title: "Phishing Campaign Targeting Finance Department",
    severity: "medium",
    status: "in-progress",
    assignedTo: "Alex Johnson",
    lastUpdated: "3 hours ago",
    tags: ["Phishing", "Email"],
    snippet: "Several employees in the finance department received phishing emails claiming to be from the CFO.",
  },
  {
    id: "CASE-004",
    title: "Data Exfiltration to External IP",
    severity: "high",
    status: "open",
    assignedTo: "Sarah Williams",
    lastUpdated: "5 hours ago",
    tags: ["Data Exfiltration", "External IP"],
    snippet:
      "Large data transfer (25MB) to external IP address <mark>103.12.45.77</mark> detected from marketing server.",
  },
  {
    id: "CASE-005",
    title: "Ransomware Indicators on Workstation",
    severity: "high",
    status: "open",
    assignedTo: "John Doe",
    lastUpdated: "1 hour ago",
    tags: ["Ransomware", "Endpoint"],
    snippet:
      "Detected potential <mark>ransomware</mark> indicators on workstation WS-045. Suspicious process activity and file modifications observed.",
  },
]

const mockEvents = [
  {
    id: "EVT-001",
    title: "Failed Login Attempt",
    source: "103.12.45.77",
    destination: "admin.company.com",
    timestamp: "2023-04-03T10:15:30Z",
    type: "Authentication",
    confidence: 85,
    snippet: "Failed login attempt from IP <mark>103.12.45.77</mark> for user admin@company.com. Invalid password.",
  },
  {
    id: "EVT-002",
    title: "Ransomware File Encryption",
    source: "WS-045",
    destination: "FS-001",
    timestamp: "2023-04-03T11:30:45Z",
    type: "Malware",
    confidence: 95,
    snippet:
      "Detected <mark>ransomware</mark> encryption patterns. Multiple files being renamed with .locked extension.",
  },
  {
    id: "EVT-003",
    title: "Data Exfiltration",
    source: "MKT-SERVER",
    destination: "103.12.45.77",
    timestamp: "2023-04-03T12:45:15Z",
    type: "Data",
    confidence: 90,
    snippet: "Large data transfer (25MB) to external IP address <mark>103.12.45.77</mark> over non-standard port.",
  },
]

const mockTasks = [
  {
    id: "TASK-001",
    title: "Investigate IP 103.12.45.77",
    assignedTo: "John Doe",
    dueDate: "2023-04-04T17:00:00Z",
    status: "in-progress",
    priority: "high",
    snippet:
      "Research and analyze traffic patterns from IP <mark>103.12.45.77</mark> and check against threat intelligence.",
  },
  {
    id: "TASK-002",
    title: "Analyze Ransomware Samples",
    assignedTo: "Jane Smith",
    dueDate: "2023-04-05T17:00:00Z",
    status: "pending",
    priority: "critical",
    snippet: "Perform analysis on <mark>ransomware</mark> samples collected from affected systems to identify IOCs.",
  },
]

interface SearchResultsViewProps {
  initialQuery?: string
}

export function SearchResultsView({ initialQuery = "" }: SearchResultsViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState("cases")
  const [filters, setFilters] = useState({
    status: "all",
    severity: "all",
    assignedTo: "all",
    caseType: "all",
    sourceIP: "",
    destinationIP: "",
    eventType: "all",
    confidenceScore: [0, 100],
  })
  const [isSaveSearchOpen, setIsSaveSearchOpen] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [savedSearches, setSavedSearches] = useState<Array<{ name: string; query: string; filters: any }>>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    // Load saved searches from localStorage
    const saved = localStorage.getItem("savedSearches")
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    }

    // Update query from URL if present
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [initialQuery])

  const handleSearch = () => {
    // In a real app, this would trigger an API call with the filters
    // For now, we'll just update the URL
    const params = new URLSearchParams()
    if (query) params.set("q", query)

    router.push(`/search?${params.toString()}`)
  }

  const handleSaveSearch = () => {
    if (!searchName.trim()) return

    const newSearch = {
      name: searchName,
      query,
      filters,
    }

    const updatedSearches = [...savedSearches, newSearch]
    setSavedSearches(updatedSearches)
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches))

    setIsSaveSearchOpen(false)
    setSearchName("")
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  // Filter results based on query and filters
  const filteredCases = mockCases.filter((caseItem) => {
    if (
      query &&
      !caseItem.title.toLowerCase().includes(query.toLowerCase()) &&
      !caseItem.snippet.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }

    if (filters.status !== "all" && caseItem.status !== filters.status) {
      return false
    }

    if (filters.severity !== "all" && caseItem.severity !== filters.severity) {
      return false
    }

    if (filters.assignedTo !== "all" && caseItem.assignedTo !== filters.assignedTo) {
      return false
    }

    if (filters.caseType !== "all" && !caseItem.tags.includes(filters.caseType)) {
      return false
    }

    return true
  })

  const filteredEvents = mockEvents.filter((event) => {
    if (
      query &&
      !event.title.toLowerCase().includes(query.toLowerCase()) &&
      !event.snippet.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }

    if (filters.sourceIP && !event.source.includes(filters.sourceIP)) {
      return false
    }

    if (filters.destinationIP && !event.destination.includes(filters.destinationIP)) {
      return false
    }

    if (filters.eventType !== "all" && event.type !== filters.eventType) {
      return false
    }

    if (event.confidence < filters.confidenceScore[0] || event.confidence > filters.confidenceScore[1]) {
      return false
    }

    return true
  })

  const filteredTasks = mockTasks.filter((task) => {
    if (
      query &&
      !task.title.toLowerCase().includes(query.toLowerCase()) &&
      !task.snippet.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }

    if (filters.assignedTo !== "all" && task.assignedTo !== filters.assignedTo) {
      return false
    }

    return true
  })

  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col">
        <div className="border-b bg-background p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <div className="flex items-center gap-2">
              <Dialog open={isSaveSearchOpen} onOpenChange={setIsSaveSearchOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save Search
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Search</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input
                      placeholder="Search name"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsSaveSearchOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveSearch} className="bg-navy-700 hover:bg-navy-800">
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="md:hidden" onClick={() => setShowMobileFilters(!showMobileFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cases, events, IPs, emails..."
                className="w-full rounded-lg bg-background pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-navy-700 hover:bg-navy-800">
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row">
          {/* Filters Sidebar - Desktop */}
          <div
            className={`w-full border-b md:w-64 md:border-b-0 md:border-r md:flex md:flex-col ${showMobileFilters ? "block" : "hidden md:block"}`}
          >
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <SavedSearches
                  savedSearches={savedSearches}
                  onSelectSearch={(search) => {
                    setQuery(search.query)
                    setFilters(search.filters)
                    setShowMobileFilters(false)
                    handleSearch()
                  }}
                />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Case Filters</h3>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.severity} onValueChange={(value) => handleFilterChange("severity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.assignedTo} onValueChange={(value) => handleFilterChange("assignedTo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Assigned To" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Analysts</SelectItem>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                      <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                    </SelectContent>
                  </Select>

                  <DateRangePicker />

                  <Select value={filters.caseType} onValueChange={(value) => handleFilterChange("caseType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Case Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Phishing">Phishing</SelectItem>
                      <SelectItem value="Ransomware">Ransomware</SelectItem>
                      <SelectItem value="Malware">Malware</SelectItem>
                      <SelectItem value="Data Exfiltration">Data Exfiltration</SelectItem>
                      <SelectItem value="Unauthorized Access">Unauthorized Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Event Filters</h3>
                  <Input
                    placeholder="Source IP"
                    value={filters.sourceIP}
                    onChange={(e) => handleFilterChange("sourceIP", e.target.value)}
                  />

                  <Input
                    placeholder="Destination IP"
                    value={filters.destinationIP}
                    onChange={(e) => handleFilterChange("destinationIP", e.target.value)}
                  />

                  <Select value={filters.eventType} onValueChange={(value) => handleFilterChange("eventType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Authentication">Authentication</SelectItem>
                      <SelectItem value="Malware">Malware</SelectItem>
                      <SelectItem value="Data">Data Transfer</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Confidence Score</span>
                      <span className="text-sm text-muted-foreground">
                        {filters.confidenceScore[0]}% - {filters.confidenceScore[1]}%
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={filters.confidenceScore}
                      onValueChange={(value) => handleFilterChange("confidenceScore", value)}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setFilters({
                        status: "all",
                        severity: "all",
                        assignedTo: "all",
                        caseType: "all",
                        sourceIP: "",
                        destinationIP: "",
                        eventType: "all",
                        confidenceScore: [0, 100],
                      })
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="cases">Cases ({filteredCases.length})</TabsTrigger>
                <TabsTrigger value="events">Events ({filteredEvents.length})</TabsTrigger>
                <TabsTrigger value="tasks">Tasks ({filteredTasks.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="cases" className="space-y-4">
                {filteredCases.length === 0 ? (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-muted-foreground">No cases found matching your criteria.</p>
                  </div>
                ) : (
                  filteredCases.map((caseItem) => (
                    <Card key={caseItem.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`w-full md:w-1 ${getSeverityColor(caseItem.severity)}`}></div>
                          <div className="flex flex-1 flex-col p-4">
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">{caseItem.id}</span>
                                  <Link
                                    href={`/cases/${caseItem.id}?highlight=${encodeURIComponent(query)}`}
                                    className="font-semibold hover:underline"
                                  >
                                    {caseItem.title}
                                  </Link>
                                </div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {caseItem.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="font-normal">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Badge variant={getStatusVariant(caseItem.status)} className="capitalize">
                                {caseItem.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <p
                                className="text-sm text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: caseItem.snippet }}
                              ></p>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{getInitials(caseItem.assignedTo)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{caseItem.assignedTo}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">Updated {caseItem.lastUpdated}</span>
                              </div>
                              <Link href={`/cases/${caseItem.id}?highlight=${encodeURIComponent(query)}`}>
                                <Button size="sm" className="bg-navy-700 hover:bg-navy-800">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-muted-foreground">No events found matching your criteria.</p>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">{event.id}</span>
                              <h3 className="font-semibold">{event.title}</h3>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {event.type}
                            </Badge>
                          </div>
                          <p
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: event.snippet }}
                          ></p>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Source:</span>
                              <span>{event.source}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Destination:</span>
                              <span>{event.destination}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Time:</span>
                              <span>{new Date(event.timestamp).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Confidence:</span>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-24 rounded-full bg-muted">
                                  <div
                                    className={`h-full rounded-full ${getConfidenceColor(event.confidence)}`}
                                    style={{ width: `${event.confidence}%` }}
                                  />
                                </div>
                                <span className="text-xs">{event.confidence}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-muted-foreground">No tasks found matching your criteria.</p>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <Card key={task.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">{task.id}</span>
                              <h3 className="font-semibold">{task.title}</h3>
                            </div>
                            <Badge variant={getPriorityVariant(task.priority)} className="capitalize">
                              {task.priority}
                            </Badge>
                          </div>
                          <p
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: task.snippet }}
                          ></p>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{task.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <Badge variant={getStatusVariant(task.status)} className="capitalize">
                              {task.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-600"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-blue-500"
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case "open":
      return "secondary"
    case "in-progress":
      return "default"
    case "resolved":
      return "outline"
    case "pending":
      return "secondary"
    case "completed":
      return "outline"
    default:
      return "secondary"
  }
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "critical":
      return "destructive"
    case "high":
      return "destructive"
    case "medium":
      return "warning"
    case "low":
      return "secondary"
    default:
      return "default"
  }
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return "bg-green-500"
  if (confidence >= 70) return "bg-yellow-500"
  return "bg-red-500"
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}
