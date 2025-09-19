import { BookOpen } from "lucide-react"

export function SubjectProgress() {
  const subjects = [
    { name: "Mathematics", progress: 75, hours: "75h / 100h", color: "#3b82f6" },
    { name: "Physics", progress: 60, hours: "48h / 80h", color: "#10b981" },
    { name: "Chemistry", progress: 45, hours: "40h / 90h", color: "#8b5cf6" },
    { name: "Biology", progress: 45, hours: "56h / 70h", color: "#f97316" },
  ]

  return (
    <div className="space-y-6">
      <div className="widget-header">
        <div className="widget-icon">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="widget-title">Subject Progress</h3>
          <p className="widget-subtitle">Track your progress across different subjects</p>
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                <span className="text-white/90 font-medium">{subject.name}</span>
              </div>
              <div className="text-right">
                <div className="text-white/90 font-semibold">{subject.progress}% Complete</div>
                <div className="text-white/60 text-sm">{subject.hours}</div>
              </div>
            </div>
            <div className="widget-progress">
              <div
                className="widget-progress-fill"
                style={{
                  width: `${subject.progress}%`,
                  background: `linear-gradient(90deg, ${subject.color}, ${subject.color}dd)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
