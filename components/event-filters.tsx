"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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

interface EventFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void
}

export function EventFilters({ onFilterChange }: EventFiltersProps) {
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

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
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
  }

  return (
    <div className="space-y-4">
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
                    <Select value={filters[filter.id]} onValueChange={(value) => handleFilterChange(filter.id, value)}>
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
                    <Select value={filters[filter.id]} onValueChange={(value) => handleFilterChange(filter.id, value)}>
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
                    <Select value={filters[filter.id]} onValueChange={(value) => handleFilterChange(filter.id, value)}>
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
                  <Select value={filters[filter.id]} onValueChange={(value) => handleFilterChange(filter.id, value)}>
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

      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  )
}
