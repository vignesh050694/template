"use client"

import { useState } from "react"
import { MessageSquare, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CaseTimelineProps {
  caseId: string
}

const timelineEntries = [
  {
    id: "TL-001",
    timestamp: "2023-04-03T10:30:00Z",
    user: "John Doe",
    type: "comment",
    content: "Initiated investigation of suspicious login activity from IP 192.168.1.100.",
  },
  {
    id: "TL-002",
    timestamp: "2023-04-03T10:45:00Z",
    user: "System",
    type: "status",
    content: "Case status changed from 'New' to 'Open'.",
  },
  {
    id: "TL-003",
    timestamp: "2023-04-03T11:15:00Z",
    user: "Jane Smith",
    type: "comment",
    content: "IP address 192.168.1.100 geolocated to Russia. No company assets or employees in this region.",
  },
  {
    id: "TL-004",
    timestamp: "2023-04-03T11:30:00Z",
    user: "John Doe",
    type: "action",
    content: "Blocked IP address 192.168.1.100 at the firewall level.",
  },
  {
    id: "TL-005",
    timestamp: "2023-04-03T12:00:00Z",
    user: "Alex Johnson",
    type: "comment",
    content: "Reset admin account password and enabled MFA. Notified user to verify recent account activity.",
  },
]

export function CaseTimeline({ caseId }: CaseTimelineProps) {
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false)
  const [newEntry, setNewEntry] = useState({
    type: "comment",
    content: "",
  })

  const handleAddEntry = () => {
    // In a real app, this would add the entry to the database
    setIsAddEntryOpen(false)
    setNewEntry({
      type: "comment",
      content: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Investigation Timeline</h2>
        <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add to Timeline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Timeline Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Select value={newEntry.type} onValueChange={(value) => setNewEntry({ ...newEntry, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comment">Comment</SelectItem>
                    <SelectItem value="action">Action Taken</SelectItem>
                    <SelectItem value="finding">Finding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter your timeline entry..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEntryOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEntry}>Add Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full w-px bg-border"></div>
            {timelineEntries.map((entry) => (
              <div key={entry.id} className="mb-6 relative">
                <div className="absolute -left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                  {getTimelineIcon(entry.type)}
                </div>
                <div className="ml-8 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{new Date(entry.timestamp).toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">by {entry.user}</span>
                  </div>
                  <p className="mt-1 text-sm">{entry.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getTimelineIcon(type: string) {
  switch (type) {
    case "comment":
      return <MessageSquare className="h-5 w-5" />
    case "status":
      return <User className="h-5 w-5" />
    case "action":
      return <User className="h-5 w-5" />
    default:
      return <MessageSquare className="h-5 w-5" />
  }
}
