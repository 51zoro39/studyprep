"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Target, Calendar, Clock, TrendingUp, Award, Zap, CheckCircle } from "lucide-react"

interface DashboardProps {
  username: string
}

export function Dashboard({ username }: DashboardProps) {
  const stats = {
    studyHours: 156,
    completedTopics: 23,
    upcomingTests: 3,
    streakDays: 12,
  }

  const recentActivities = [
    { subject: "Physics", topic: "Thermodynamics", progress: 85 },
    { subject: "Chemistry", topic: "Organic Reactions", progress: 72 },
    { subject: "Mathematics", topic: "Calculus", progress: 91 },
  ]

  const todaysTasks = [
    { task: "Complete Physics Chapter 12", completed: true },
    { task: "Solve 20 Chemistry MCQs", completed: true },
    { task: "Review Math formulas", completed: false },
    { task: "Watch study session video", completed: false },
  ]

  return (
    <div className="space-y-6">
      <div className="glass-widget">
        <div className="widget-header">
          <div className="widget-icon">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="widget-title text-2xl">Study Dashboard</h1>
            <p className="widget-subtitle">Welcome back, Student! Ready to ace those exams?</p>
          </div>
        </div>
      </div>

      <div className="floating-grid floating-grid-4">
        <div className="glass-widget stat-card">
          <div className="widget-icon mx-auto mb-4">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="stat-value text-primary">156</div>
          <div className="stat-label font-medium">Study Hours</div>
          <p className="text-xs text-muted-foreground mt-2">+12 hours this week</p>
        </div>

        <div className="glass-widget stat-card">
          <div className="widget-icon mx-auto mb-4">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="stat-value text-primary">23</div>
          <div className="stat-label font-medium">Topics Mastered</div>
          <p className="text-xs text-muted-foreground mt-2">+3 this week</p>
        </div>

        <div className="glass-widget stat-card">
          <div className="widget-icon mx-auto mb-4">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="stat-value text-primary">3</div>
          <div className="stat-label font-medium">Upcoming Tests</div>
          <p className="text-xs text-muted-foreground mt-2">Next: Physics Mock Test</p>
        </div>

        <div className="glass-widget stat-card">
          <div className="widget-icon mx-auto mb-4">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div className="stat-value text-primary">12 days</div>
          <div className="stat-label font-medium">Study Streak</div>
          <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
        </div>
      </div>

      <div className="floating-grid floating-grid-2">
        <div className="glass-widget">
          <div className="widget-header">
            <div className="widget-icon">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="widget-title">Recent Study Progress</h3>
              <p className="widget-subtitle">Your latest subject progress</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Physics</span>
                <span className="text-primary font-semibold">85%</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Thermodynamics</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Chemistry</span>
                <span className="text-primary font-semibold">72%</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Organic Reactions</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">Mathematics</span>
                <span className="text-primary font-semibold">91%</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Calculus</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </div>
        </div>

        <div className="glass-widget">
          <div className="widget-header">
            <div className="widget-icon">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="widget-title">Today's Tasks</h3>
              <p className="widget-subtitle">Complete these tasks to stay on track</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 bg-primary border-primary flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm line-through text-muted-foreground">Complete Physics Chapter 12</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 bg-primary border-primary flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm line-through text-muted-foreground">Solve 20 Chemistry MCQs</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
              <span className="text-sm text-foreground">Review Math formulas</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
              <span className="text-sm text-foreground">Watch study session video</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-widget">
        <div className="widget-header">
          <div className="widget-icon">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="widget-title">Quick Actions</h3>
            <p className="widget-subtitle">Jump into your study sessions</p>
          </div>
        </div>
        <div className="floating-grid floating-grid-4">
          <Button className="h-16 flex-col space-y-2 glass-widget bg-primary hover:bg-primary/90 border-0 text-white">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">Study Resources</span>
          </Button>
          <Button className="h-16 flex-col space-y-2 glass-widget bg-primary hover:bg-primary/90 border-0 text-white">
            <Target className="w-6 h-6" />
            <span className="text-xs">Focus Timer</span>
          </Button>
          <Button className="h-16 flex-col space-y-2 glass-widget bg-primary hover:bg-primary/90 border-0 text-white">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Schedule</span>
          </Button>
          <Button className="h-16 flex-col space-y-2 glass-widget bg-primary hover:bg-primary/90 border-0 text-white">
            <Clock className="w-6 h-6" />
            <span className="text-xs">Study Session</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
