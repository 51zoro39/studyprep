"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ImageIcon, Quote, CheckSquare, Upload, Calendar, Target, Trash2, Edit3, Settings } from "lucide-react"
import { useDailyContext } from "@/contexts/daily-context"

interface TodoItem {
  id: string
  task: string
  completed: boolean
  priority: "high" | "medium" | "low"
  type: "daily" | "weekly"
}

interface WeeklyTarget {
  id: string
  title: string
  description: string
  progress: number
  targetDate: string
  category: string
}

export function DailySection() {
  const [useBackdrop, setUseBackdrop] = useState(false)
  const { dailyData, setDailyImage, setDailyQuote, addDailyTodo, toggleDailyTodo, deleteDailyTodo } = useDailyContext()
  const { dailyImage, dailyQuote, dailyTodos } = dailyData

  const [isEditingQuote, setIsEditingQuote] = useState(false)
  const [tempQuote, setTempQuote] = useState(dailyQuote)

  const [weeklyTodos, setWeeklyTodos] = useState<TodoItem[]>([
    { id: "w1", task: "Complete all Physics chapters 13-16", completed: false, priority: "high", type: "weekly" },
    { id: "w2", task: "Finish Chemistry organic reactions", completed: false, priority: "high", type: "weekly" },
    { id: "w3", task: "Practice 200 Math problems", completed: true, priority: "medium", type: "weekly" },
  ])

  const [weeklyTargets, setWeeklyTargets] = useState<WeeklyTarget[]>([])

  const [newDailyTodo, setNewDailyTodo] = useState({
    task: "",
    priority: "medium" as TodoItem["priority"],
  })

  const [newWeeklyTodo, setNewWeeklyTodo] = useState({
    task: "",
    priority: "medium" as TodoItem["priority"],
  })

  const [newTarget, setNewTarget] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "",
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setDailyImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveQuote = () => {
    setDailyQuote(tempQuote)
    setIsEditingQuote(false)
  }

  const addDailyTodoHandler = () => {
    if (!newDailyTodo.task) return
    const todo: TodoItem = {
      id: Date.now().toString(),
      task: newDailyTodo.task,
      completed: false,
      priority: newDailyTodo.priority,
      type: "daily",
    }
    addDailyTodo(todo)
    setNewDailyTodo({ task: "", priority: "medium" })
  }

  const addWeeklyTodo = () => {
    if (!newWeeklyTodo.task) return
    const todo: TodoItem = {
      id: Date.now().toString(),
      task: newWeeklyTodo.task,
      completed: false,
      priority: newWeeklyTodo.priority,
      type: "weekly",
    }
    setWeeklyTodos([...weeklyTodos, todo])
    setNewWeeklyTodo({ task: "", priority: "medium" })
  }

  const addTarget = () => {
    if (!newTarget.title || !newTarget.description) return
    const target: WeeklyTarget = {
      id: Date.now().toString(),
      title: newTarget.title,
      description: newTarget.description,
      progress: 0,
      targetDate: newTarget.targetDate,
      category: newTarget.category,
    }
    setWeeklyTargets([...weeklyTargets, target])
    setNewTarget({ title: "", description: "", targetDate: "", category: "" })
  }

  const toggleTodo = (id: string, type: "daily" | "weekly") => {
    if (type === "daily") {
      toggleDailyTodo(id)
    } else {
      setWeeklyTodos(weeklyTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }
  }

  const deleteTodo = (id: string, type: "daily" | "weekly") => {
    if (type === "daily") {
      deleteDailyTodo(id)
    } else {
      setWeeklyTodos(weeklyTodos.filter((todo) => todo.id !== id))
    }
  }

  const getPriorityColor = (priority: TodoItem["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "physics":
        return "bg-blue-100 text-blue-800"
      case "chemistry":
        return "bg-green-100 text-green-800"
      case "mathematics":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const dailyCompletedTodos = dailyTodos.filter((todo) => todo.completed).length
  const weeklyCompletedTodos = weeklyTodos.filter((todo) => todo.completed).length

  return (
    <div className={`min-h-screen relative overflow-hidden ${useBackdrop ? "" : "bg-transparent"}`}>
      {useBackdrop && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/purple-evening-backdrop.png')`,
              backgroundColor: "#2a1a3e",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/[0.95] via-indigo-900/[0.95] to-purple-900/[0.95] backdrop-blur-[1px]" />
        </>
      )}

      <div className={`${useBackdrop ? "relative z-10" : ""} space-y-6`}>
        <div
          className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-2xl rounded-2xl" : "glass-card"} p-6 rounded-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${useBackdrop ? "text-white drop-shadow-lg" : "text-foreground"}`}
              >
                Daily Section
              </h1>
              <p className={`${useBackdrop ? "text-white/80 drop-shadow-sm" : "text-muted-foreground"}`}>
                Your daily image, quote, and tasks all in one place
              </p>
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

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList
            className={`${useBackdrop ? "backdrop-blur-[1px] bg-white/[0.05] border border-white/[0.12] rounded-lg p-1 shadow-lg" : "glass-card"}`}
          >
            <TabsTrigger
              value="daily"
              className={`${useBackdrop ? "text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/[0.02] data-[state=active]:backdrop-blur-[3px] rounded-md transition-all duration-300" : ""}`}
            >
              Today's Focus
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className={`${useBackdrop ? "text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/[0.02] data-[state=active]:backdrop-blur-[3px] rounded-md transition-all duration-300" : ""}`}
            >
              Weekly Targets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-card"} border-0`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                    <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Today's Image</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dailyImage ? (
                    <div className="space-y-4">
                      <img
                        src={dailyImage || "/placeholder.svg"}
                        alt="Daily upload"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setDailyImage("")}
                        className={`w-full ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.015] border-white/[0.08] text-white hover:bg-white/[0.025] hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300" : ""}`}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${useBackdrop ? "border-white/30" : "border-primary/30"}`}
                      >
                        <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <p className={`mb-2 ${useBackdrop ? "text-white/80" : "text-muted-foreground"}`}>
                          Upload today's image
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <Button
                            variant="outline"
                            className={`cursor-pointer ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.015] border-white/[0.08] text-white hover:bg-white/[0.025] hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300" : "bg-transparent"}`}
                          >
                            Choose Image
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-card"} border-0`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Quote className="w-5 h-5 mr-2 text-primary" />
                      <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Quote of the Day</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setTempQuote(dailyQuote)
                        setIsEditingQuote(true)
                      }}
                      className={`${useBackdrop ? "text-white/80 hover:text-white hover:bg-white/[0.1]" : ""}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditingQuote ? (
                    <div className="space-y-4">
                      <Textarea
                        value={tempQuote}
                        onChange={(e) => setTempQuote(e.target.value)}
                        className={`min-h-[100px] ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                        placeholder="Enter your daily quote..."
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={saveQuote}
                          className={`flex-1 ${useBackdrop ? "bg-purple-600/80 hover:bg-purple-600/90 text-white border-purple-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300" : ""}`}
                        >
                          Save Quote
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingQuote(false)}
                          className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.015] border-white/[0.08] text-white hover:bg-white/[0.025] hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300" : ""}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <blockquote
                      className={`text-lg italic p-4 border-l-4 border-primary rounded-r-lg ${useBackdrop ? "bg-white/[0.05]" : "bg-primary/10"}`}
                    >
                      <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>"{dailyQuote}"</span>
                    </blockquote>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card
              className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-card"} border-0`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckSquare className="w-5 h-5 mr-2 text-primary" />
                    <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Today's Tasks</span>
                  </span>
                  <Badge className={`${useBackdrop ? "bg-purple-600/80 text-white" : "bg-primary"}`}>
                    {dailyCompletedTodos}/{dailyTodos.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {dailyTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`p-3 rounded-lg border-l-4 ${getPriorityColor(todo.priority)} ${
                        todo.completed ? "opacity-60" : ""
                      } ${useBackdrop ? "bg-white/[0.05] border-white/[0.1]" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleTodo(todo.id, "daily")}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              todo.completed
                                ? "bg-primary border-primary"
                                : `${useBackdrop ? "border-white/50" : "border-muted-foreground"}`
                            }`}
                          >
                            {todo.completed && <CheckSquare className="w-3 h-3 text-white" />}
                          </button>
                          <span
                            className={`${todo.completed ? `line-through ${useBackdrop ? "text-white/50" : "text-muted-foreground"}` : `${useBackdrop ? "text-white" : ""}`}`}
                          >
                            {todo.task}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {todo.priority}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id, "daily")}
                          className={`${useBackdrop ? "text-white/60 hover:text-white hover:bg-white/[0.1]" : ""}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Input
                    value={newDailyTodo.task}
                    onChange={(e) => setNewDailyTodo({ ...newDailyTodo, task: e.target.value })}
                    placeholder="Add new daily task..."
                    onKeyPress={(e) => e.key === "Enter" && addDailyTodoHandler()}
                    className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                  />
                  <div className="flex space-x-2">
                    <select
                      value={newDailyTodo.priority}
                      onChange={(e) =>
                        setNewDailyTodo({ ...newDailyTodo, priority: e.target.value as TodoItem["priority"] })
                      }
                      className={`flex-1 px-3 py-2 rounded-md border ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white" : "glass-card border-border bg-transparent text-foreground"}`}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <Button
                      onClick={addDailyTodoHandler}
                      className={`${useBackdrop ? "bg-purple-600/80 hover:bg-purple-600/90 text-white border-purple-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300" : ""}`}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card
                className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-card"} border-0`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary" />
                      <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Weekly Tasks</span>
                    </span>
                    <Badge className={`${useBackdrop ? "bg-purple-600/80 text-white" : "bg-primary"}`}>
                      {weeklyCompletedTodos}/{weeklyTodos.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {weeklyTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`p-3 rounded-lg border-l-4 ${getPriorityColor(todo.priority)} ${
                          todo.completed ? "opacity-60" : ""
                        } ${useBackdrop ? "bg-white/[0.05] border-white/[0.1]" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleTodo(todo.id, "weekly")}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                todo.completed
                                  ? "bg-primary border-primary"
                                  : `${useBackdrop ? "border-white/50" : "border-muted-foreground"}`
                              }`}
                            >
                              {todo.completed && <CheckSquare className="w-3 h-3 text-white" />}
                            </button>
                            <span
                              className={`${todo.completed ? `line-through ${useBackdrop ? "text-white/50" : "text-muted-foreground"}` : `${useBackdrop ? "text-white" : ""}`}`}
                            >
                              {todo.task}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {todo.priority}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTodo(todo.id, "weekly")}
                            className={`${useBackdrop ? "text-white/60 hover:text-white hover:bg-white/[0.1]" : ""}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Input
                      value={newWeeklyTodo.task}
                      onChange={(e) => setNewWeeklyTodo({ ...newWeeklyTodo, task: e.target.value })}
                      placeholder="Add new weekly task..."
                      onKeyPress={(e) => e.key === "Enter" && addWeeklyTodo()}
                      className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                    />
                    <div className="flex space-x-2">
                      <select
                        value={newWeeklyTodo.priority}
                        onChange={(e) =>
                          setNewWeeklyTodo({ ...newWeeklyTodo, priority: e.target.value as TodoItem["priority"] })
                        }
                        className={`flex-1 px-3 py-2 rounded-md border ${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white" : "glass-card border-border bg-transparent text-foreground"}`}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                      <Button
                        onClick={addWeeklyTodo}
                        className={`${useBackdrop ? "bg-purple-600/80 hover:bg-purple-600/90 text-white border-purple-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300" : ""}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${useBackdrop ? "backdrop-blur-[2px] bg-white/[0.08] border border-white/[0.15] shadow-xl rounded-xl" : "glass-card"} border-0`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      <span className={`${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>Weekly Targets</span>
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          <span className={`${useBackdrop ? "text-white" : ""}`}>Add Target</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-0">
                        <DialogHeader>
                          <DialogTitle className={`${useBackdrop ? "text-white drop-shadow-lg" : ""}`}>
                            Add Weekly Target
                          </DialogTitle>
                          <DialogDescription className={`${useBackdrop ? "text-white/80 drop-shadow-sm" : ""}`}>
                            Set a new target for this week
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="target-title" className={`${useBackdrop ? "text-white" : ""}`}>
                              Title
                            </Label>
                            <Input
                              id="target-title"
                              value={newTarget.title}
                              onChange={(e) => setNewTarget({ ...newTarget, title: e.target.value })}
                              placeholder="Target title..."
                              className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="target-description" className={`${useBackdrop ? "text-white" : ""}`}>
                              Description
                            </Label>
                            <Textarea
                              id="target-description"
                              value={newTarget.description}
                              onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })}
                              placeholder="Target description..."
                              className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="target-date" className={`${useBackdrop ? "text-white" : ""}`}>
                                Target Date
                              </Label>
                              <Input
                                id="target-date"
                                type="date"
                                value={newTarget.targetDate}
                                onChange={(e) => setNewTarget({ ...newTarget, targetDate: e.target.value })}
                                className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="target-category" className={`${useBackdrop ? "text-white" : ""}`}>
                                Category
                              </Label>
                              <Input
                                id="target-category"
                                value={newTarget.category}
                                onChange={(e) => setNewTarget({ ...newTarget, category: e.target.value })}
                                placeholder="e.g., Physics"
                                className={`${useBackdrop ? "backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-purple-400/60 shadow-inner" : ""}`}
                              />
                            </div>
                          </div>
                          <Button onClick={addTarget} className="w-full">
                            Add Target
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyTargets.map((target) => (
                    <div key={target.id} className="p-4 rounded-lg glass-card border">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className={`font-semibold ${useBackdrop ? "text-white drop-shadow-sm" : ""}`}>
                            {target.title}
                          </h4>
                          <p
                            className={`text-sm ${useBackdrop ? "text-white/80 drop-shadow-sm" : "text-muted-foreground"}`}
                          >
                            {target.description}
                          </p>
                        </div>
                        <Badge className={getCategoryColor(target.category)}>{target.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={`${useBackdrop ? "text-white" : ""}`}>Progress</span>
                          <span className={`${useBackdrop ? "text-white" : ""}`}>{target.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${target.progress}%` }}
                          />
                        </div>
                        <p
                          className={`text-xs ${useBackdrop ? "text-white/80 drop-shadow-sm" : "text-muted-foreground"}`}
                        >
                          Target: {new Date(target.targetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
