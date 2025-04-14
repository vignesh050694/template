"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainLayout } from "@/components/main-layout"
import { DateRangePicker } from "@/components/date-range-picker"
import { SeverityToggle } from "@/components/severity-toggle"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const cases = [
  {
    id: "CASE-001",
    title: "Suspicious Login Activity",
    severity: "high",
    status: "open",
    assignedTo: "John Doe",
    lastUpdated: "2 hours ago",
    tags: ["Unauthorized Access", "Suspicious IP"],
  },
  {
    id: "CASE-002",
    title: "Potential Data Exfiltration",
    severity: "critical",
    status: "in-progress",
    assignedTo: "Jane Smith",
    lastUpdated: "1 day ago",
    tags: ["Data Exfiltration", "External IP"],
  },
  {
    id: "CASE-003",
    title: "Phishing Campaign",
    severity: "medium",
    status: "open",
    assignedTo: "Alex Johnson",
    lastUpdated: "3 hours ago",
    tags: ["Phishing", "Email"],
  },
  {
    id: "CASE-004",
    title: "Malware Detection",
    severity: "high",
    status: "in-progress",
    assignedTo: "Sarah Williams",
    lastUpdated: "5 hours ago",
    tags: ["Malware", "Endpoint"],
  },
  {
    id: "CASE-005",
    title: "Unauthorized Access Attempt",
    severity: "medium",
    status: "open",
    assignedTo: "John Doe",
    lastUpdated: "1 hour ago",
    tags: ["Unauthorized Access", "Firewall"],
  },
  {
    id: "CASE-006",
    title: "Ransomware Incident",
    severity: "critical",
    status: "open",
    assignedTo: "Jane Smith",
    lastUpdated: "30 minutes ago",
    tags: ["Ransomware", "Endpoint"],
  },
  {
    id: "CASE-007",
    title: "DDoS Attack",
    severity: "high",
    status: "in-progress",
    assignedTo: "Alex Johnson",
    lastUpdated: "4 hours ago",
    tags: ["DDoS", "Network"],
  },
]

export function CaseManagerView() {
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    severity: "all",
    assignedTo: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCases = cases.filter((caseItem) => {
    if (searchQuery && !caseItem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
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

    return true
  })

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Case Manager</h1>
          <p className="text-muted-foreground">Manage and track security incidents and investigations.</p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Cases</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={isCreateCaseOpen} onOpenChange={setIsCreateCaseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-navy-700 hover:bg-navy-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Case
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Case</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Input placeholder="Case Title" />
                    </div>
                    <div className="space-y-2">
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Select defaultValue="John Doe">
                        <SelectTrigger>
                          <SelectValue placeholder="Assign To" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Doe">John Doe</SelectItem>
                          <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                          <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                          <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Textarea placeholder="Case Description" className="min-h-[100px]" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateCaseOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateCaseOpen(false)} className="bg-navy-700 hover:bg-navy-800">
                      Create Case
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Search cases..."
                  className="max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filters.assignedTo}
                  onValueChange={(value) => setFilters({ ...filters, assignedTo: value })}
                >
                  <SelectTrigger className="w-[150px]">
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
                <SeverityToggle />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Case ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">{caseItem.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{caseItem.title}</div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {caseItem.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getSeverityBadgeColor(caseItem.severity)}`}>{caseItem.severity}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(caseItem.status)} className="capitalize">
                          {caseItem.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{getInitials(caseItem.assignedTo)}</AvatarFallback>
                          </Avatar>
                          <span>{caseItem.assignedTo}</span>
                        </div>
                      </TableCell>
                      <TableCell>{caseItem.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/cases/${caseItem.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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

function getStatusVariant(status: string) {
  switch (status) {
    case "open":
      return "secondary"
    case "in-progress":
      return "default"
    case "resolved":
      return "outline"
    default:
      return "secondary"
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}
