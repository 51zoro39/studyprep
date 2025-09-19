"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight, CalendarIcon, Plus, Clock, Settings } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  type: "study" | "exam" | "assignment" | "break"
  subject?: string
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [backdropEnabled, setBackdropEnabled] = useState(false)
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Physics Mock Test",
      date: "2024-01-25",
      time: "10:00 AM",
      type: "exam",
      subject: "Physics",
    },
    {
      id: "2",
      title: "Chemistry Assignment Due",
      date: "2024-01-26",
      time: "11:59 PM",
      type: "assignment",
      subject: "Chemistry",
    },
    {
      id: "3",
      title: "Mathematics Study Session",
      date: "2024-01-27",
      time: "2:00 PM",
      type: "study",
      subject: "Mathematics",
    },
  ])

  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "exam":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "assignment":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "study":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "break":
        return "bg-green-500/20 text-green-300 border-green-500/30"
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
              backgroundImage: "url(/water-palace-backdrop.png)",
            }
          : {}
      }
    >
      {backdropEnabled && <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10" />}

      <div
        className={
          backdropEnabled ? "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6" : "apple-glass-card p-6"
        }
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${backdropEnabled ? "text-white" : "text-foreground"}`}>
              Study Calendar
            </h1>
            <p className={backdropEnabled ? "text-white/80" : "text-muted-foreground"}>
              Plan and track your study schedule
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
            <Button
              className={
                backdropEnabled
                  ? "backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  : "apple-glass-button"
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card
            className={
              backdropEnabled ? "backdrop-blur-sm bg-white/5 border border-white/10" : "apple-glass-card border-0"
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className={`flex items-center ${backdropEnabled ? "text-white" : ""}`}>
                  <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={
                      backdropEnabled
                        ? "backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
                        : "apple-glass-input bg-transparent"
                    }
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={
                      backdropEnabled
                        ? "backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
                        : "apple-glass-input bg-transparent"
                    }
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-medium p-2 ${backdropEnabled ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6)
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                  const isToday = date.toDateString() === new Date().toDateString()

                  return (
                    <div
                      key={i}
                      className={`
                        p-2 text-center text-sm rounded-lg cursor-pointer transition-colors
                        ${
                          isCurrentMonth
                            ? backdropEnabled
                              ? "text-white hover:bg-white/10"
                              : "text-foreground hover:bg-accent/20"
                            : backdropEnabled
                              ? "text-white/50"
                              : "text-muted-foreground"
                        }
                        ${isToday ? "bg-primary text-primary-foreground" : ""}
                      `}
                    >
                      {date.getDate()}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card
            className={
              backdropEnabled ? "backdrop-blur-sm bg-white/5 border border-white/10" : "apple-glass-card border-0"
            }
          >
            <CardHeader>
              <CardTitle className={`flex items-center ${backdropEnabled ? "text-white" : ""}`}>
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={
                    backdropEnabled
                      ? "p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10"
                      : "p-4 rounded-lg apple-glass-widget"
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-semibold ${backdropEnabled ? "text-white" : "text-foreground"}`}>
                      {event.title}
                    </h4>
                    <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm ${backdropEnabled ? "text-white/80" : "text-muted-foreground"}`}>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                    {event.subject && <p className="text-sm text-primary">{event.subject}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
