"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { EventSearchTable } from "@/components/event-search-table"
import { EventFilters } from "@/components/event-filters"
import { Button } from "@/components/ui/button"
import { Download, RefreshCcw, Save } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEvents } from "@/lib/mock-data"

export function EventSearchView() {
  const [events, setEvents] = useState(mockEvents)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters)

    // Apply filters to events
    const filteredEvents = mockEvents.filter((event) => {
      // Check each filter
      for (const [key, value] of Object.entries(filters)) {
        if (!value || (Array.isArray(value) && value.length === 0)) continue

        // Handle different filter types
        if (key === "selectedTags" && value.length > 0) {
          const hasSelectedTag = value.some((tag: string) => event.tags.includes(tag))
          if (!hasSelectedTag) return false
        } else if (key === "confidenceScore") {
          const [min, max] = value as number[]
          if (event.confidence < min || event.confidence > max) return false
        } else if (key === "timeRange") {
          // Skip timeRange for now - would be handled with actual date filtering
          continue
        } else if (key.includes("IP") || key === "user" || key === "hostname") {
          if (value && !event[key]?.toLowerCase().includes(value.toLowerCase())) return false
        } else if (value !== "all" && event[key] !== value) {
          return false
        }
      }
      return true
    })

    setEvents(filteredEvents)
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Event Search</h1>
          <p className="text-muted-foreground">Search and filter security events across your environment.</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Filters Panel */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <EventFilters onFilterChange={handleFilterChange} />
              </CardContent>
            </Card>
          </div>

          {/* Table Panel */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Events</CardTitle>
              </CardHeader>
              <CardContent>
                <EventSearchTable events={events} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
