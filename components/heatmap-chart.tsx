"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for the heatmap - in a real app, this would come from your API
const generateHeatmapData = (type: string) => {
  // Days of the week
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Hours of the day (24-hour format)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Generate data based on type
  if (type === "login-attempts") {
    return days.map((day) => ({
      day,
      hours: hours.map((hour) => ({
        hour,
        value: Math.floor(Math.random() * 100),
        // Higher values during business hours on weekdays
        intensity:
          day !== "Sat" && day !== "Sun" && hour >= 8 && hour <= 18
            ? Math.floor(Math.random() * 70) + 30
            : Math.floor(Math.random() * 30),
      })),
    }))
  } else if (type === "data-access") {
    return days.map((day) => ({
      day,
      hours: hours.map((hour) => ({
        hour,
        value: Math.floor(Math.random() * 100),
        // Suspicious after-hours access pattern
        intensity:
          day === "Sat" || day === "Sun" || hour < 7 || hour > 19
            ? Math.floor(Math.random() * 60) + 20
            : Math.floor(Math.random() * 40),
      })),
    }))
  } else {
    // Default pattern
    return days.map((day) => ({
      day,
      hours: hours.map((hour) => ({
        hour,
        value: Math.floor(Math.random() * 100),
        intensity: Math.floor(Math.random() * 100),
      })),
    }))
  }
}

interface HeatmapChartProps {
  className?: string
}

export function HeatmapChart({ className }: HeatmapChartProps) {
  const [dataType, setDataType] = useState("login-attempts")
  const [heatmapData, setHeatmapData] = useState(() => generateHeatmapData(dataType))

  const handleDataTypeChange = (value: string) => {
    setDataType(value)
    setHeatmapData(generateHeatmapData(value))
  }

  // Get color based on intensity value (0-100)
  const getColor = (intensity: number) => {
    if (intensity < 10) return "bg-blue-50"
    if (intensity < 20) return "bg-blue-100"
    if (intensity < 30) return "bg-blue-200"
    if (intensity < 40) return "bg-blue-300"
    if (intensity < 50) return "bg-blue-400"
    if (intensity < 60) return "bg-blue-500"
    if (intensity < 70) return "bg-blue-600"
    if (intensity < 80) return "bg-blue-700"
    if (intensity < 90) return "bg-blue-800"
    return "bg-blue-900"
  }

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Event Activity by Day & Hour</h3>
        <Select value={dataType} onValueChange={handleDataTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="login-attempts">Login Attempts</SelectItem>
            <SelectItem value="data-access">Data Access</SelectItem>
            <SelectItem value="network-traffic">Network Traffic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hours header */}
          <div className="flex">
            <div className="w-12"></div> {/* Empty cell for alignment */}
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="flex w-8 justify-center text-xs font-medium text-gray-500">
                {i}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="mt-1">
            {heatmapData.map((dayData, dayIndex) => (
              <div key={dayIndex} className="flex">
                <div className="flex w-12 items-center pr-2 text-xs font-medium text-gray-500">{dayData.day}</div>
                {dayData.hours.map((hourData, hourIndex) => (
                  <div
                    key={hourIndex}
                    className={`m-0.5 h-8 w-7 rounded ${getColor(hourData.intensity)}`}
                    title={`${dayData.day} ${hourData.hour}:00 - Value: ${hourData.value}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center text-xs text-gray-500">
              <span>Low</span>
              <div className="mx-1 flex">
                <div className="h-3 w-4 bg-blue-50"></div>
                <div className="h-3 w-4 bg-blue-100"></div>
                <div className="h-3 w-4 bg-blue-200"></div>
                <div className="h-3 w-4 bg-blue-300"></div>
                <div className="h-3 w-4 bg-blue-400"></div>
                <div className="h-3 w-4 bg-blue-500"></div>
                <div className="h-3 w-4 bg-blue-600"></div>
                <div className="h-3 w-4 bg-blue-700"></div>
                <div className="h-3 w-4 bg-blue-800"></div>
                <div className="h-3 w-4 bg-blue-900"></div>
              </div>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
