"use client"

import { useState } from "react"
import { BookmarkPlus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SavedSearchesProps {
  savedSearches: Array<{ name: string; query: string; filters: any }>
  onSelectSearch: (search: { name: string; query: string; filters: any }) => void
}

export function SavedSearches({ savedSearches, onSelectSearch }: SavedSearchesProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleDeleteSearch = (index: number) => {
    const updatedSearches = [...savedSearches]
    updatedSearches.splice(index, 1)
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches))
    // This would typically update state in the parent component
    // For now, we'll just reload the page
    window.location.reload()
  }

  if (savedSearches.length === 0) {
    return null
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex w-full justify-between p-2">
            <div className="flex items-center">
              <BookmarkPlus className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Saved Searches</span>
            </div>
            <span className="text-xs text-muted-foreground">{savedSearches.length}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-1">
        {savedSearches.map((search, index) => (
          <div key={index} className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-accent">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto w-full justify-start p-0 text-sm font-normal"
              onClick={() => onSelectSearch(search)}
            >
              {search.name}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteSearch(index)
              }}
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
