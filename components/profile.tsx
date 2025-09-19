"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Calendar, Target, Trophy, BookOpen, Clock, Edit3, Settings } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: "study" | "exam" | "streak" | "milestone"
}

export function Profile() {
  const [useBackdrop, setUseBackdrop] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Student",
    email: "student@example.com",
    joinDate: "January 2024",
    studyStreak: 15,
    totalStudyHours: 219,
    completedSubjects: 2,
    averageScore: 78,
  })

  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Study Streak Master",
      description: "Maintained 15-day study streak",
      date: "2024-01-25",
      type: "streak",
    },
    {
      id: "2",
      title: "Physics Champion",
      description: "Scored 90% in Physics mock test",
      date: "2024-01-20",
      type: "exam",
    },
    {
      id: "3",
      title: "100 Hours Milestone",
      description: "Completed 100 hours of study",
      date: "2024-01-15",
      type: "milestone",
    },
  ])

  const getAchievementColor = (type: Achievement["type"]) => {
    switch (type) {
      case "study":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "exam":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "streak":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "milestone":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${useBackdrop ? "" : "bg-transparent"}`}>
      {useBackdrop && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/sunshine-road-backdrop.png')`,
              backgroundColor: "#2a1810",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/[0.95] via-orange-900/[0.95] to-amber-900/[0.95] backdrop-blur-[1px]" />
        </>
      )}

      <div className={`${useBackdrop ? "relative z-10" : ""} space-y-6`}>
        {/* Header */}
        <div
          className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-2xl rounded-2xl" : "apple-glass-card"} p-6`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${useBackdrop ? "text-white drop-shadow-lg" : "text-foreground"}`}
              >
                Profile
              </h1>
              <p className={`${useBackdrop ? "text-white/80 drop-shadow-sm" : "text-muted-foreground"}`}>
                Manage your account and track your progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Settings className={`w-4 h-4 ${useBackdrop ? "text-white/80" : "text-muted-foreground"}`} />
                <Switch checked={useBackdrop} onCheckedChange={setUseBackdrop} />
                <span className={`text-sm ${useBackdrop ? "text-white/90 drop-shadow-sm" : "text-muted-foreground"}`}>
                  Backdrop
                </span>
              </div>
              <Button
                className={`${useBackdrop ? "bg-amber-600/80 hover:bg-amber-600/90 text-white border-amber-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl" : "apple-glass-button"}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card
              className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "apple-glass-card"} border-0`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  {isEditing ? (
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className={`text-center ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-amber-400/60 shadow-inner" : "apple-glass-input"}`}
                    />
                  ) : (
                    <h2
                      className={`text-xl font-bold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                    >
                      {profile.name}
                    </h2>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className={`w-4 h-4 ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`} />
                    {isEditing ? (
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className={`flex-1 ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-amber-400/60 shadow-inner" : "apple-glass-input"}`}
                      />
                    ) : (
                      <span className={`${useBackdrop ? "text-white/80" : "text-muted-foreground"}`}>
                        {profile.email}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className={`w-4 h-4 ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`} />
                    <span className={`${useBackdrop ? "text-white/80" : "text-muted-foreground"}`}>
                      Joined {profile.joinDate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "apple-glass-card"} border-0`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`${useBackdrop ? "text-white/80" : "text-muted-foreground"}`}>Study Streak</span>
                  <span className={`font-semibold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                    {profile.studyStreak} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${useBackdrop ? "text-white/80" : "text-muted-foreground"}`}>Total Hours</span>
                  <span className={`font-semibold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                    {profile.totalStudyHours}h
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${useBackdrop ? "text-white/80" : "text-muted-foreground"}`}>Average Score</span>
                  <span className={`font-semibold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                    {profile.averageScore}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Progress */}
            <Card
              className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "apple-glass-card"} border-0`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Study Progress Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`text-center p-4 ${useBackdrop ? "backdrop-blur-[1px] bg-white/[0.05] border border-white/[0.12] rounded-lg shadow-inner" : "apple-glass-widget"}`}
                  >
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div
                      className={`text-2xl font-bold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                    >
                      {profile.totalStudyHours}h
                    </div>
                    <div className={`text-sm ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                      Total Study Time
                    </div>
                  </div>

                  <div
                    className={`text-center p-4 ${useBackdrop ? "backdrop-blur-[1px] bg-white/[0.05] border border-white/[0.12] rounded-lg shadow-inner" : "apple-glass-widget"}`}
                  >
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div
                      className={`text-2xl font-bold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                    >
                      {profile.averageScore}%
                    </div>
                    <div className={`text-sm ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                      Average Score
                    </div>
                  </div>

                  <div
                    className={`text-center p-4 ${useBackdrop ? "backdrop-blur-[1px] bg-white/[0.05] border border-white/[0.12] rounded-lg shadow-inner" : "apple-glass-widget"}`}
                  >
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <div
                      className={`text-2xl font-bold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                    >
                      {achievements.length}
                    </div>
                    <div className={`text-sm ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                      Achievements
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className={`font-semibold ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                    Subject Progress
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                          Mathematics
                        </span>
                        <span className={`text-sm ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                          75%
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                          Physics
                        </span>
                        <span className={`text-sm ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                          60%
                        </span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}>
                          Chemistry
                        </span>
                        <span className={`text-sm ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                          45%
                        </span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card
              className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "apple-glass-card"} border-0`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-primary" />
                  <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 ${useBackdrop ? "backdrop-blur-[1px] bg-white/[0.05] border border-white/[0.12] rounded-lg shadow-inner" : "apple-glass-widget"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={`font-semibold mb-1 ${useBackdrop ? "text-white drop-shadow-sm" : "text-foreground"}`}
                        >
                          {achievement.title}
                        </h4>
                        <p className={`text-sm mb-2 ${useBackdrop ? "text-white/70" : "text-muted-foreground"}`}>
                          {achievement.description}
                        </p>
                        <p className={`text-xs ${useBackdrop ? "text-white/60" : "text-muted-foreground"}`}>
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getAchievementColor(achievement.type)}>{achievement.type}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
