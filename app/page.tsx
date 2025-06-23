import Header from "./components/Header"
import TimeSection from "./components/TimeSection"
import TaskManagement from "./components/TaskManagement"
import StudyMaterials from "./components/StudyMaterials"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Header />
        <TimeSection />
        <TaskManagement />
        <StudyMaterials />
      </div>
    </div>
  )
}
