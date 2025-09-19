"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Shield, Palette, Bell, Clock, Download, Upload, Trash2, Save } from "lucide-react"

export function SystemSettings() {
  const { theme, setTheme } = useTheme()

  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [showPin, setShowPin] = useState(false)

  const [notifications, setNotifications] = useState({
    studyReminders: true,
    breakReminders: true,
    achievementAlerts: true,
    dailyGoals: true,
  })

  const [preferences, setPreferences] = useState({
    theme: theme || "dark",
    language: "en",
    timeFormat: "24h",
    startOfWeek: "monday",
    autoSave: true,
    soundEffects: true,
  })

  const [studySettings, setStudySettings] = useState({
    defaultFocusTime: 25,
    defaultBreakTime: 5,
    longBreakTime: 15,
    sessionsBeforeLongBreak: 4,
    autoStartBreaks: false,
    autoStartSessions: false,
  })

  const handlePinChange = () => {
    if (newPin !== confirmPin) {
      alert("PINs don't match!")
      return
    }
    if (newPin.length !== 4) {
      alert("PIN must be 4 digits!")
      return
    }
    // In a real app, you'd validate the current PIN first
    alert("PIN updated successfully!")
    setCurrentPin("")
    setNewPin("")
    setConfirmPin("")
  }

  const handleExportData = () => {
    // In a real app, this would export user data
    const data = {
      settings: preferences,
      studySettings,
      notifications,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "study-data-backup.json"
    a.click()
  }

  const handleImportData = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            // In a real app, you'd validate and apply the imported data
            alert("Data imported successfully!")
          } catch (error) {
            alert("Invalid file format!")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
      // In a real app, this would clear all user data
      localStorage.clear()
      alert("All data has been reset!")
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/dark-foliage-background.png')`,
          backgroundColor: "#0a2e1a",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/[0.01] via-slate-900/[0.008] to-emerald-950/[0.01] backdrop-blur-[3px]" />

      {/* Content container with enhanced glassmorphism */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-4xl">
          <div className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-2xl p-8 rounded-2xl">
            {/* Header matching reference style */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Welcome back</h1>
              <p className="text-white/80 drop-shadow-sm">Please enter your details</p>
            </div>

            <Tabs defaultValue="security" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 backdrop-blur-[3px] bg-white/[0.012] border border-white/[0.08] rounded-lg p-1 shadow-lg">
                <TabsTrigger
                  value="security"
                  className="flex items-center space-x-2 text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/[0.02] data-[state=active]:backdrop-blur-[3px] rounded-md transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="flex items-center space-x-2 text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/[0.02] data-[state=active]:backdrop-blur-[3px] rounded-md transition-all duration-300"
                >
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger
                  value="study"
                  className="flex items-center space-x-2 text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/[0.02] data-[state=active]:backdrop-blur-[3px] rounded-md transition-all duration-300"
                >
                  <Clock className="w-4 h-4" />
                  <span>Study</span>
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="flex items-center space-x-2 text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/[0.02] data-[state=active]:backdrop-blur-[3px] rounded-md transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Data</span>
                </TabsTrigger>
              </TabsList>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-xl rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white drop-shadow-sm">
                      <Shield className="w-5 h-5 mr-2 text-emerald-400 drop-shadow-sm" />
                      Access Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white drop-shadow-sm">Change Access PIN</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-pin" className="text-white/90 drop-shadow-sm">
                            Current PIN
                          </Label>
                          <div className="relative">
                            <Input
                              id="current-pin"
                              type={showPin ? "text" : "password"}
                              value={currentPin}
                              onChange={(e) => setCurrentPin(e.target.value)}
                              placeholder="Enter current PIN"
                              maxLength={4}
                              className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-pin" className="text-white/90 drop-shadow-sm">
                            New PIN
                          </Label>
                          <Input
                            id="new-pin"
                            type={showPin ? "text" : "password"}
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            placeholder="Enter new PIN"
                            maxLength={4}
                            className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-pin" className="text-white/90 drop-shadow-sm">
                            Confirm PIN
                          </Label>
                          <Input
                            id="confirm-pin"
                            type={showPin ? "text" : "password"}
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                            placeholder="Confirm new PIN"
                            maxLength={4}
                            className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch checked={showPin} onCheckedChange={setShowPin} />
                          <Label className="text-white/90 drop-shadow-sm">Show PIN</Label>
                        </div>
                        <Button
                          onClick={handlePinChange}
                          className="bg-emerald-600/80 hover:bg-emerald-600/90 text-white border-emerald-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Update PIN
                        </Button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                      <h4 className="font-semibold mb-4 text-white drop-shadow-sm">Session Management</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white/90 drop-shadow-sm">Auto-logout after inactivity</Label>
                            <p className="text-sm text-white/70">
                              Automatically log out after 30 minutes of inactivity
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-white/90 drop-shadow-sm">Remember session</Label>
                            <p className="text-sm text-white/70">Stay logged in across browser sessions</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-xl rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white drop-shadow-sm">
                        <Palette className="w-5 h-5 mr-2 text-emerald-400 drop-shadow-sm" />
                        Appearance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme" className="text-white/90 drop-shadow-sm">
                          Theme
                        </Label>
                        <Select
                          value={theme}
                          onValueChange={(value) => {
                            setTheme(value)
                            setPreferences({ ...preferences, theme: value })
                          }}
                        >
                          <SelectTrigger className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white shadow-inner">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-xl bg-black/80 border-white/20 text-white shadow-2xl">
                            <SelectItem value="light">Light Theme</SelectItem>
                            <SelectItem value="dark">Dark Theme</SelectItem>
                            <SelectItem value="system">Auto (System)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-white/90 drop-shadow-sm">
                          Language
                        </Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                        >
                          <SelectTrigger className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white shadow-inner">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-xl bg-black/80 border-white/20 text-white shadow-2xl">
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-format" className="text-white/90 drop-shadow-sm">
                          Time Format
                        </Label>
                        <Select
                          value={preferences.timeFormat}
                          onValueChange={(value) => setPreferences({ ...preferences, timeFormat: value })}
                        >
                          <SelectTrigger className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white shadow-inner">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-xl bg-black/80 border-white/20 text-white shadow-2xl">
                            <SelectItem value="12h">12 Hour</SelectItem>
                            <SelectItem value="24h">24 Hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-xl rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white drop-shadow-sm">
                        <Bell className="w-5 h-5 mr-2 text-emerald-400 drop-shadow-sm" />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/90 drop-shadow-sm">Study Reminders</Label>
                          <p className="text-sm text-white/70">Get reminded to start study sessions</p>
                        </div>
                        <Switch
                          checked={notifications.studyReminders}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, studyReminders: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/90 drop-shadow-sm">Break Reminders</Label>
                          <p className="text-sm text-white/70">Get reminded to take breaks</p>
                        </div>
                        <Switch
                          checked={notifications.breakReminders}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, breakReminders: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/90 drop-shadow-sm">Achievement Alerts</Label>
                          <p className="text-sm text-white/70">Get notified about achievements</p>
                        </div>
                        <Switch
                          checked={notifications.achievementAlerts}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, achievementAlerts: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/90 drop-shadow-sm">Daily Goals</Label>
                          <p className="text-sm text-white/70">Daily progress notifications</p>
                        </div>
                        <Switch
                          checked={notifications.dailyGoals}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, dailyGoals: checked })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Study Settings */}
              <TabsContent value="study" className="space-y-6">
                <Card className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-xl rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white drop-shadow-sm">
                      <Clock className="w-5 h-5 mr-2 text-emerald-400 drop-shadow-sm" />
                      Study Timer Defaults
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="focus-time" className="text-white/90 drop-shadow-sm">
                          Focus Time (minutes)
                        </Label>
                        <Input
                          id="focus-time"
                          type="number"
                          value={studySettings.defaultFocusTime}
                          onChange={(e) =>
                            setStudySettings({ ...studySettings, defaultFocusTime: Number(e.target.value) })
                          }
                          min="1"
                          max="120"
                          className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="break-time" className="text-white/90 drop-shadow-sm">
                          Short Break (minutes)
                        </Label>
                        <Input
                          id="break-time"
                          type="number"
                          value={studySettings.defaultBreakTime}
                          onChange={(e) =>
                            setStudySettings({ ...studySettings, defaultBreakTime: Number(e.target.value) })
                          }
                          min="1"
                          max="30"
                          className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="long-break-time" className="text-white/90 drop-shadow-sm">
                          Long Break (minutes)
                        </Label>
                        <Input
                          id="long-break-time"
                          type="number"
                          value={studySettings.longBreakTime}
                          onChange={(e) =>
                            setStudySettings({ ...studySettings, longBreakTime: Number(e.target.value) })
                          }
                          min="1"
                          max="60"
                          className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sessions-before-long" className="text-white/90 drop-shadow-sm">
                          Sessions Before Long Break
                        </Label>
                        <Input
                          id="sessions-before-long"
                          type="number"
                          value={studySettings.sessionsBeforeLongBreak}
                          onChange={(e) =>
                            setStudySettings({ ...studySettings, sessionsBeforeLongBreak: Number(e.target.value) })
                          }
                          min="1"
                          max="10"
                          className="backdrop-blur-[3px] bg-white/[0.018] border-white/[0.1] text-white placeholder:text-white/50 focus:bg-white/[0.025] focus:border-emerald-400/60 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/90 drop-shadow-sm">Auto-start breaks</Label>
                          <p className="text-sm text-white/70">Automatically start break timers</p>
                        </div>
                        <Switch
                          checked={studySettings.autoStartBreaks}
                          onCheckedChange={(checked) =>
                            setStudySettings({ ...studySettings, autoStartBreaks: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/90 drop-shadow-sm">Auto-start sessions</Label>
                          <p className="text-sm text-white/70">Automatically start study sessions after breaks</p>
                        </div>
                        <Switch
                          checked={studySettings.autoStartSessions}
                          onCheckedChange={(checked) =>
                            setStudySettings({ ...studySettings, autoStartSessions: checked })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Management */}
              <TabsContent value="data" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-xl rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white drop-shadow-sm">
                        <Download className="w-5 h-5 mr-2 text-emerald-400 drop-shadow-sm" />
                        Backup & Restore
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white/90 drop-shadow-sm">Export Data</Label>
                        <p className="text-sm text-white/70">Download all your study data as a backup file</p>
                        <Button
                          onClick={handleExportData}
                          className="w-full bg-emerald-600/80 hover:bg-emerald-600/90 text-white border-emerald-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white/90 drop-shadow-sm">Import Data</Label>
                        <p className="text-sm text-white/70">Restore data from a backup file</p>
                        <Button
                          onClick={handleImportData}
                          variant="outline"
                          className="w-full backdrop-blur-[3px] bg-white/[0.015] border-white/[0.08] text-white hover:bg-white/[0.025] hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-[4px] bg-white/[0.015] border border-white/[0.08] shadow-xl rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white drop-shadow-sm">
                        <Trash2 className="w-5 h-5 mr-2 text-red-400 drop-shadow-sm" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white/90 drop-shadow-sm">Reset All Data</Label>
                        <p className="text-sm text-white/70">
                          This will permanently delete all your study data, settings, and progress. This action cannot
                          be undone.
                        </p>
                        <Button
                          onClick={handleResetData}
                          variant="destructive"
                          className="w-full bg-red-600/80 hover:bg-red-600/90 text-white border-red-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Reset All Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Bottom text matching reference */}
            <div className="text-center mt-8 pt-6 border-t border-white/20">
              <p className="text-white/70 text-sm drop-shadow-sm">
                {"Don't have an account? "}
                <span className="text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors duration-300">
                  Register here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
