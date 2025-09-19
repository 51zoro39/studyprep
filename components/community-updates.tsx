"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  ImageIcon,
  Quote,
  CheckSquare,
  Heart,
  MessageCircle,
  Share2,
  Upload,
  Users,
  TrendingUp,
} from "lucide-react"

interface CommunityPost {
  id: string
  type: "image" | "quote" | "achievement" | "discussion"
  content: string
  imageUrl?: string
  date: string
  likes: number
  comments: Comment[]
  tags: string[]
  author: string
}

interface Comment {
  id: string
  text: string
  date: string
  author: string
}

export function CommunityUpdates() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      type: "quote",
      content: "The sky is not the limit, it's just the beginning. Today I conquered thermodynamics!",
      date: "2024-01-25",
      likes: 15,
      comments: [
        { id: "1", text: "Great motivation!", date: "2024-01-25", author: "Study Buddy" },
        { id: "2", text: "Keep it up!", date: "2024-01-25", author: "Mentor" },
      ],
      tags: ["motivation", "physics", "thermodynamics"],
      author: "Alex Chen",
    },
    {
      id: "2",
      type: "achievement",
      content: "Completed 4 hours of focused study today! Physics mock test score: 85%",
      date: "2024-01-24",
      likes: 28,
      comments: [{ id: "3", text: "Amazing progress!", date: "2024-01-24", author: "Sarah" }],
      tags: ["achievement", "physics", "mock-test"],
      author: "Jordan Smith",
    },
    {
      id: "3",
      type: "discussion",
      content: "Anyone else struggling with organic chemistry reactions? Looking for study partners!",
      date: "2024-01-23",
      likes: 12,
      comments: [
        { id: "4", text: "I'm in! Let's form a study group", date: "2024-01-23", author: "Emma" },
        { id: "5", text: "Count me in too!", date: "2024-01-23", author: "Mike" },
      ],
      tags: ["chemistry", "study-group", "help"],
      author: "Taylor Johnson",
    },
  ])

  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    type: "discussion" as CommunityPost["type"],
    content: "",
    tags: "",
  })

  const handleAddPost = () => {
    const post: CommunityPost = {
      id: Date.now().toString(),
      type: newPost.type,
      content: newPost.content,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: [],
      tags: newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      author: "You",
    }

    setPosts([post, ...posts])
    setNewPost({
      type: "discussion",
      content: "",
      tags: "",
    })
    setIsAddPostOpen(false)
  }

  const likePost = (id: string) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)))
  }

  const getPostIcon = (type: CommunityPost["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "quote":
        return <Quote className="w-4 h-4" />
      case "achievement":
        return <CheckSquare className="w-4 h-4" />
      case "discussion":
        return <MessageCircle className="w-4 h-4" />
      default:
        return <MessageCircle className="w-4 h-4" />
    }
  }

  const getPostTypeColor = (type: CommunityPost["type"]) => {
    switch (type) {
      case "image":
        return "bg-blue-100 text-blue-800"
      case "quote":
        return "bg-purple-100 text-purple-800"
      case "achievement":
        return "bg-green-100 text-green-800"
      case "discussion":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
            <p className="text-muted-foreground">Connect with fellow students and share your journey</p>
          </div>
          <Dialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen}>
            <DialogTrigger asChild>
              <Button className="modern-glow bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-0">
              <DialogHeader>
                <DialogTitle>Share with Community</DialogTitle>
                <DialogDescription>Share your thoughts, achievements, or start a discussion</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post-type">Post Type</Label>
                  <Tabs
                    value={newPost.type}
                    onValueChange={(value: string) => setNewPost({ ...newPost, type: value as CommunityPost["type"] })}
                  >
                    <TabsList className="grid w-full grid-cols-4 glass-card">
                      <TabsTrigger value="discussion">Discussion</TabsTrigger>
                      <TabsTrigger value="quote">Quote</TabsTrigger>
                      <TabsTrigger value="achievement">Achievement</TabsTrigger>
                      <TabsTrigger value="image">Image</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {newPost.type === "image" && (
                  <div className="space-y-2">
                    <Label htmlFor="image-upload">Upload Image</Label>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center glass-card">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="post-content">
                    {newPost.type === "quote"
                      ? "Your Quote/Thought"
                      : newPost.type === "image"
                        ? "Image Caption"
                        : newPost.type === "achievement"
                          ? "Achievement Description"
                          : "Discussion Topic"}
                  </Label>
                  <Textarea
                    id="post-content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder={
                      newPost.type === "quote"
                        ? "Share your motivational thought..."
                        : newPost.type === "image"
                          ? "Describe your image..."
                          : newPost.type === "achievement"
                            ? "What did you accomplish?"
                            : "What would you like to discuss?"
                    }
                    className="glass-card border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-tags">Tags (comma-separated)</Label>
                  <Input
                    id="post-tags"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    placeholder="e.g., motivation, physics, study-tips"
                    className="glass-card border-border"
                  />
                </div>

                <Button onClick={handleAddPost} className="w-full modern-glow bg-primary hover:bg-primary/90">
                  Share Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Community Stats */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2 text-primary" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Members</span>
                <span className="text-sm font-semibold text-primary">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Posts Today</span>
                <span className="text-sm font-semibold text-primary">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Study Groups</span>
                <span className="text-sm font-semibold text-primary">15</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["#physics", "#chemistry", "#motivation", "#study-tips", "#mock-tests"].map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="lg:col-span-3">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Community Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="p-4 rounded-lg glass-card border-l-4 border-l-primary">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-semibold">{post.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{post.author}</p>
                        <div className="flex items-center space-x-2">
                          {getPostIcon(post.type)}
                          <Badge className={getPostTypeColor(post.type)}>{post.type}</Badge>
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {post.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={post.imageUrl || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <p className="text-foreground mb-3">{post.content}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => likePost(post.id)}
                        className="flex items-center space-x-1"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="text-sm text-muted-foreground mb-1">
                          <span className="font-semibold">{comment.author}:</span> {comment.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
