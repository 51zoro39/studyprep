"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Eye, Search, Plus, Youtube } from "lucide-react"

interface StudyVideo {
  id: string
  title: string
  channel: string
  duration: string
  views: string
  subject: string
  thumbnail: string
  url: string
}

export function YoutubeStudySessions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [videos] = useState<StudyVideo[]>([
    {
      id: "1",
      title: "Thermodynamics Complete Chapter - JEE Advanced",
      channel: "Physics Wallah",
      duration: "2:45:30",
      views: "1.2M",
      subject: "Physics",
      thumbnail: "/placeholder.svg?height=180&width=320",
      url: "#",
    },
    {
      id: "2",
      title: "Organic Chemistry Reactions - NEET Preparation",
      channel: "Unacademy",
      duration: "1:30:15",
      views: "850K",
      subject: "Chemistry",
      thumbnail: "/placeholder.svg?height=180&width=320",
      url: "#",
    },
    {
      id: "3",
      title: "Calculus Integration Techniques",
      channel: "Khan Academy",
      duration: "45:20",
      views: "2.1M",
      subject: "Mathematics",
      thumbnail: "/placeholder.svg?height=180&width=320",
      url: "#",
    },
  ])

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "physics":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "chemistry":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "mathematics":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "biology":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="apple-glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Study Sessions</h1>
            <p className="text-muted-foreground">Curated educational videos for your preparation</p>
          </div>
          <Button className="apple-glass-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Video
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="apple-glass-card border-0">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search videos by title, subject, or channel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 apple-glass-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="apple-glass-card border-0 apple-hover-lift">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="lg" className="apple-glass-button">
                    <Play className="w-6 h-6 mr-2" />
                    Watch
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground line-clamp-2 flex-1">{video.title}</h3>
                  <Badge className={getSubjectColor(video.subject)}>{video.subject}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-muted-foreground">{video.channel}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full apple-glass-button">
                  <Play className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <Card className="apple-glass-card border-0">
          <CardContent className="p-12 text-center">
            <Youtube className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or add new study videos</p>
            <Button className="apple-glass-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
