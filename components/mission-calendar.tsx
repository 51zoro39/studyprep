"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Calendar, Target, BookOpen, Clock, AlertCircle } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: "exam" | "study" | "revision" | "mock-test" | "deadline" | "other"
  priority: "high" | "medium" | "low"
  description?: string
  completed: boolean
}

export function MissionCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Physics Mock Test",
      date: "2024-01-25",
      type: "mock-test",
      priority: "high",
      description: "Full-length JEE Advanced Physics mock test",
      completed: false,
    },
    {
      id: "2",
      title: "Chemistry Chapter 12 Revision",
      date: "2024-01-26",
      type: "revision",
      priority: "medium",
      description: "Complete revision of Organic Chemistry reactions",
      completed: false,
    },
    {
      id: "3",
      title: "Math Assignment Submission",
      date: "2024-01-28",
      type: "deadline",
      priority: "high",
      description: "Submit calculus assignment",
      completed: true,
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "study" as CalendarEvent["type"],
    priority: "medium" as CalendarEvent["priority"],
    description: "",
  })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getEventsForDate = (dateString: string) => {
    return events.filter((event) => event.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      type: newEvent.type,
      priority: newEvent.priority,
      description: newEvent.description,
      completed: false,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      type: "study",
      priority: "medium",
      description: "",
    })
    setIsAddEventOpen(false)
  }

  const toggleEventCompletion = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, completed: !event.completed } : event)))
  }

  const getEventTypeIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "exam":
        return <AlertCircle className="w-3 h-3" />
      case "study":
        return <BookOpen className="w-3 h-3" />
      case "revision":
        return <Target className="w-3 h-3" />
      case "mock-test":
        return <Clock className="w-3 h-3" />
      case "deadline":
        return <Calendar className="w-3 h-3" />
      default:
        return <Calendar className="w-3 h-3" />
    }
  }

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "exam":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "study":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "revision":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "mock-test":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "deadline":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: CalendarEvent["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(dateString)
      const isToday =
        new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

      days.push(
        <div
          key={day}
          className={`h-32 p-2 glass-card border cursor-pointer hover:hud-glow transition-all ${
            isToday ? "border-accent hud-glow" : "border-border"
          }`}
          onClick={() => {
            setSelectedDate(dateString)
            setIsAddEventOpen(true)
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-semibold ${isToday ? "text-accent" : "text-foreground"}`}>{day}</span>
            {dayEvents.length > 0 && (
              <Badge variant="secondary" className="text-xs px-1 py-0">
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(event.priority)} ${
                  event.completed ? "opacity-50 line-through" : ""
                } glass-card`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleEventCompletion(event.id)
                }}
              >
                <div className="flex items-center space-x-1">
                  {getEventTypeIcon(event.type)}
                  <span className="truncate">{event.title}</span>
                </div>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mission Calendar</h1>
            <p className="text-muted-foreground">Plan your study missions and track important dates</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")} className="glass-card">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-lg font-semibold px-4">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")} className="glass-card">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Study Mission Planner</span>
            <Button
              onClick={() => {
                setSelectedDate(new Date().toISOString().split("T")[0])
                setIsAddEventOpen(true)
              }}
              className="hud-glow bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Mission
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Upcoming Missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events
              .filter((event) => new Date(event.date) >= new Date() && !event.completed)
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(event.priority)} glass-card`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getEventTypeIcon(event.type)}
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                      <Badge variant={event.priority === "high" ? "destructive" : "secondary"}>{event.priority}</Badge>
                    </div>
                  </div>
                  {event.description && <p className="text-sm text-muted-foreground mt-2">{event.description}</p>}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle>Add New Mission</DialogTitle>
            <DialogDescription>
              Schedule a new study mission for {selectedDate && new Date(selectedDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Mission Title</Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter mission title"
                className="glass-card border-accent/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-type">Mission Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: CalendarEvent["type"]) => setNewEvent({ ...newEvent, type: value })}
                >
                  <SelectTrigger className="glass-card border-accent/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0">
                    <SelectItem value="study">Study Session</SelectItem>
                    <SelectItem value="revision">Revision</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="mock-test">Mock Test</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-priority">Priority</Label>
                <Select
                  value={newEvent.priority}
                  onValueChange={(value: CalendarEvent["priority"]) => setNewEvent({ ...newEvent, priority: value })}
                >
                  <SelectTrigger className="glass-card border-accent/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Add mission details"
                className="glass-card border-accent/30"
              />
            </div>
            <Button onClick={handleAddEvent} className="w-full hud-glow bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Mission
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
