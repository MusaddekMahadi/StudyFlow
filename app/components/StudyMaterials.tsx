"use client"

import { useState, useEffect } from "react"
import { Plus, ExternalLink, Trash2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StudyMaterial {
  id: string
  title: string
  url: string
  description?: string
}

const defaultMaterials: StudyMaterial[] = [
  {
    id: "youtube",
    title: "YouTube",
    url: "https://youtube.com",
    description: "Educational videos and tutorials",
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    url: "https://chat.openai.com",
    description: "AI assistant for learning",
  },
  {
    id: "docs",
    title: "Google Docs",
    url: "https://docs.google.com",
    description: "Document creation and collaboration",
  },
  {
    id: "scholar",
    title: "Google Scholar",
    url: "https://scholar.google.com",
    description: "Academic papers and research",
  },
]

export default function StudyMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>(defaultMaterials)
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  // Load materials from localStorage on component mount
  useEffect(() => {
    const savedMaterials = localStorage.getItem("studyMaterials")
    if (savedMaterials) {
      setMaterials(JSON.parse(savedMaterials))
    }
  }, [])

  // Save materials to localStorage whenever materials change
  useEffect(() => {
    localStorage.setItem("studyMaterials", JSON.stringify(materials))
  }, [materials])

  const addMaterial = () => {
    if (newTitle.trim() && newUrl.trim()) {
      const newMaterial: StudyMaterial = {
        id: Date.now().toString(),
        title: newTitle.trim(),
        url: newUrl.trim().startsWith("http") ? newUrl.trim() : `https://${newUrl.trim()}`,
        description: newDescription.trim() || undefined,
      }
      setMaterials([...materials, newMaterial])
      setNewTitle("")
      setNewUrl("")
      setNewDescription("")
      setShowAddForm(false)
    }
  }

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter((material) => material.id !== id))
  }

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return "/placeholder.svg?height=32&width=32"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Study Materials
        </h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      {/* Add New Material Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Study Material</h3>
          <div className="space-y-3">
            <Input
              placeholder="Title (e.g., Khan Academy)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Input
              placeholder="URL (e.g., https://khanacademy.org)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <div className="flex gap-3">
              <Button onClick={addMaterial} className="bg-green-600 hover:bg-green-700">
                Add Material
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {materials.map((material) => (
          <div
            key={material.id}
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => window.open(material.url, "_blank")}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={getFaviconUrl(material.url) || "/placeholder.svg"}
                  alt={`${material.title} icon`}
                  className="w-8 h-8 rounded"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {material.title}
                  </h3>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(material.url, "_blank")
                  }}
                  className="h-8 w-8 p-0 hover:bg-indigo-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                {!defaultMaterials.find((dm) => dm.id === material.id) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteMaterial(material.id)
                    }}
                    className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            {material.description && <p className="text-sm text-gray-600 mb-2">{material.description}</p>}
            <div className="text-xs text-gray-400 truncate">{material.url}</div>
          </div>
        ))}
      </div>

      {materials.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No study materials yet. Add your first link to get started!</p>
        </div>
      )}
    </div>
  )
}
