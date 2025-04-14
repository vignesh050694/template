"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Event } from "@/lib/types"

export function EventSearchTable({ events }: { events: Event[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const columns: ColumnDef<Event>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Event ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const timestamp = new Date(row.getValue("timestamp"))
        return <div className="font-mono text-xs">{timestamp.toLocaleTimeString()}</div>
      },
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => <div>{row.getValue("source")}</div>,
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => <div>{row.getValue("destination")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "subtype",
      header: "Subtype",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("subtype")}
        </Badge>
      ),
    },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => {
        const severity = row.getValue("severity") as string
        return <Badge className={getSeverityBadgeColor(severity)}>{severity}</Badge>
      },
    },
    {
      accessorKey: "confidence",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Confidence
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const confidence = Number.parseInt(row.getValue("confidence"))
        return (
          <div className="flex items-center gap-2">
            <div className="h-2 w-full max-w-24 rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${getConfidenceColor(confidence)}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-xs">{confidence}%</span>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const event = row.original

        return (
          <div className="text-right">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Event Details</DialogTitle>
                </DialogHeader>
                {selectedEvent && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{selectedEvent.id}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                              className={`h-full rounded-full ${getConfidenceColor(selectedEvent.confidence)}`}
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
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: events,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter events..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="ml-auto">
            Selected: {table.getFilteredSelectedRowModel().rows.length}
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
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
