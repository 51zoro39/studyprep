"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  FileText,
  Upload,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Star,
  Clock,
  Settings,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  type: "notes" | "book" | "question-paper" | "video" | "other"
  subject: "physics" | "chemistry" | "mathematics" | "biology" | "general"
  examType: "jee" | "neet" | "both" | "general"
  description: string
  uploadDate: string
  size: string
  isFavorite: boolean
  tags: string[]
  url?: string
}

export function StudyResources() {
  const [backdropEnabled, setBackdropEnabled] = useState(false)
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Thermodynamics Complete Notes",
      type: "notes",
      subject: "physics",
      examType: "jee",
      description: "Comprehensive notes covering all thermodynamics concepts for JEE Advanced",
      uploadDate: "2024-01-15",
      size: "2.5 MB",
      isFavorite: true,
      tags: ["thermodynamics", "heat", "entropy"],
    },
    {
      id: "2",
      title: "Organic Chemistry Reaction Mechanisms",
      type: "book",
      subject: "chemistry",
      examType: "both",
      description: "Detailed book on organic reaction mechanisms with examples",
      uploadDate: "2024-01-10",
      size: "15.2 MB",
      isFavorite: false,
      tags: ["organic", "reactions", "mechanisms"],
    },
    {
      id: "3",
      title: "JEE Advanced Mock Test 2024",
      type: "question-paper",
      subject: "general",
      examType: "jee",
      description: "Full-length mock test with solutions",
      uploadDate: "2024-01-20",
      size: "1.8 MB",
      isFavorite: true,
      tags: ["mock-test", "jee", "practice"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedExamType, setSelectedExamType] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newResource, setNewResource] = useState({
    title: "",
    type: "notes" as Resource["type"],
    subject: "physics" as Resource["subject"],
    examType: "jee" as Resource["examType"],
    description: "",
    tags: "",
  })

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject
    const matchesType = selectedType === "all" || resource.type === selectedType
    const matchesExamType =
      selectedExamType === "all" || resource.examType === selectedExamType || resource.examType === "both"

    return matchesSearch && matchesSubject && matchesType && matchesExamType
  })

  const handleAddResource = () => {
    const resource: Resource = {
      id: Date.now().toString(),
      title: newResource.title,
      type: newResource.type,
      subject: newResource.subject,
      examType: newResource.examType,
      description: newResource.description,
      uploadDate: new Date().toISOString().split("T")[0],
      size: "0 MB", // Would be calculated from actual file
      isFavorite: false,
      tags: newResource.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setResources([resource, ...resources])
    setNewResource({
      title: "",
      type: "notes",
      subject: "physics",
      examType: "jee",
      description: "",
      tags: "",
    })
    setIsAddDialogOpen(false)
  }

  const toggleFavorite = (id: string) => {
    setResources(
      resources.map((resource) => (resource.id === id ? { ...resource, isFavorite: !resource.isFavorite } : resource)),
    )
  }

  const deleteResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "notes":
        return <FileText className="w-4 h-4" />
      case "book":
        return <BookOpen className="w-4 h-4" />
      case "question-paper":
        return <Edit className="w-4 h-4" />
      case "video":
        return <Eye className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getSubjectColor = (subject: Resource["subject"]) => {
    switch (subject) {
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

  const getExamTypeColor = (examType: Resource["examType"]) => {
    switch (examType) {
      case "jee":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "neet":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30"
      case "both":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div
      className={`space-y-6 min-h-screen ${backdropEnabled ? "bg-cover bg-center bg-fixed relative" : ""}`}
      style={
        backdropEnabled
          ? {
              backgroundImage: "url(/laptop-books-backdrop.png)",
            }
          : {}
      }
    >
      {backdropEnabled && <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10" />}

      <div
        className={
          backdropEnabled
            ? "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6"
            : "glass-card p-6 rounded-xl"
        }
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${backdropEnabled ? "text-white" : "text-foreground"}`}>
              Study Arsenal
            </h1>
            <p className={backdropEnabled ? "text-white/80" : "text-muted-foreground"}>
              Manage your study materials and resources
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={backdropEnabled}
                onCheckedChange={setBackdropEnabled}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${backdropEnabled ? "text-white/80" : "text-muted-foreground"}`}>Backdrop</span>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className={
                    backdropEnabled
                      ? "backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
                      : "hud-glow bg-accent hover:bg-accent/90"
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent
                className={
                  backdropEnabled ? "backdrop-blur-sm bg-black/80 border border-white/10" : "glass-card border-0"
                }
              >
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>Upload or add a new study resource to your arsenal</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newResource.title}
                      onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                      placeholder="Enter resource title"
                      className="glass-card border-accent/30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newResource.type}
                        onValueChange={(value: Resource["type"]) => setNewResource({ ...newResource, type: value })}
                      >
                        <SelectTrigger className="glass-card border-accent/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-0">
                          <SelectItem value="notes">Notes</SelectItem>
                          <SelectItem value="book">Book</SelectItem>
                          <SelectItem value="question-paper">Question Paper</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={newResource.subject}
                        onValueChange={(value: Resource["subject"]) =>
                          setNewResource({ ...newResource, subject: value })
                        }
                      >
                        <SelectTrigger className="glass-card border-accent/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-0">
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examType">Exam Type</Label>
                    <Select
                      value={newResource.examType}
                      onValueChange={(value: Resource["examType"]) =>
                        setNewResource({ ...newResource, examType: value })
                      }
                    >
                      <SelectTrigger className="glass-card border-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-0">
                        <SelectItem value="jee">JEE</SelectItem>
                        <SelectItem value="neet">NEET</SelectItem>
                        <SelectItem value="both">Both JEE & NEET</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newResource.description}
                      onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                      placeholder="Describe the resource"
                      className="glass-card border-accent/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newResource.tags}
                      onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                      placeholder="e.g., thermodynamics, heat, entropy"
                      className="glass-card border-accent/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 text-center glass-card">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-accent" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, PPT, MP4 up to 50MB</p>
                    </div>
                  </div>
                  <Button onClick={handleAddResource} className="w-full hud-glow bg-accent hover:bg-accent/90">
                    Add Resource
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Card className={backdropEnabled ? "backdrop-blur-sm bg-white/5 border border-white/10" : "glass-card border-0"}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${backdropEnabled ? "text-white/60" : "text-muted-foreground"}`}
              />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  backdropEnabled
                    ? "pl-10 backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-white/60"
                    : "pl-10 glass-card border-accent/30"
                }
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-40 glass-card border-accent/30">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent className="glass-card border-0">
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-40 glass-card border-accent/30">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="glass-card border-0">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="question-paper">Question Papers</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger className="w-full md:w-40 glass-card border-accent/30">
                <SelectValue placeholder="Exam" />
              </SelectTrigger>
              <SelectContent className="glass-card border-0">
                <SelectItem value="all">All Exams</SelectItem>
                <SelectItem value="jee">JEE</SelectItem>
                <SelectItem value="neet">NEET</SelectItem>
                <SelectItem value="both">Both</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card
            key={resource.id}
            className={
              backdropEnabled
                ? "backdrop-blur-sm bg-white/5 border border-white/10 hover:scale-105 transition-transform"
                : "glass-card border-0 hud-glow hover:scale-105 transition-transform"
            }
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(resource.type)}
                  <CardTitle className={`text-lg line-clamp-1 ${backdropEnabled ? "text-white" : ""}`}>
                    {resource.title}
                  </CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(resource.id)} className="h-8 w-8">
                  <Star
                    className={`w-4 h-4 ${resource.isFavorite ? "fill-accent text-accent" : backdropEnabled ? "text-white/60" : "text-muted-foreground"}`}
                  />
                </Button>
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <Badge className={getSubjectColor(resource.subject)}>{resource.subject}</Badge>
                <Badge variant="outline" className="text-xs">
                  {resource.type}
                </Badge>
                <Badge className={getExamTypeColor(resource.examType)}>
                  {resource.examType === "both" ? "JEE & NEET" : resource.examType.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`text-sm line-clamp-2 ${backdropEnabled ? "text-white/80" : "text-muted-foreground"}`}>
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {resource.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{resource.uploadDate}</span>
                </div>
                <span>{resource.size}</span>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 hud-glow bg-accent hover:bg-accent/90">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="glass-card border-accent/30 bg-transparent">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteResource(resource.id)}
                  className="glass-card border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="glass-card border-0">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedSubject !== "all" || selectedType !== "all" || selectedExamType !== "all"
                ? "Try adjusting your search or filters"
                : "Start by adding your first study resource"}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="hud-glow bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
