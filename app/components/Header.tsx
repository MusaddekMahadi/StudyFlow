import { BookOpen } from "lucide-react"

export default function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">StudyFlow</h1>
      </div>
      <p className="text-gray-600 text-lg">Your personal study time and task management companion</p>
    </header>
  )
}
