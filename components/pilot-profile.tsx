"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Edit, Save, Youtube, Play, Calendar, Award, Clock, TrendingUp, Plane } from "lucide-react"

interface PilotProfileProps {
  username: string
  onUsernameChange: (username: string) => void
}

interface YouTubeVideo {
  id: string
  title: string
  url: string
  duration: string
  uploadDate: string
  views: number
  description: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedDate: string
  category: "study" | "consistency" | "achievement" | "milestone"
}

export function PilotProfile({ username, onUsernameChange }: PilotProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUsername, setEditedUsername] = useState(username)
  const [bio, setBio] = useState("Aspiring engineer preparing for JEE Advanced. Sky is not the limit!")
  const [editedBio, setEditedBio] = useState(bio)
  const [callSign, setCallSign] = useState("MAVERICK")
  const [editedCallSign, setEditedCallSign] = useState(callSign)

  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([
    {
      id: "1",
      title: "Study With Me - Physics Thermodynamics | 2 Hours",
      url: "https://youtube.com/watch?v=example1",
      duration: "2:15:30",
      uploadDate: "2024-01-25",
      views: 156,
      description: "Deep focus session covering thermodynamics concepts",
    },
    {
      id: "2",
      title: "Chemistry Organic Reactions Marathon | 3 Hours",
      url: "https://youtube.com/watch?v=example2",
      duration: "3:02:45",
      uploadDate: "2024-01-24",
      views: 203,
      description: "Complete organic chemistry revision session",
    },
    {
      id: "3",
      title: "Math Problem Solving Session | Calculus",
      url: "https://youtube.com/watch?v=example3",
      duration: "1:45:20",
      uploadDate: "2024-01-23",
      views: 89,
      description: "Solving complex calculus problems step by step",
    },
  ])

  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    description: "",
  })

  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Flight",
      description: "Completed your first study session",
      icon: "🛫",
      unlockedDate: "2024-01-15",
      category: "milestone",
    },
    {
      id: "2",
      title: "Study Streak",
      description: "Maintained 7-day study streak",
      icon: "🔥",
      unlockedDate: "2024-01-20",
      category: "consistency",
    },
    {
      id: "3",
      title: "Physics Ace",
      description: "Scored 90+ in physics mock test",
      icon: "⚡",
      unlockedDate: "2024-01-22",
      category: "achievement",
    },
    {
      id: "4",
      title: "Time Master",
      description: "Completed 50 hours of focused study",
      icon: "⏰",
      unlockedDate: "2024-01-24",
      category: "study",
    },
  ])

  const stats = {
    totalStudyHours: 156,
    streakDays: 12,
    completedTopics: 23,
    averageScore: 85,
    totalVideos: youtubeVideos.length,
    totalViews: youtubeVideos.reduce((sum, video) => sum + video.views, 0),
  }

  const handleSaveProfile = () => {
    onUsernameChange(editedUsername)
    setBio(editedBio)
    setCallSign(editedCallSign)
    setIsEditing(false)
  }

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.url) return

    const video: YouTubeVideo = {
      id: Date.now().toString(),
      title: newVideo.title,
      url: newVideo.url,
      duration: "0:00:00", // Would be fetched from YouTube API
      uploadDate: new Date().toISOString().split("T")[0],
      views: 0,
      description: newVideo.description,
    }

    setYoutubeVideos([video, ...youtubeVideos])
    setNewVideo({ title: "", url: "", description: "" })
  }

  const getAchievementColor = (category: Achievement["category"]) => {
    switch (category) {
      case "study":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "consistency":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "achievement":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "milestone":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pilot Profile</h1>
        <p className="text-muted-foreground">Manage your profile and track your journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-card border-0 hud-glow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-accent" />
                  Pilot Info
                </span>
                {!isEditing ? (
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={handleSaveProfile}>
                    <Save className="w-4 h-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 hud-glow">
                  <Plane className="w-10 h-10 text-white" />
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedCallSign}
                      onChange={(e) => setEditedCallSign(e.target.value)}
                      placeholder="Call Sign"
                      className="text-center font-bold glass-card border-accent/30"
                    />
                    <Input
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      placeholder="Pilot Name"
                      className="text-center glass-card border-accent/30"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-accent">{callSign}</h3>
                    <p className="text-lg text-foreground">{username}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                {isEditing ? (
                  <Textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="glass-card border-accent/30"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{bio}</p>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3">Mission Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Study Hours</span>
                    <span className="text-sm font-semibold text-accent">{stats.totalStudyHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Streak</span>
                    <span className="text-sm font-semibold text-accent">{stats.streakDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Topics Mastered</span>
                    <span className="text-sm font-semibold text-accent">{stats.completedTopics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Score</span>
                    <span className="text-sm font-semibold text-accent">{stats.averageScore}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Study Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Goal Achievement</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Consistency</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="videos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 glass-card">
              <TabsTrigger value="videos" className="flex items-center space-x-2">
                <Youtube className="w-4 h-4" />
                <span>Study Videos</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Achievements</span>
              </TabsTrigger>
            </TabsList>

            {/* YouTube Videos */}
            <TabsContent value="videos" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Youtube className="w-5 h-5 mr-2 text-accent" />
                      Study With Me Videos
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{stats.totalVideos} videos</span>
                      <span>{stats.totalViews} total views</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add New Video */}
                  <div className="p-4 rounded-lg glass-card border border-accent/30">
                    <h4 className="font-semibold mb-3">Add New Study Video</h4>
                    <div className="space-y-3">
                      <Input
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        placeholder="Video title"
                        className="glass-card border-accent/30"
                      />
                      <Input
                        value={newVideo.url}
                        onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                        placeholder="YouTube URL"
                        className="glass-card border-accent/30"
                      />
                      <Textarea
                        value={newVideo.description}
                        onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                        placeholder="Video description"
                        className="glass-card border-accent/30"
                      />
                      <Button onClick={handleAddVideo} className="hud-glow bg-accent hover:bg-accent/90">
                        <Youtube className="w-4 h-4 mr-2" />
                        Add Video
                      </Button>
                    </div>
                  </div>

                  {/* Video List */}
                  <div className="space-y-3">
                    {youtubeVideos.map((video) => (
                      <div key={video.id} className="p-4 rounded-lg glass-card border-l-4 border-l-accent">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{video.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {video.duration}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {video.uploadDate}
                              </span>
                              <span>{video.views} views</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="glass-card bg-transparent">
                            <Play className="w-3 h-3 mr-1" />
                            Watch
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-accent" />
                    Mission Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 rounded-lg glass-card border-l-4 border-l-accent">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge className={getAchievementColor(achievement.category)}>
                                {achievement.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{achievement.unlockedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
