"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Filter, RefreshCcw, Search } from "lucide-react"
import { EventTable } from "@/components/event-table"
import { mockEvents } from "@/lib/mock-data"

export function EventSearchScreen() {
  const [events, setEvents] = useState(mockEvents)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter states
  const [eventType, setEventType] = useState("all")
  const [severity, setSeverity] = useState("all")
  const [sourceIP, setSourceIP] = useState("")
  const [confidenceRange, setConfidenceRange] = useState([0, 100])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleSearch = () => {
    // Filter events based on search query and filters
    const filtered = mockEvents.filter((event) => {
      // Search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const textMatch =
          event.id.toLowerCase().includes(searchLower) ||
          event.source.toLowerCase().includes(searchLower) ||
          event.destination.toLowerCase().includes(searchLower) ||
          event.details.toLowerCase().includes(searchLower) ||
          event.user.toLowerCase().includes(searchLower)

        if (!textMatch) return false
      }

      // Event type filter
      if (eventType !== "all" && event.type !== eventType) return false

      // Severity filter
      if (severity !== "all" && event.severity !== severity) return false

      // Source IP filter
      if (sourceIP && !event.source.includes(sourceIP)) return false

      // Confidence score filter
      if (event.confidence < confidenceRange[0] || event.confidence > confidenceRange[1]) return false

      return true
    })

    setEvents(filtered)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setEventType("all")
    setSeverity("all")
    setSourceIP("")
    setConfidenceRange([0, 100])
    setEvents(mockEvents)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Event Search</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Search input */}
            <div className="col-span-full md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events, IPs, users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Event Type filter */}
            <div>
              <label className="text-sm font-medium mb-1 block">Event Type</label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Authentication">Authentication</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                  <SelectItem value="File">File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity filter */}
            <div>
              <label className="text-sm font-medium mb-1 block">Severity</label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source IP filter */}
            <div>
              <label className="text-sm font-medium mb-1 block">Source IP</label>
              <Input placeholder="Enter source IP" value={sourceIP} onChange={(e) => setSourceIP(e.target.value)} />
            </div>

            {/* Confidence Score filter */}
            <div className="col-span-full">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Confidence Score</label>
                <span className="text-sm text-muted-foreground">
                  {confidenceRange[0]}% - {confidenceRange[1]}%
                </span>
              </div>
              <Slider value={confidenceRange} onValueChange={setConfidenceRange} max={100} step={5} className="my-4" />
            </div>

            {/* Action buttons */}
            <div className="col-span-full flex justify-end gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
              <Button onClick={handleSearch} className="bg-navy-700 hover:bg-navy-800">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Active filters display */}
          {(searchQuery ||
            eventType !== "all" ||
            severity !== "all" ||
            sourceIP ||
            confidenceRange[0] > 0 ||
            confidenceRange[1] < 100) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-md border border-dashed p-2">
              <span className="text-sm font-medium">Active Filters:</span>

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                </Badge>
              )}

              {eventType !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Type: {eventType}
                </Badge>
              )}

              {severity !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Severity: {severity}
                </Badge>
              )}

              {sourceIP && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Source IP: {sourceIP}
                </Badge>
              )}

              {(confidenceRange[0] > 0 || confidenceRange[1] < 100) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Confidence: {confidenceRange[0]}% - {confidenceRange[1]}%
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <EventTable events={events} />
        </CardContent>
      </Card>
    </div>
  )
}
