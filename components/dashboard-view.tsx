import Link from "next/link"
import { PieChart } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/main-layout"
import { DateRangePicker } from "@/components/date-range-picker"
import { SeverityToggle } from "@/components/severity-toggle"
import { HeatmapChart } from "@/components/heatmap-chart"

const cases = [
  {
    id: "CASE-001",
    title: "Suspicious Login Activity",
    severity: "high",
    status: "open",
    assignedTo: "John Doe",
    lastUpdated: "2 hours ago",
  },
  {
    id: "CASE-002",
    title: "Potential Data Exfiltration",
    severity: "critical",
    status: "in-progress",
    assignedTo: "Jane Smith",
    lastUpdated: "1 day ago",
  },
  {
    id: "CASE-003",
    title: "Phishing Campaign",
    severity: "medium",
    status: "open",
    assignedTo: "Alex Johnson",
    lastUpdated: "3 hours ago",
  },
]

const tasks = [
  {
    id: "TASK-001",
    title: "Reset admin account password",
    dueDate: "Today",
    priority: "high",
    status: "pending",
  },
  {
    id: "TASK-002",
    title: "Analyze malware sample",
    dueDate: "Tomorrow",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "TASK-003",
    title: "Update firewall rules",
    dueDate: "Today",
    priority: "high",
    status: "pending",
  },
]

export function DashboardView() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Security Operations Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your security overview.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
              <Badge variant="outline" className="text-lg font-bold">
                5
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-600">5</div>
              <p className="text-xs text-muted-foreground">+2 since yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Events (24h)</CardTitle>
              <Badge variant="outline" className="text-lg font-bold">
                24
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-600">24</div>
              <p className="text-xs text-muted-foreground">-8 compared to previous 24h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Badge variant="outline" className="text-lg font-bold">
                7
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-600">7</div>
              <p className="text-xs text-muted-foreground">3 high priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <Badge variant="destructive" className="text-lg font-bold">
                2
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* My Open Cases */}
          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Open Cases</CardTitle>
                <div className="flex items-center gap-2">
                  <DateRangePicker />
                  <SeverityToggle />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cases.map((caseItem) => (
                    <div key={caseItem.id} className="flex items-center gap-4 rounded-lg border p-3">
                      <div className={`h-full w-1 rounded-full ${getSeverityColor(caseItem.severity)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">{caseItem.id}</span>
                          <Link href={`/cases/${caseItem.id}`} className="font-semibold hover:underline">
                            {caseItem.title}
                          </Link>
                        </div>
                        <div className="mt-1 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{getInitials(caseItem.assignedTo)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{caseItem.assignedTo}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Updated {caseItem.lastUpdated}</span>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(caseItem.status)} className="capitalize">
                        {caseItem.status.replace("-", " ")}
                      </Badge>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <Button asChild variant="outline">
                      <Link href="/cases">View All Cases</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Heatmap Chart - Replacing the Charts section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Security Event Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <HeatmapChart className="w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-1 space-y-6">
            {/* Daily Brief */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Brief</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p>
                    <span className="font-medium">Security Posture:</span> Elevated risk due to recent phishing
                    campaign.
                  </p>
                  <p>
                    <span className="font-medium">Top Concern:</span> Potential data exfiltration from marketing server.
                  </p>
                  <p>
                    <span className="font-medium">Recommendation:</span> Increase monitoring of outbound traffic and
                    review access logs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Event Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Event Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex h-[200px] items-center justify-center">
                <PieChart className="h-32 w-32 text-muted-foreground" />
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2 rounded-lg border p-2">
                      <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{task.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Due: {task.dueDate}</span>
                          <span>•</span>
                          <Badge variant={getStatusVariant(task.status)} className="capitalize text-xs">
                            {task.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/tasks">View All Tasks</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-600"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-blue-500"
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case "open":
      return "secondary"
    case "in-progress":
      return "default"
    case "resolved":
      return "outline"
    case "pending":
      return "secondary"
    default:
      return "secondary"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-red-600"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-blue-500"
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}
