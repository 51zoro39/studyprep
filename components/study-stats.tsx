import { Clock } from "lucide-react"

export function StudyStats() {
  return (
    <div className="space-y-6">
      <div className="widget-header">
        <div className="widget-icon">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="widget-title">Study Stats</h3>
          <p className="widget-subtitle">Your learning metrics</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="stat-card">
          <div className="stat-value">219h</div>
          <div className="stat-label">Total Study Hours</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">65%</div>
          <div className="stat-label">Average Progress</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">4</div>
          <div className="stat-label">Active Subjects</div>
        </div>
      </div>
    </div>
  )
}
