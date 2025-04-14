"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Mock data for autocomplete suggestions
const suggestions = {
  cases: [
    { id: "CASE-001", title: "Suspicious Login Activity" },
    { id: "CASE-002", title: "Potential Data Exfiltration" },
    { id: "CASE-003", title: "Phishing Campaign" },
    { id: "CASE-004", title: "Ransomware Incident" },
  ],
  events: [
    { id: "EVT-001", title: "Failed Login Attempt" },
    { id: "EVT-002", title: "Malware Detection" },
    { id: "EVT-003", title: "Data Exfiltration" },
  ],
  assets: [
    { id: "192.168.1.100", title: "External IP (Russia)" },
    { id: "admin.company.com", title: "Admin Portal" },
    { id: "user@company.com", title: "User Email" },
  ],
}

export function GlobalSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Save to recent searches (max 5)
    const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(query)
    }
  }

  return (
    <>
      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search cases, events, IPs, emails..."
          className="w-full rounded-lg bg-navy-700 pl-8 pr-10 text-white placeholder:text-gray-400 border-navy-600 focus-visible:ring-navy-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9 text-gray-400 hover:text-white hover:bg-transparent"
            onClick={() => {
              setQuery("")
              inputRef.current?.focus()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search cases, events, IPs, emails..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((search, index) => (
                <CommandItem key={`recent-${index}`} onSelect={() => handleSearch(search)}>
                  <Search className="mr-2 h-4 w-4" />
                  {search}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {query.length > 0 && (
            <>
              <CommandGroup heading="Cases">
                {suggestions.cases
                  .filter(
                    (item) =>
                      item.title.toLowerCase().includes(query.toLowerCase()) ||
                      item.id.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSearch(item.title)}>
                      {item.id} - {item.title}
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="Events">
                {suggestions.events
                  .filter(
                    (item) =>
                      item.title.toLowerCase().includes(query.toLowerCase()) ||
                      item.id.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSearch(item.title)}>
                      {item.id} - {item.title}
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="Assets">
                {suggestions.assets
                  .filter(
                    (item) =>
                      item.title.toLowerCase().includes(query.toLowerCase()) ||
                      item.id.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSearch(item.id)}>
                      {item.id} - {item.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}

          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => handleSearch(query)}>
              <Search className="mr-2 h-4 w-4" />
              Search for "{query}"
            </CommandItem>
            <CommandItem onSelect={() => router.push("/search?advanced=true")}>
              <Search className="mr-2 h-4 w-4" />
              Advanced Search
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
