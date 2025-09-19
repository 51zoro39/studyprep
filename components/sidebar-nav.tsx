"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  BookOpen,
  Calendar,
  Target,
  MessageSquare,
  Settings,
  User,
  Menu,
  X,
  GraduationCap,
  Youtube,
  TrendingUp,
  CheckSquare,
  Quote,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDailyContext } from "@/contexts/daily-context"

interface SidebarNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  username: string
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "resources", label: "Study Resources", icon: BookOpen },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "focus", label: "Focus Zone", icon: Target },
  { id: "youtube", label: "Study Sessions", icon: Youtube },
  { id: "progress", label: "Progress Tracker", icon: TrendingUp },
  { id: "community", label: "Community", icon: MessageSquare },
  { id: "daily", label: "Daily Section", icon: User },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
]

export function SidebarNav({ activeSection, onSectionChange, username }: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { dailyData } = useDailyContext()
  const { dailyImage, dailyQuote, dailyTodos } = dailyData

  const completedTodos = dailyTodos.filter((todo) => todo.completed).length
  const totalTodos = dailyTodos.length

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden apple-glass-widget"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isCollapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="h-full apple-glass-sidebar flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center apple-glass-button">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">StudyHub</h2>
                <p className="text-sm text-sidebar-accent-foreground opacity-80">Welcome, {username}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.id} className="relative">
                  <Button
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left h-12 apple-smooth-transition rounded-xl",
                      activeSection === item.id
                        ? "apple-glass-button shadow-lg"
                        : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 hover:text-sidebar-foreground hover:shadow-md apple-hover-lift",
                    )}
                    onClick={() => {
                      onSectionChange(item.id)
                      setIsCollapsed(false)
                    }}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>

                  {item.id === "daily" && (
                    <div className="mt-2 ml-4 glass-widget p-3 space-y-2">
                      <h3 className="text-sm font-semibold text-sidebar-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Today's Overview
                      </h3>

                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-sidebar-accent-foreground" />
                        {dailyImage ? (
                          <img
                            src={dailyImage || "/placeholder.svg"}
                            alt="Daily"
                            className="w-6 h-6 object-cover rounded-lg border border-sidebar-border/30"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-sidebar-accent/20 rounded-lg border border-dashed border-sidebar-border/30 flex items-center justify-center">
                            <span className="text-xs text-sidebar-accent-foreground font-medium">+</span>
                          </div>
                        )}
                        <span className="text-xs text-sidebar-foreground opacity-80">
                          {dailyImage ? "Image Set" : "No Image"}
                        </span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Quote className="w-4 h-4 text-sidebar-accent-foreground mt-0.5" />
                        <p className="text-xs text-sidebar-foreground italic line-clamp-1 opacity-80">
                          "{dailyQuote.length > 40 ? dailyQuote.substring(0, 40) + "..." : dailyQuote}"
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckSquare className="w-4 h-4 text-sidebar-accent-foreground" />
                            <span className="text-xs font-medium text-sidebar-foreground">Tasks</span>
                          </div>
                          <span className="text-xs text-sidebar-foreground opacity-80">
                            {completedTodos}/{totalTodos}
                          </span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {dailyTodos.slice(0, 2).map((todo) => (
                            <div key={todo.id} className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  todo.completed
                                    ? "bg-green-500"
                                    : todo.priority === "high"
                                      ? "bg-red-500"
                                      : todo.priority === "medium"
                                        ? "bg-yellow-500"
                                        : "bg-gray-400"
                                }`}
                              ></div>
                              <span
                                className={`text-xs text-sidebar-foreground ${
                                  todo.completed ? "line-through opacity-60" : "opacity-80"
                                }`}
                              >
                                {todo.task.length > 20 ? todo.task.substring(0, 20) + "..." : todo.task}
                              </span>
                            </div>
                          ))}
                          {totalTodos > 2 && (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-sidebar-accent/40 rounded-full"></div>
                              <span className="text-xs text-sidebar-foreground opacity-60">+{totalTodos - 2} more</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4">
            <div className="apple-glass-widget p-3 text-center">
              <p className="text-xs text-sidebar-accent-foreground opacity-80">StudyHub v2.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsCollapsed(false)} />
      )}
    </>
  )
}
