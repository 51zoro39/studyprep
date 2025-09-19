"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Clock,
  Timer,
  StepBack as Stopwatch,
  Target,
  Coffee,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize,
  X,
} from "lucide-react"

interface StudySession {
  id: string
  subject: string
  duration: number
  startTime: string
  endTime?: string
  completed: boolean
}

export function FocusZone() {
  // Timer states
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [timerMode, setTimerMode] = useState<"focus" | "break">("focus")

  // Stopwatch states
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [stopwatchActive, setStopwatchActive] = useState(false)

  // Current time
  const [currentTime, setCurrentTime] = useState(new Date())

  // Settings
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [currentSubject, setCurrentSubject] = useState("")

  // Study sessions
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [activeSession, setActiveSession] = useState<StudySession | null>(null)

  // Full-screen timer state
  const [isFullScreen, setIsFullScreen] = useState(false)

  const timerRef = useRef<NodeJS.Timeout>()
  const stopwatchRef = useRef<NodeJS.Timeout>()

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Timer logic
  useEffect(() => {
    if (timerActive && (timerMinutes > 0 || timerSeconds > 0)) {
      timerRef.current = setTimeout(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1)
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1)
          setTimerSeconds(59)
        }
      }, 1000)
    } else if (timerActive && timerMinutes === 0 && timerSeconds === 0) {
      // Timer finished
      setTimerActive(false)
      if (soundEnabled) {
        // Play notification sound (you can add actual sound here)
        console.log("Timer finished!")
      }

      // Switch between focus and break
      if (timerMode === "focus") {
        setTimerMode("break")
        setTimerMinutes(breakTime)
        setTimerSeconds(0)
        // Complete active session
        if (activeSession) {
          const completedSession = {
            ...activeSession,
            endTime: new Date().toISOString(),
            completed: true,
          }
          setStudySessions((prev) => [...prev.filter((s) => s.id !== activeSession.id), completedSession])
          setActiveSession(null)
        }
      } else {
        setTimerMode("focus")
        setTimerMinutes(focusTime)
        setTimerSeconds(0)
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timerActive, timerMinutes, timerSeconds, timerMode, focusTime, breakTime, soundEnabled, activeSession])

  // Stopwatch logic
  useEffect(() => {
    if (stopwatchActive) {
      stopwatchRef.current = setTimeout(() => {
        setStopwatchTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (stopwatchRef.current) clearTimeout(stopwatchRef.current)
    }
  }, [stopwatchActive, stopwatchTime])

  const startTimer = () => {
    if (!timerActive && timerMode === "focus" && currentSubject) {
      // Start new study session
      const session: StudySession = {
        id: Date.now().toString(),
        subject: currentSubject,
        duration: focusTime,
        startTime: new Date().toISOString(),
        completed: false,
      }
      setActiveSession(session)
    }
    setTimerActive(true)
  }

  const pauseTimer = () => {
    setTimerActive(false)
  }

  const resetTimer = () => {
    setTimerActive(false)
    if (timerMode === "focus") {
      setTimerMinutes(focusTime)
    } else {
      setTimerMinutes(breakTime)
    }
    setTimerSeconds(0)
    if (activeSession) {
      setActiveSession(null)
    }
  }

  const startStopwatch = () => {
    setStopwatchActive(true)
  }

  const pauseStopwatch = () => {
    setStopwatchActive(false)
  }

  const resetStopwatch = () => {
    setStopwatchActive(false)
    setStopwatchTime(0)
  }

  const formatTime = (minutes: number, seconds: number) => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  const formatStopwatchTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  const getTimerProgress = () => {
    const totalTime = timerMode === "focus" ? focusTime * 60 : breakTime * 60
    const remainingTime = timerMinutes * 60 + timerSeconds
    return ((totalTime - remainingTime) / totalTime) * 100
  }

  const getTotalStudyTime = () => {
    return studySessions.filter((session) => session.completed).reduce((total, session) => total + session.duration, 0)
  }

  // Full-screen timer component
  const FullScreenTimer = () => (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center">
      <div className="absolute top-6 right-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFullScreen(false)}
          className="glass-card bg-transparent hover:bg-accent/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="text-center space-y-8">
        {/* Mode indicator */}
        <div className="flex items-center justify-center space-x-4">
          {timerMode === "focus" ? (
            <BookOpen className="w-8 h-8 text-accent" />
          ) : (
            <Coffee className="w-8 h-8 text-green-400" />
          )}
          <Badge className={`text-lg px-4 py-2 ${timerMode === "focus" ? "bg-accent" : "bg-green-500"}`}>
            {timerMode === "focus" ? "FOCUS SESSION" : "BREAK TIME"}
          </Badge>
        </div>

        {/* Subject display */}
        {timerMode === "focus" && currentSubject && (
          <div className="text-2xl text-muted-foreground font-medium">{currentSubject}</div>
        )}

        {/* Giant timer display */}
        <div className="space-y-6">
          <div className="text-[12rem] md:text-[16rem] font-mono font-bold text-accent leading-none hud-glow">
            {formatTime(timerMinutes, timerSeconds)}
          </div>
          <div className="max-w-md mx-auto">
            <Progress value={getTimerProgress()} className="h-4" />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center space-x-6">
          {!timerActive ? (
            <Button
              onClick={startTimer}
              disabled={timerMode === "focus" && !currentSubject}
              className="hud-glow bg-accent hover:bg-accent/90 text-lg px-8 py-4"
              size="lg"
            >
              <Play className="w-6 h-6 mr-3" />
              Start
            </Button>
          ) : (
            <Button
              onClick={pauseTimer}
              variant="outline"
              className="glass-card bg-transparent text-lg px-8 py-4"
              size="lg"
            >
              <Pause className="w-6 h-6 mr-3" />
              Pause
            </Button>
          )}
          <Button
            onClick={resetTimer}
            variant="outline"
            className="glass-card bg-transparent text-lg px-8 py-4"
            size="lg"
          >
            <RotateCcw className="w-6 h-6 mr-3" />
            Reset
          </Button>
        </div>

        {/* Session info */}
        {activeSession && (
          <div className="text-lg text-muted-foreground">
            Session started at {new Date(activeSession.startTime).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Full-screen timer overlay */}
      {isFullScreen && <FullScreenTimer />}

      <div className="space-y-6">
        {/* Header */}
        <div className="glass-card p-6 rounded-xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Focus Zone</h1>
          <p className="text-muted-foreground">Enter the zone and maximize your study efficiency</p>
        </div>

        {/* Current Time Display */}
        <Card className="glass-card border-0 hud-glow">
          <CardContent className="p-6 text-center">
            <div className="text-6xl font-mono font-bold text-accent mb-2">
              {currentTime.toLocaleTimeString([], { hour12: false })}
            </div>
            <div className="text-lg text-muted-foreground">
              {currentTime.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </CardContent>
        </Card>

        {/* Timer and Stopwatch Tabs */}
        <Tabs defaultValue="timer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="timer" className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <span>Pomodoro Timer</span>
            </TabsTrigger>
            <TabsTrigger value="stopwatch" className="flex items-center space-x-2">
              <Stopwatch className="w-4 h-4" />
              <span>Stopwatch</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Sessions</span>
            </TabsTrigger>
          </TabsList>

          {/* Pomodoro Timer */}
          <TabsContent value="timer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timer Display */}
              <Card className="glass-card border-0 hud-glow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      {timerMode === "focus" ? (
                        <BookOpen className="w-5 h-5 mr-2 text-accent" />
                      ) : (
                        <Coffee className="w-5 h-5 mr-2 text-green-400" />
                      )}
                      {timerMode === "focus" ? "Focus Session" : "Break Time"}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge className={timerMode === "focus" ? "bg-accent" : "bg-green-500"}>
                        {timerMode === "focus" ? "FOCUS" : "BREAK"}
                      </Badge>
                      {/* Full-screen toggle button */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsFullScreen(true)}
                        className="glass-card bg-transparent hover:bg-accent/20"
                        title="Full Screen Timer"
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-8xl font-mono font-bold text-accent mb-4">
                      {formatTime(timerMinutes, timerSeconds)}
                    </div>
                    <Progress value={getTimerProgress()} className="h-3 mb-6" />
                  </div>

                  {timerMode === "focus" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Subject</label>
                      <Input
                        value={currentSubject}
                        onChange={(e) => setCurrentSubject(e.target.value)}
                        placeholder="What are you studying?"
                        className="glass-card border-accent/30"
                        disabled={timerActive}
                      />
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    {!timerActive ? (
                      <Button
                        onClick={startTimer}
                        disabled={timerMode === "focus" && !currentSubject}
                        className="hud-glow bg-accent hover:bg-accent/90"
                        size="lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button onClick={pauseTimer} variant="outline" className="glass-card bg-transparent" size="lg">
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={resetTimer} variant="outline" className="glass-card bg-transparent" size="lg">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Timer Settings */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Timer Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Focus Duration (minutes)</label>
                    <Input
                      type="number"
                      value={focusTime}
                      onChange={(e) => setFocusTime(Number(e.target.value))}
                      min="1"
                      max="120"
                      className="glass-card border-accent/30"
                      disabled={timerActive}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Break Duration (minutes)</label>
                    <Input
                      type="number"
                      value={breakTime}
                      onChange={(e) => setBreakTime(Number(e.target.value))}
                      min="1"
                      max="60"
                      className="glass-card border-accent/30"
                      disabled={timerActive}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sound Notifications</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="glass-card"
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3">Today's Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Study Time</span>
                        <span className="text-sm font-semibold text-accent">{getTotalStudyTime()} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sessions Completed</span>
                        <span className="text-sm font-semibold text-accent">
                          {studySessions.filter((s) => s.completed).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stopwatch */}
          <TabsContent value="stopwatch" className="space-y-6">
            <Card className="glass-card border-0 hud-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stopwatch className="w-5 h-5 mr-2 text-accent" />
                  Stopwatch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-8xl font-mono font-bold text-accent mb-6">
                    {formatStopwatchTime(stopwatchTime)}
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  {!stopwatchActive ? (
                    <Button onClick={startStopwatch} className="hud-glow bg-accent hover:bg-accent/90" size="lg">
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pauseStopwatch} variant="outline" className="glass-card bg-transparent" size="lg">
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetStopwatch} variant="outline" className="glass-card bg-transparent" size="lg">
                    <Square className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Sessions */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-accent" />
                  Study Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studySessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
                    <p className="text-muted-foreground">Start a focus session to track your study time</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {studySessions
                      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                      .map((session) => (
                        <div key={session.id} className="p-4 rounded-lg glass-card border-l-4 border-l-accent">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{session.subject}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(session.startTime).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-accent">{session.duration} min</div>
                              <Badge className={session.completed ? "bg-green-500" : "bg-yellow-500"}>
                                {session.completed ? "Completed" : "In Progress"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
