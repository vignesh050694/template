"use client"

import { useState } from "react"
import { Calendar, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CaseTasksProps {
  caseId: string
}

const tasks = [
  {
    id: "TASK-001",
    title: "Reset admin account password",
    assignedTo: "John Doe",
    dueDate: "2023-04-04T17:00:00Z",
    status: "completed",
    priority: "high",
  },
  {
    id: "TASK-002",
    title: "Enable MFA for all admin accounts",
    assignedTo: "Jane Smith",
    dueDate: "2023-04-04T17:00:00Z",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "TASK-003",
    title: "Block suspicious IP at firewall",
    assignedTo: "Alex Johnson",
    dueDate: "2023-04-03T12:00:00Z",
    status: "completed",
    priority: "critical",
  },
  {
    id: "TASK-004",
    title: "Review database access logs for past 7 days",
    assignedTo: "John Doe",
    dueDate: "2023-04-05T17:00:00Z",
    status: "pending",
    priority: "medium",
  },
  {
    id: "TASK-005",
    title: "Prepare incident report for management",
    assignedTo: "Jane Smith",
    dueDate: "2023-04-06T17:00:00Z",
    status: "pending",
    priority: "medium",
  },
]

export function CaseTasks({ caseId }: CaseTasksProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    priority: "medium",
  })

  const handleAddTask = () => {
    // In a real app, this would add the task to the database
    setIsAddTaskOpen(false)
    setNewTask({
      title: "",
      assignedTo: "",
      dueDate: "",
      priority: "medium",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Tasks</h2>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Select
                  value={newTask.assignedTo}
                  onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Input
                  type="datetime-local"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                <Checkbox
                  id={task.id}
                  checked={task.status === "completed"}
                  className={task.status === "completed" ? "opacity-50" : ""}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <label
                    htmlFor={task.id}
                    className={`font-medium ${task.status === "completed" ? "line-through opacity-50" : ""}`}
                  >
                    {task.title}
                  </label>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {task.assignedTo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <Select defaultValue={task.status}>
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  }
}
