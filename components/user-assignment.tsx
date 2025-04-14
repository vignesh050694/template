"use client"

import { useState, useRef, useEffect } from "react"
import { User, ChevronDown } from "lucide-react"

// Sample user data - in a real app, this would come from an API
const users = [
  { id: "1", name: "John Doe", initials: "JD", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Jane Smith", initials: "JS", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Alex Johnson", initials: "AJ", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "4", name: "Sarah Williams", initials: "SW", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "5", name: "Michael Brown", initials: "MB", avatar: "/placeholder.svg?height=32&width=32" },
]

interface UserAssignmentProps {
  caseId: string
  initialAssignee?: string
  onAssign?: (userId: string) => void
}

export function UserAssignment({ caseId, initialAssignee, onAssign }: UserAssignmentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | undefined>(
    initialAssignee ? users.find((user) => user.id === initialAssignee || user.name === initialAssignee) : undefined,
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelectUser = (user: (typeof users)[0]) => {
    setSelectedUser(user)
    setIsOpen(false)
    if (onAssign) {
      onAssign(user.id)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {selectedUser ? (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-700 text-white">
              <span className="text-xs">{selectedUser.initials}</span>
            </div>
            <span>{selectedUser.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>Assign user</span>
          </div>
        )}
        <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">Select user</div>
          <div className="max-h-60 overflow-auto">
            {users.map((user) => (
              <button
                key={user.id}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-700 text-white">
                  <span className="text-xs">{user.initials}</span>
                </div>
                <span>{user.name}</span>
                {selectedUser?.id === user.id && (
                  <svg
                    className="ml-auto h-4 w-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
