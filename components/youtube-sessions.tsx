"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Youtube, Upload, Play, Clock, Calendar, Trash2 } from "lucide-react"

interface StudySession {
  id: string
  title: string
  description: string
  youtubeUrl: string
  duration: string
  date: string
  thumbnail?: string
}

export function YoutubeSessions() {
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: "1",
      title: "Math Study Session - Calculus",
      description: "Deep dive into derivatives and integrals",
      youtubeUrl: "https://youtube.com/watch?v=example1",
      duration: "2h 30m",
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "Physics Lab Review",
      description: "Going through quantum mechanics problems",
      youtubeUrl: "https://youtube.com/watch?v=example2",
      duration: "1h 45m",
      date: "2024-01-14",
    },
  ])

  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    duration: "",
  })

  const handleAddSession = () => {
    if (newSession.title && newSession.youtubeUrl) {
      const session: StudySession = {
        id: Date.now().toString(),
        ...newSession,
        date: new Date().toISOString().split("T")[0],
      }
      setSessions([session, ...sessions])
      setNewSession({ title: "", description: "", youtubeUrl: "", duration: "" })
    }
  }

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
          <Youtube className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Study Sessions</h1>
          <p className="text-muted-foreground">Upload and manage your daily study with me sessions</p>
        </div>
      </div>

      {/* Add New Session */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Add New Study Session</span>
          </CardTitle>
          <CardDescription>Upload your latest study with me session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                placeholder="e.g., Math Study Session - Algebra"
                value={newSession.title}
                onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 2h 30m"
                value={newSession.duration}
                onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what you studied..."
              value={newSession.description}
              onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input
              id="youtubeUrl"
              placeholder="https://youtube.com/watch?v=..."
              value={newSession.youtubeUrl}
              onChange={(e) => setNewSession({ ...newSession, youtubeUrl: e.target.value })}
            />
          </div>
          <Button onClick={handleAddSession} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Study Session
          </Button>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{session.title}</h3>
                  <p className="text-muted-foreground mb-4">{session.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={session.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="w-4 h-4 mr-1" />
                      Watch
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSession(session.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
