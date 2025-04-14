import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import {
  FileText,
  Home,
  List,
  MessageSquare,
  PlaySquare,
  Search,
  Settings,
  Shield,
  TimerIcon as Timeline,
  User,
  Bell,
} from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOC Analyst Dashboard",
  description: "Security Operations Center Analyst Dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <div className="flex min-h-screen">
          {/* Simplified Sidebar - Tailwind only */}
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white">
            {/* Logo */}
            <div className="flex items-center gap-2 p-4 border-b border-navy-800">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">SOC Analyst</span>
            </div>

            {/* Navigation Menu */}
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cases"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Case Manager</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <List className="h-5 w-5" />
                    <span>Event Explorer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/event-search"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                    <span>Event Search</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/timeline"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <Timeline className="h-5 w-5" />
                    <span>Timeline</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collaboration"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Collaboration</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/playbooks"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <PlaySquare className="h-5 w-5" />
                    <span>Playbooks</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* User Profile Link */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-800">
              <Link
                href="/settings/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-navy-800 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64">
            {/* Header */}
            <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-navy-800 px-4 text-white">
              <div className="flex items-center gap-4">
                <span className="hidden md:inline-block font-semibold">SOC Analyst Assistant</span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                {/* Simple search button */}
                <button className="p-2 rounded-full hover:bg-navy-700">
                  <Search className="h-5 w-5" />
                </button>
                {/* Notification button with badge */}
                <div className="relative">
                  <button className="p-2 rounded-full hover:bg-navy-700">
                    <Bell className="h-5 w-5" />
                  </button>
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </div>
                {/* User avatar */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-navy-700 flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <span className="hidden md:inline-block">John Doe</span>
                </div>
              </div>
            </header>

            {/* Page content */}
            <div className="p-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}


import './globals.css'