"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MainLayout } from "@/components/main-layout"
import { DateRangePicker } from "@/components/date-range-picker"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import {
  BarChart3,
  Clock,
  Download,
  Eye,
  Filter,
  LineChart,
  PieChart,
  RefreshCcw,
  Save,
  Search,
  Tags,
  X,
} from "lucide-react"

// Mock data for security events - same as before
const events = [
  {
    id: "EVT-001",
    timestamp: "2023-04-03T10:15:30Z",
    source: "192.168.1.100",
    destination: "admin.company.com",
    type: "Authentication",
    subtype: "Failed Login",
    severity: "medium",
    confidence: 85,
    details: "Failed login attempt for user admin@company.com. Invalid password.",
    user: "admin@company.com",
    hostname: "DC-01",
    protocol: "HTTPS",
    application: "Admin Portal",
    country: "Russia",
    department: "IT",
    tags: ["Brute Force", "Authentication Failure"],
  },
  {
    id: "EVT-002",
    timestamp: "2023-04-03T10:16:45Z",
    source: "192.168.1.100",
    destination: "admin.company.com",
    type: "Authentication",
    subtype: "Failed Login",
    severity: "medium",
    confidence: 85,
    details: "Failed login attempt for user admin@company.com. Invalid password.",
    user: "admin@company.com",
    hostname: "DC-01",
    protocol: "HTTPS",
    application: "Admin Portal",
    country: "Russia",
    department: "IT",
    tags: ["Brute Force", "Authentication Failure"],
  },
  {
    id: "EVT-003",
    timestamp: "2023-04-03T10:18:12Z",
    source: "192.168.1.100",
    destination: "admin.company.com",
    type: "Authentication",
    subtype: "Successful Login",
    severity: "low",
    confidence: 90,
    details: "Successful login for user admin@company.com.",
    user: "admin@company.com",
    hostname: "DC-01",
    protocol: "HTTPS",
    application: "Admin Portal",
    country: "Russia",
    department: "IT",
    tags: ["Successful Authentication"],
  },
  {
    id: "EVT-004",
    timestamp: "2023-04-03T10:20:05Z",
    source: "admin.company.com",
    destination: "db.company.internal",
    type: "Database",
    subtype: "Query",
    severity: "high",
    confidence: 75,
    details: "SELECT * FROM customer_records WHERE credit_card IS NOT NULL",
    user: "db_service",
    hostname: "DB-01",
    protocol: "SQL",
    application: "Database Server",
    country: "United States",
    department: "IT",
    tags: ["Sensitive Data Access", "Database Query"],
  },
  {
    id: "EVT-005",
    timestamp: "2023-04-03T10:22:30Z",
    source: "admin.company.com",
    destination: "192.168.1.100",
    type: "Data",
    subtype: "Exfiltration",
    severity: "critical",
    confidence: 95,
    details: "Large data transfer (25MB) to external IP address.",
    user: "admin@company.com",
    hostname: "DC-01",
    protocol: "HTTPS",
    application: "Admin Portal",
    country: "Russia",
    department: "IT",
    tags: ["Data Exfiltration", "Large Transfer"],
  },
  {
    id: "EVT-006",
    timestamp: "2023-04-03T11:05:15Z",
    source: "mail.external.com",
    destination: "user@company.com",
    type: "Email",
    subtype: "Phishing",
    severity: "high",
    confidence: 88,
    details: "Suspected phishing email with malicious attachment.",
    user: "user@company.com",
    hostname: "MAIL-01",
    protocol: "SMTP",
    application: "Email Server",
    country: "United Kingdom",
    department: "Marketing",
    tags: ["Phishing", "Malicious Attachment"],
  },
  {
    id: "EVT-007",
    timestamp: "2023-04-03T11:30:45Z",
    source: "ws-045.company.internal",
    destination: "multiple",
    type: "Network",
    subtype: "Port Scan",
    severity: "medium",
    confidence: 82,
    details: "Internal host scanning multiple ports on network.",
    user: "jane.smith",
    hostname: "WS-045",
    protocol: "TCP",
    application: "Unknown",
    country: "United States",
    department: "Finance",
    tags: ["Port Scan", "Internal Threat"],
  },
  {
    id: "EVT-008",
    timestamp: "2023-04-03T12:15:20Z",
    source: "ws-045.company.internal",
    destination: "file-server.company.internal",
    type: "File",
    subtype: "Modification",
    severity: "high",
    confidence: 91,
    details: "Multiple files encrypted with .locked extension.",
    user: "jane.smith",
    hostname: "WS-045",
    protocol: "SMB",
    application: "File Server",
    country: "United States",
    department: "Finance",
    tags: ["Ransomware", "File Modification"],
  },
]

// Mock data for alerts - same as before
const alerts = [
  {
    id: "ALERT-001",
    timestamp: "2023-04-03T10:22:30Z",
    title: "Potential Data Exfiltration",
    severity: "critical",
    status: "open",
    source: "admin.company.com",
    destination: "192.168.1.100",
    relatedEvents: ["EVT-005"],
  },
  {
    id: "ALERT-002",
    timestamp: "2023-04-03T10:18:12Z",
    title: "Brute Force Attack Successful",
    severity: "high",
    status: "open",
    source: "192.168.1.100",
    destination: "admin.company.com",
    relatedEvents: ["EVT-001", "EVT-002", "EVT-003"],
  },
  {
    id: "ALERT-003",
    timestamp: "2023-04-03T11:05:15Z",
    title: "Phishing Email Detected",
    severity: "high",
    status: "investigating",
    source: "mail.external.com",
    destination: "user@company.com",
    relatedEvents: ["EVT-006"],
  },
  {
    id: "ALERT-004",
    timestamp: "2023-04-03T12:15:20Z",
    title: "Potential Ransomware Activity",
    severity: "critical",
    status: "investigating",
    source: "ws-045.company.internal",
    destination: "file-server.company.internal",
    relatedEvents: ["EVT-007", "EVT-008"],
  },
]

// Define filter categories with their options
const filterCategories = {
  basic: [
    {
      id: "eventType",
      label: "Event Type",
      type: "select",
      options: [
        { value: "all", label: "All Types" },
        { value: "Authentication", label: "Authentication" },
        { value: "Database", label: "Database" },
        { value: "Data", label: "Data" },
        { value: "Email", label: "Email" },
        { value: "Network", label: "Network" },
        { value: "File", label: "File" },
      ],
    },
    {
      id: "severity",
      label: "Severity",
      type: "select",
      options: [
        { value: "all", label: "All Severities" },
        { value: "critical", label: "Critical" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
    { id: "sourceIP", label: "Source IP", type: "input" },
    { id: "destinationIP", label: "Destination IP", type: "input" },
  ],
  identity: [
    { id: "user", label: "Username", type: "input" },
    {
      id: "department",
      label: "Department",
      type: "select",
      options: [
        { value: "all", label: "All Departments" },
        { value: "IT", label: "IT" },
        { value: "Finance", label: "Finance" },
        { value: "HR", label: "HR" },
        { value: "Marketing", label: "Marketing" },
        { value: "Sales", label: "Sales" },
      ],
    },
  ],
  network: [
    { id: "hostname", label: "Hostname", type: "input" },
    {
      id: "protocol",
      label: "Protocol",
      type: "select",
      options: [
        { value: "all", label: "All Protocols" },
        { value: "HTTP", label: "HTTP" },
        { value: "HTTPS", label: "HTTPS" },
        { value: "SMB", label: "SMB" },
        { value: "SMTP", label: "SMTP" },
        { value: "DNS", label: "DNS" },
        { value: "SQL", label: "SQL" },
        { value: "TCP", label: "TCP" },
        { value: "UDP", label: "UDP" },
      ],
    },
    {
      id: "country",
      label: "Country",
      type: "select",
      options: [
        { value: "all", label: "All Countries" },
        { value: "United States", label: "United States" },
        { value: "Russia", label: "Russia" },
        { value: "China", label: "China" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "Germany", label: "Germany" },
      ],
    },
  ],
  application: [
    {
      id: "application",
      label: "Application",
      type: "select",
      options: [
        { value: "all", label: "All Applications" },
        { value: "Admin Portal", label: "Admin Portal" },
        { value: "Database Server", label: "Database Server" },
        { value: "Email Server", label: "Email Server" },
        { value: "File Server", label: "File Server" },
        { value: "Web Server", label: "Web Server" },
      ],
    },
  ],
  tags: [
    {
      id: "tags",
      label: "Tags",
      type: "tags",
      options: [
        "Brute Force",
        "Authentication Failure",
        "Successful Authentication",
        "Sensitive Data Access",
        "Database Query",
        "Data Exfiltration",
        "Large Transfer",
        "Phishing",
        "Malicious Attachment",
        "Port Scan",
        "Internal Threat",
        "Ransomware",
        "File Modification",
      ],
    },
  ],
  advanced: [{ id: "confidenceScore", label: "Confidence Score", type: "range", min: 0, max: 100, step: 5 }],
}

export function EventExplorerView() {
  const [activeTab, setActiveTab] = useState("events")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  // Initialize filter state with all possible filters
  const [filters, setFilters] = useState(() => {
    const initialFilters: Record<string, any> = {
      confidenceScore: [0, 100],
      selectedTags: [],
    }

    // Add all category filters
    Object.values(filterCategories)
      .flat()
      .forEach((filter) => {
        if (filter.type === "tags") {
          initialFilters.selectedTags = []
        } else if (filter.type === "range") {
          initialFilters[filter.id] = [filter.min || 0, filter.max || 100]
        } else if (filter.type === "input") {
          initialFilters[filter.id] = ""
        } else {
          initialFilters[filter.id] = "all"
        }
      })

    return initialFilters
  })

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))

    // Count active filters
    setTimeout(() => {
      const activeCount = countActiveFilters()
      setActiveFilterCount(activeCount)
    }, 0)
  }

  const toggleTag = (tag: string) => {
    setFilters((prev) => {
      const currentTags = [...prev.selectedTags]
      if (currentTags.includes(tag)) {
        return { ...prev, selectedTags: currentTags.filter((t) => t !== tag) }
      } else {
        return { ...prev, selectedTags: [...currentTags, tag] }
      }
    })

    // Count active filters
    setTimeout(() => {
      const activeCount = countActiveFilters()
      setActiveFilterCount(activeCount)
    }, 0)
  }

  const resetFilters = () => {
    setFilters({
      eventType: "all",
      severity: "all",
      sourceIP: "",
      destinationIP: "",
      user: "",
      department: "all",
      hostname: "",
      protocol: "all",
      country: "all",
      application: "all",
      confidenceScore: [0, 100],
      selectedTags: [],
    })
    setActiveFilterCount(0)
  }

  const countActiveFilters = () => {
    let count = 0

    Object.entries(filters).forEach(([key, value]) => {
      if (key === "selectedTags") {
        count += (value as string[]).length
      } else if (key === "confidenceScore") {
        const [min, max] = value as number[]
        if (min > 0 || max < 100) count++
      } else if (key.includes("IP") || key === "user" || key === "hostname") {
        if (value && value !== "") count++
      } else if (value !== "all") {
        count++
      }
    })

    return count
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Filter events based on search query and filters
  const filteredEvents = events.filter((event) => {
    // Search query filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const textMatch =
        event.id.toLowerCase().includes(searchLower) ||
        event.source.toLowerCase().includes(searchLower) ||
        event.destination.toLowerCase().includes(searchLower) ||
        event.details.toLowerCase().includes(searchLower) ||
        event.user.toLowerCase().includes(searchLower) ||
        event.hostname.toLowerCase().includes(searchLower)

      if (!textMatch) return false
    }

    // Basic filters
    if (filters.eventType !== "all" && event.type !== filters.eventType) return false
    if (filters.severity !== "all" && event.severity !== filters.severity) return false
    if (filters.sourceIP && !event.source.includes(filters.sourceIP)) return false
    if (filters.destinationIP && !event.destination.includes(filters.destinationIP)) return false

    // Identity filters
    if (filters.user && !event.user.toLowerCase().includes(filters.user.toLowerCase())) return false
    if (filters.department !== "all" && event.department !== filters.department) return false

    // Network filters
    if (filters.hostname && !event.hostname.toLowerCase().includes(filters.hostname.toLowerCase())) return false
    if (filters.protocol !== "all" && event.protocol !== filters.protocol) return false
    if (filters.country !== "all" && event.country !== filters.country) return false

    // Application filters
    if (filters.application !== "all" && event.application !== filters.application) return false

    // Tag filters
    if (filters.selectedTags.length > 0) {
      const hasSelectedTag = filters.selectedTags.some((tag: string) => event.tags.includes(tag))
      if (!hasSelectedTag) return false
    }

    // Confidence score filter
    if (event.confidence < filters.confidenceScore[0] || event.confidence > filters.confidenceScore[1]) return false

    return true
  })

  // Filter alerts based on search query and basic filters
  const filteredAlerts = alerts.filter((alert) => {
    if (
      searchQuery &&
      !alert.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.source.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.destination.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (filters.severity !== "all" && alert.severity !== filters.severity) {
      return false
    }

    if (filters.sourceIP && !alert.source.includes(filters.sourceIP)) {
      return false
    }

    if (filters.destinationIP && !alert.destination.includes(filters.destinationIP)) {
      return false
    }

    return true
  })

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Event Explorer</h1>
          <p className="text-muted-foreground">Analyze and investigate security events across your environment.</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events, IPs, users..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-700 text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Event Filters</SheetTitle>
                  <SheetDescription>
                    Apply filters to narrow down events. Multiple filters can be combined.
                  </SheetDescription>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
                  <Accordion type="multiple" defaultValue={["basic"]} className="w-full">
                    {/* Basic Filters */}
                    <AccordionItem value="basic">
                      <AccordionTrigger>Basic Filters</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {filterCategories.basic.map((filter) => (
                            <div key={filter.id} className="space-y-2">
                              <label htmlFor={filter.id} className="text-sm font-medium">
                                {filter.label}
                              </label>
                              {filter.type === "select" ? (
                                <Select
                                  value={filters[filter.id]}
                                  onValueChange={(value) => handleFilterChange(filter.id, value)}
                                >
                                  <SelectTrigger id={filter.id}>
                                    <SelectValue placeholder={`Select ${filter.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filter.options?.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  id={filter.id}
                                  placeholder={`Enter ${filter.label}`}
                                  value={filters[filter.id]}
                                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Identity Filters */}
                    <AccordionItem value="identity">
                      <AccordionTrigger>Identity Filters</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {filterCategories.identity.map((filter) => (
                            <div key={filter.id} className="space-y-2">
                              <label htmlFor={filter.id} className="text-sm font-medium">
                                {filter.label}
                              </label>
                              {filter.type === "select" ? (
                                <Select
                                  value={filters[filter.id]}
                                  onValueChange={(value) => handleFilterChange(filter.id, value)}
                                >
                                  <SelectTrigger id={filter.id}>
                                    <SelectValue placeholder={`Select ${filter.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filter.options?.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  id={filter.id}
                                  placeholder={`Enter ${filter.label}`}
                                  value={filters[filter.id]}
                                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Network Filters */}
                    <AccordionItem value="network">
                      <AccordionTrigger>Network Filters</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {filterCategories.network.map((filter) => (
                            <div key={filter.id} className="space-y-2">
                              <label htmlFor={filter.id} className="text-sm font-medium">
                                {filter.label}
                              </label>
                              {filter.type === "select" ? (
                                <Select
                                  value={filters[filter.id]}
                                  onValueChange={(value) => handleFilterChange(filter.id, value)}
                                >
                                  <SelectTrigger id={filter.id}>
                                    <SelectValue placeholder={`Select ${filter.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filter.options?.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  id={filter.id}
                                  placeholder={`Enter ${filter.label}`}
                                  value={filters[filter.id]}
                                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Application Filters */}
                    <AccordionItem value="application">
                      <AccordionTrigger>Application Filters</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {filterCategories.application.map((filter) => (
                            <div key={filter.id} className="space-y-2">
                              <label htmlFor={filter.id} className="text-sm font-medium">
                                {filter.label}
                              </label>
                              <Select
                                value={filters[filter.id]}
                                onValueChange={(value) => handleFilterChange(filter.id, value)}
                              >
                                <SelectTrigger id={filter.id}>
                                  <SelectValue placeholder={`Select ${filter.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {filter.options?.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Tags Filters */}
                    <AccordionItem value="tags">
                      <AccordionTrigger>Tags</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <label className="text-sm font-medium">Event Tags</label>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {filterCategories.tags[0].options?.map((tag) => (
                              <Badge
                                key={tag}
                                variant={filters.selectedTags.includes(tag) ? "default" : "outline"}
                                className={`cursor-pointer ${filters.selectedTags.includes(tag) ? "bg-navy-700" : ""}`}
                                onClick={() => toggleTag(tag)}
                              >
                                {tag}
                                {filters.selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Advanced Filters */}
                    <AccordionItem value="advanced">
                      <AccordionTrigger>Advanced Filters</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Confidence Score</label>
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
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ScrollArea>

                <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
                  <div className="flex w-full justify-between">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button className="bg-navy-700 hover:bg-navy-800">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker />
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Query
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Event Trends</CardTitle>
              <Select defaultValue="24h">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex h-[200px] items-center justify-center">
              <LineChart className="h-32 w-32 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Event Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Critical</span>
                  </div>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span>High</span>
                  </div>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>Medium</span>
                  </div>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Low</span>
                  </div>
                  <Badge variant="outline">1</Badge>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Events</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent className="flex h-[200px] items-center justify-center">
              <PieChart className="h-32 w-32 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Top Sources</CardTitle>
            </CardHeader>
            <CardContent className="flex h-[200px] items-center justify-center">
              <BarChart3 className="h-32 w-32 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Top Destinations</CardTitle>
            </CardHeader>
            <CardContent className="flex h-[200px] items-center justify-center">
              <BarChart3 className="h-32 w-32 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Event Explorer</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md border border-dashed p-2">
                <span className="text-sm font-medium">Active Filters:</span>
                {Object.entries(filters).map(([key, value]) => {
                  if (key === "selectedTags" && (value as string[]).length > 0) {
                    return (value as string[]).map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        <Tags className="h-3 w-3" />
                        {tag}
                        <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                      </Badge>
                    ))
                  } else if (key === "confidenceScore") {
                    const [min, max] = value as number[]
                    if (min > 0 || max < 100) {
                      return (
                        <Badge key={key} variant="secondary" className="flex items-center gap-1">
                          Confidence: {min}% - {max}%
                        </Badge>
                      )
                    }
                  } else if (
                    (typeof value === "string" && value !== "" && value !== "all") ||
                    (typeof value === "number" && value > 0)
                  ) {
                    const label =
                      filterCategories.basic.find((f) => f.id === key)?.label ||
                      filterCategories.identity.find((f) => f.id === key)?.label ||
                      filterCategories.network.find((f) => f.id === key)?.label ||
                      filterCategories.application.find((f) => f.id === key)?.label ||
                      key

                    const displayValue =
                      typeof value === "string" &&
                      (key === "eventType" ||
                        key === "severity" ||
                        key === "department" ||
                        key === "protocol" ||
                        key === "country" ||
                        key === "application")
                        ? filterCategories.basic.find((f) => f.id === key)?.options?.find((o) => o.value === value)
                            ?.label ||
                          filterCategories.identity.find((f) => f.id === key)?.options?.find((o) => o.value === value)
                            ?.label ||
                          filterCategories.network.find((f) => f.id === key)?.options?.find((o) => o.value === value)
                            ?.label ||
                          filterCategories.application
                            .find((f) => f.id === key)
                            ?.options?.find((o) => o.value === value)?.label ||
                          value
                        : value

                    return (
                      <Badge key={key} variant="secondary" className="flex items-center gap-1">
                        {label}: {displayValue}
                      </Badge>
                    )
                  }
                  return null
                })}
                <Button variant="ghost" size="sm" className="ml-auto h-6 px-2 text-xs" onClick={resetFilters}>
                  Clear All
                </Button>
              </div>
            )}

            <TabsContent value="events" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Event ID</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No events found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.id}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </TableCell>
                          <TableCell>{event.source}</TableCell>
                          <TableCell>{event.destination}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {event.subtype}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeColor(event.severity)}>{event.severity}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-full max-w-24 rounded-full bg-muted">
                                <div
                                  className={`h-full rounded-full ${getConfidenceColor(event.confidence)}`}
                                  style={{ width: `${event.confidence}%` }}
                                />
                              </div>
                              <span className="text-xs">{event.confidence}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Event Details</DialogTitle>
                                </DialogHeader>
                                {selectedEvent && (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <Badge variant="outline">{selectedEvent.id}</Badge>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{new Date(selectedEvent.timestamp).toLocaleString()}</span>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium">Source</p>
                                        <p className="text-sm">{selectedEvent.source}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Destination</p>
                                        <p className="text-sm">{selectedEvent.destination}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Type</p>
                                        <p className="text-sm">{selectedEvent.type}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Subtype</p>
                                        <p className="text-sm">{selectedEvent.subtype}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">User</p>
                                        <p className="text-sm">{selectedEvent.user}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Hostname</p>
                                        <p className="text-sm">{selectedEvent.hostname}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Severity</p>
                                        <Badge className={getSeverityBadgeColor(selectedEvent.severity)}>
                                          {selectedEvent.severity}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Confidence Score</p>
                                        <div className="mt-1 flex items-center gap-2">
                                          <div className="h-2 w-full rounded-full bg-muted">
                                            <div
                                              className={`h-full rounded-full ${getConfidenceColor(
                                                selectedEvent.confidence,
                                              )}`}
                                              style={{ width: `${selectedEvent.confidence}%` }}
                                            />
                                          </div>
                                          <span className="text-sm">{selectedEvent.confidence}%</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Tags</p>
                                      <div className="mt-1 flex flex-wrap gap-1">
                                        {selectedEvent.tags.map((tag) => (
                                          <Badge key={tag} variant="outline">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Details</p>
                                      <p className="text-sm">{selectedEvent.details}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline">Add to Case</Button>
                                      <Button className="bg-navy-700 hover:bg-navy-800">Create Alert</Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No alerts found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.id}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </TableCell>
                          <TableCell>{alert.title}</TableCell>
                          <TableCell>{alert.source}</TableCell>
                          <TableCell>{alert.destination}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeColor(alert.severity)}>{alert.severity}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={alert.status === "open" ? "default" : "outline"}
                              className={alert.status === "open" ? "bg-navy-700" : ""}
                            >
                              {alert.status === "open"
                                ? "Open"
                                : alert.status === "investigating"
                                  ? "Investigating"
                                  : alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

function getSeverityBadgeColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-600 hover:bg-red-700"
    case "high":
      return "bg-orange-500 hover:bg-orange-600"
    case "medium":
      return "bg-yellow-500 hover:bg-yellow-600"
    case "low":
      return "bg-green-500 hover:bg-green-600"
    default:
      return "bg-blue-500 hover:bg-blue-600"
  }
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return "bg-green-500"
  if (confidence >= 70) return "bg-yellow-500"
  return "bg-red-500"
}
