"use client"

import { useState } from "react"
import { Calendar, Clock, Eye, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CaseEventsProps {
  caseId: string
}

const events = [
  {
    id: "EVT-001",
    timestamp: "2023-04-03T10:15:30Z",
    source: "192.168.1.100",
    destination: "admin.company.com",
    type: "Authentication",
    subtype: "Failed Login",
    confidence: 85,
    details: "Failed login attempt for user admin@company.com. Invalid password.",
  },
  {
    id: "EVT-002",
    timestamp: "2023-04-03T10:16:45Z",
    source: "192.168.1.100",
    destination: "admin.company.com",
    type: "Authentication",
    subtype: "Failed Login",
    confidence: 85,
    details: "Failed login attempt for user admin@company.com. Invalid password.",
  },
  {
    id: "EVT-003",
    timestamp: "2023-04-03T10:18:12Z",
    source: "192.168.1.100",
    destination: "admin.company.com",
    type: "Authentication",
    subtype: "Successful Login",
    confidence: 90,
    details: "Successful login for user admin@company.com.",
  },
  {
    id: "EVT-004",
    timestamp: "2023-04-03T10:20:05Z",
    source: "admin.company.com",
    destination: "db.company.internal",
    type: "Database",
    subtype: "Query",
    confidence: 75,
    details: "SELECT * FROM customer_records WHERE credit_card IS NOT NULL",
  },
  {
    id: "EVT-005",
    timestamp: "2023-04-03T10:22:30Z",
    source: "admin.company.com",
    destination: "192.168.1.100",
    type: "Data",
    subtype: "Exfiltration",
    confidence: 95,
    details: "Large data transfer (25MB) to external IP address.",
  },
]

export function CaseEvents({ caseId }: CaseEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [isTimelineOpen, setIsTimelineOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search events..." className="w-full max-w-xs" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="authentication">Authentication</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="data">Data Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsTimelineOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Timeline
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-mono text-xs">{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
                  <TableCell>{event.source}</TableCell>
                  <TableCell>{event.destination}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {event.subtype}
                    </Badge>
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
                            </div>
                            <div>
                              <p className="text-sm font-medium">Details</p>
                              <p className="text-sm">{selectedEvent.details}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Confidence Score</p>
                              <div className="mt-1 flex items-center gap-2">
                                <div className="h-2 w-full rounded-full bg-muted">
                                  <div
                                    className={`h-full rounded-full ${getConfidenceColor(selectedEvent.confidence)}`}
                                    style={{ width: `${selectedEvent.confidence}%` }}
                                  />
                                </div>
                                <span className="text-sm">{selectedEvent.confidence}%</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Event Timeline</DialogTitle>
          </DialogHeader>
          <div className="relative mt-4 pl-6">
            <div className="absolute left-0 top-0 h-full w-px bg-border"></div>
            {events.map((event, index) => (
              <div key={event.id} className="mb-6 relative">
                <div className="absolute -left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-8 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    <Badge variant="outline" className="capitalize">
                      {event.subtype}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm">{event.details}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Source: {event.source}</span>
                    <span>Destination: {event.destination}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return "bg-green-500"
  if (confidence >= 70) return "bg-yellow-500"
  return "bg-red-500"
}
