"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { SidebarNav } from "@/components/sidebar-nav"
import { Dashboard } from "@/components/dashboard" // Added Dashboard import
import { ProgressTracker } from "@/components/progress-tracker"
import { FocusZone } from "@/components/focus-zone"
import { CommunityUpdates } from "@/components/community-updates"
import { DailySection } from "@/components/daily-section"
import { StudyResources } from "@/components/study-resources"
import { Calendar } from "@/components/calendar"
import { YoutubeStudySessions } from "@/components/youtube-study-sessions"
import { Profile } from "@/components/profile"
import { SystemSettings } from "@/components/system-settings"
import { DailyProvider } from "@/contexts/daily-context"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [backgroundImage, setBackgroundImage] = useState("/modern-study-room-with-warm-lighting.jpg")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard username="Student" /> // Fixed to return Dashboard component instead of ProgressTracker
      case "resources":
        return <StudyResources />
      case "calendar":
        return <Calendar />
      case "focus":
        return <FocusZone />
      case "youtube":
        return <YoutubeStudySessions />
      case "progress":
        return <ProgressTracker />
      case "community":
        return <CommunityUpdates />
      case "daily":
        return <DailySection />
      case "profile":
        return <Profile />
      case "settings":
        return <SystemSettings />
      default:
        return <Dashboard username="Student" /> // Fixed default to return Dashboard instead of ProgressTracker
    }
  }

  return (
    <AuthGuard>
      <DailyProvider>
        <div
          className="min-h-screen relative overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.2px]" />

          <SidebarNav activeSection={activeSection} onSectionChange={setActiveSection} username="Student" />

          <main className="ml-64 relative z-10">
            <div className="p-6">{renderActiveSection()}</div>
          </main>
        </div>
      </DailyProvider>
    </AuthGuard>
  )
}
