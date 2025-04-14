"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SeverityToggle() {
  const [selectedSeverities, setSelectedSeverities] = React.useState({
    critical: true,
    high: true,
    medium: true,
    low: true,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Severity</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedSeverities.critical}
          onCheckedChange={(checked) => setSelectedSeverities({ ...selectedSeverities, critical: checked })}
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-red-600"></span>
          Critical
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedSeverities.high}
          onCheckedChange={(checked) => setSelectedSeverities({ ...selectedSeverities, high: checked })}
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-orange-500"></span>
          High
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedSeverities.medium}
          onCheckedChange={(checked) => setSelectedSeverities({ ...selectedSeverities, medium: checked })}
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span>
          Medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedSeverities.low}
          onCheckedChange={(checked) => setSelectedSeverities({ ...selectedSeverities, low: checked })}
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
          Low
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
