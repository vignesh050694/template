"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { UserAssignment } from "@/components/user-assignment"

interface CaseHeaderProps {
  caseId: string
  title: string
  severity: string
  tags: string[]
  initialAssignee?: string
}

export function CaseHeader({ caseId, title, severity, tags, initialAssignee }: CaseHeaderProps) {
  const [status, setStatus] = useState("open")

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In a real app, you would save this to your backend
    console.log(`Case ${caseId} status changed to ${newStatus}`)
  }

  const handleUserAssign = (userId: string) => {
    // In a real app, you would save this to your backend
    console.log(`Case ${caseId} assigned to user ${userId}`)
  }

  return (
    <div className="border-b bg-white p-4 md:p-6">
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${getSeverityColor(severity)}`}>
              {severity}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <span>{caseId}</span>
            <span>•</span>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-gray-200 px-2 py-0.5 text-xs font-normal">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <UserAssignment caseId={caseId} initialAssignee={initialAssignee} onAssign={handleUserAssign} />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="appearance-none rounded-md border border-gray-300 bg-white px-3 py-1.5 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800"
    case "high":
      return "bg-orange-100 text-orange-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
