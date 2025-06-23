"use client"

import { useState, useEffect } from "react"
import { Plus, Play, Pause, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  name: string
  expectedTime: number // in minutes
  actualTime: number // in seconds
  isCompleted: boolean
  progress: number // percentage
  isActive: boolean
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskTime, setNewTaskTime] = useState("")
  const [editingTask, setEditingTask] = useState<string | null>(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("studyTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("studyTasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTaskName.trim() && newTaskTime) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: newTaskName.trim(),
        expectedTime: Number.parseInt(newTaskTime),
        actualTime: 0,
        isCompleted: false,
        progress: 0,
        isActive: false,
      }
      setTasks([...tasks, newTask])
      setNewTaskName("")
      setNewTaskTime("")
    }
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)))
  }

  const updateTaskProgress = (id: string, progress: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, progress } : task)))
  }

  const startTaskTimer = (id: string) => {
    // Stop all other timers
    setTasks(tasks.map((task) => ({ ...task, isActive: false })))

    // Start this task's timer
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isActive: true } : task)))

    const task = tasks.find((t) => t.id === id)
    if (task) {
      // Dispatch custom event to start global timer
      window.dispatchEvent(
        new CustomEvent("startTimer", {
          detail: { taskName: task.name },
        }),
      )
    }
  }

  const stopTaskTimer = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isActive: false } : task)))

    // Dispatch custom event to stop global timer
    window.dispatchEvent(new CustomEvent("stopTimer"))
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-indigo-600" />
          Task Management
        </h2>

        {/* Add New Task */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Task</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Task name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Expected time (minutes)"
              type="number"
              value={newTaskTime}
              onChange={(e) => setNewTaskTime(e.target.value)}
              className="w-full sm:w-48"
            />
            <Button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tasks yet. Add your first task to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  task.isActive
                    ? "border-indigo-500 bg-indigo-50"
                    : task.isCompleted
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox checked={task.isCompleted} onCheckedChange={() => toggleTaskCompletion(task.id)} />
                    <div className="flex-1">
                      <h4
                        className={`font-semibold ${task.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}
                      >
                        {task.name}
                      </h4>
                      <p className="text-sm text-gray-600">Expected: {task.expectedTime} minutes</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) => updateTaskProgress(task.id, Number.parseInt(e.target.value) || 0)}
                        className="w-16 h-8 text-sm"
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => (task.isActive ? stopTaskTimer(task.id) : startTaskTimer(task.id))}
                        className={task.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                      >
                        {task.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {task.isActive && (
                  <div className="mt-3 p-2 bg-indigo-100 rounded-lg">
                    <p className="text-sm text-indigo-700 font-medium">⏱️ Timer is running for this task</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
