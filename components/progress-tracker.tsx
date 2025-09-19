"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Clock, Target, BookOpen, Plus, Settings } from "lucide-react"

interface Subject {
  name: string
  progress: number
  hoursCompleted: number
  totalHours: number
  color: string
}

interface Goal {
  name: string
  progress: number
  current: number
  target: number
  unit: string
  dueDate: string
}

export function ProgressTracker() {
  const [useBackdrop, setUseBackdrop] = useState(false)

  const [subjects] = useState<Subject[]>([
    { name: "Mathematics", progress: 75, hoursCompleted: 75, totalHours: 100, color: "bg-blue-500" },
    { name: "Physics", progress: 60, hoursCompleted: 48, totalHours: 80, color: "bg-green-500" },
    { name: "Chemistry", progress: 60, hoursCompleted: 40, totalHours: 90, color: "bg-blue-500" },
    { name: "Biology", progress: 45, hoursCompleted: 56, totalHours: 70, color: "bg-red-500" },
  ])

  const [monthlyGoals] = useState<Goal[]>([
    { name: "Study Hours This Month", progress: 74, current: 89, target: 120, unit: "hours", dueDate: "31/01/2024" },
    {
      name: "Practice Problems Solved",
      progress: 68,
      current: 342,
      target: 500,
      unit: "problems",
      dueDate: "31/01/2024",
    },
    { name: "Mock Tests Completed", progress: 70, current: 7, target: 10, unit: "tests", dueDate: "31/01/2024" },
  ])

  const totalStudyHours = subjects.reduce((sum, subject) => sum + subject.hoursCompleted, 0)
  const averageProgress = Math.round(subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length)
  const activeSubjects = subjects.length

  return (
    <div className={`min-h-screen relative overflow-hidden ${useBackdrop ? "" : "bg-transparent"}`}>
      {useBackdrop && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/surgeon-backdrop.png')`,
              backgroundColor: "#1a1a2e",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/[0.95] via-slate-800/[0.95] to-slate-900/[0.95] backdrop-blur-[1px]" />
        </>
      )}

      <div className={`${useBackdrop ? "relative z-10" : ""} space-y-6`}>
        <div
          className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-2xl rounded-2xl" : "glass-widget"} p-6`}
        >
          <div className="flex items-center justify-between">
            <div className="widget-header">
              <div className="widget-icon">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className={`widget-title ${useBackdrop ? "text-white drop-shadow-lg" : ""}`}>Progress Tracker</h1>
                <p className={`widget-subtitle ${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>
                  Monitor your study progress and achievements
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Settings className={`w-4 h-4 ${useBackdrop ? "text-white/80" : "text-muted-foreground"}`} />
              <Switch checked={useBackdrop} onCheckedChange={setUseBackdrop} />
              <span className={`text-sm ${useBackdrop ? "text-white/90 drop-shadow-sm" : "text-muted-foreground"}`}>
                Backdrop
              </span>
            </div>
          </div>
        </div>

        <div className="floating-grid floating-grid-3">
          <div
            className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-widget"} stat-card`}
          >
            <div className="widget-icon mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className={`stat-value ${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>{totalStudyHours}h</div>
            <div className={`stat-label ${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>Total Study Hours</div>
          </div>

          <div
            className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-widget"} stat-card`}
          >
            <div className="widget-icon mx-auto mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className={`stat-value ${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>{averageProgress}%</div>
            <div className={`stat-label ${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>Average Progress</div>
          </div>

          <div
            className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-widget"} stat-card`}
          >
            <div className="widget-icon mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className={`stat-value ${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>{activeSubjects}</div>
            <div className={`stat-label ${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>Active Subjects</div>
          </div>
        </div>

        <div className="floating-grid floating-grid-2">
          <div
            className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-widget"} p-6`}
          >
            <div className="widget-header">
              <div className="widget-icon">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className={`widget-title ${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Subject Progress</h2>
                <p className={`widget-subtitle ${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>
                  Track your progress across different subjects
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                      <span className={`font-medium ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                        {subject.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                      >
                        {subject.hoursCompleted}h / {subject.totalHours}h
                      </div>
                      <div className={`text-xs ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                        {subject.progress}% Complete
                      </div>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-widget"} p-6`}
          >
            <div className="widget-header">
              <div className="widget-icon">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className={`widget-title ${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Monthly Goals</h2>
                <p className={`widget-subtitle ${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>
                  Track your monthly study goals and targets
                </p>
              </div>
              <Button
                className={`${useBackdrop ? "bg-emerald-600/80 hover:bg-emerald-600/90 text-white border-emerald-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl" : "glass-widget bg-primary hover:bg-primary/90 border-0"} ml-auto`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="space-y-6">
              {monthlyGoals.map((goal) => (
                <div key={goal.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                      {goal.name}
                    </span>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                      >
                        {goal.current} / {goal.target} {goal.unit}
                      </div>
                      <div className={`text-xs ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                        Due: {goal.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                      {goal.progress}% Complete
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
