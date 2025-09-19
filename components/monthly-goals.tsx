import { Target, Plus } from "lucide-react"

export function MonthlyGoals() {
  const goals = [
    { name: "Study Hours This Month", progress: 74, current: "89", target: "120 hours", due: "31/01/2024" },
    { name: "Practice Problems Solved", progress: 68, current: "342", target: "500 problems", due: "31/01/2024" },
    { name: "Mock Tests Completed", progress: 70, current: "7", target: "10 tests", due: "31/01/2024" },
  ]

  return (
    <div className="space-y-6">
      <div className="widget-header">
        <div className="widget-icon">
          <Target className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="widget-title">Monthly Goals</h3>
          <p className="widget-subtitle">Track your monthly study goals and targets</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 text-sm transition-colors">
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.name} className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white/90 font-medium">{goal.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-white/70 text-sm">
                    {goal.current} / {goal.target}
                  </span>
                  <span className="text-white/50 text-xs">Due: {goal.due}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/90 font-semibold">{goal.progress}% Complete</div>
              </div>
            </div>
            <div className="widget-progress">
              <div className="widget-progress-fill" style={{ width: `${goal.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
