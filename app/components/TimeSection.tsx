"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TimeSection() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTask, setCurrentTask] = useState<string>("")

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Listen for timer events from task management
  useEffect(() => {
    const handleTimerStart = (event: CustomEvent) => {
      setCurrentTask(event.detail.taskName)
      setIsTimerRunning(true)
    }

    const handleTimerStop = () => {
      setIsTimerRunning(false)
      setCurrentTask("")
    }

    window.addEventListener("startTimer", handleTimerStart as EventListener)
    window.addEventListener("stopTimer", handleTimerStop)

    return () => {
      window.removeEventListener("startTimer", handleTimerStart as EventListener)
      window.removeEventListener("stopTimer", handleTimerStop)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning)
    if (!isTimerRunning) {
      setCurrentTask("Manual Timer")
    } else {
      setCurrentTask("")
    }
  }

  const handleTimerReset = () => {
    setTimerSeconds(0)
    setIsTimerRunning(false)
    setCurrentTask("")
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Current Time Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Current Time</h2>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-mono font-bold text-gray-800 mb-2">
              {formatCurrentTime(currentTime)}
            </div>
            <div className="text-gray-600 text-sm md:text-base">{formatDate(currentTime)}</div>
          </div>
        </div>

        {/* Study Timer */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${isTimerRunning ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <h2 className="text-xl font-semibold text-gray-800">Study Timer</h2>
          </div>
          <div className="text-center mb-4">
            <div className="text-3xl md:text-4xl font-mono font-bold text-indigo-600 mb-4">
              {formatTime(timerSeconds)}
            </div>
            <div className="flex justify-center gap-3">
              <Button
                onClick={handleTimerToggle}
                className={`${isTimerRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isTimerRunning ? "Pause" : "Start"}
              </Button>
              <Button onClick={handleTimerReset} variant="outline" className="border-gray-300 hover:bg-gray-50">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Currently Working On */}
      {currentTask && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-4 text-center">
          <p className="text-lg font-medium">
            Currently working on: <span className="font-bold">{currentTask}</span>
          </p>
        </div>
      )}
    </div>
  )
}
