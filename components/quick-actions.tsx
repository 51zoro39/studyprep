import { Play, BookOpen, Calendar, Settings } from "lucide-react"

export function QuickActions() {
  const actions = [
    { icon: Play, label: "Start Study", color: "bg-green-500/80" },
    { icon: BookOpen, label: "Resources", color: "bg-blue-500/80" },
    { icon: Calendar, label: "Schedule", color: "bg-purple-500/80" },
    { icon: Settings, label: "Settings", color: "bg-gray-500/80" },
  ]

  return (
    <div className="space-y-6">
      <div className="widget-header">
        <div className="widget-icon">
          <Play className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="widget-title">Quick Actions</h3>
          <p className="widget-subtitle">Fast access to tools</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`${action.color} hover:scale-105 transition-transform p-4 rounded-xl backdrop-filter backdrop-blur-sm border border-white/20`}
          >
            <action.icon className="w-6 h-6 text-white mx-auto mb-2" />
            <div className="text-white text-sm font-medium">{action.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
