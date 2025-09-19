"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Plane } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("study-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleAuth = () => {
    // You can change this PIN to whatever you want
    const correctPin = "2024"

    if (pin === correctPin) {
      setIsAuthenticated(true)
      localStorage.setItem("study-auth", "authenticated")
      setError("")
    } else {
      setError("Invalid PIN. Access denied.")
      setPin("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAuth()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center hud-glow">
              <Plane className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">CLASSIFIED ACCESS</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your authorization code to access the study command center
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center text-lg tracking-widest glass-card border-accent/30 focus:border-accent"
                maxLength={4}
              />
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
            </div>
            <Button onClick={handleAuth} className="w-full hud-glow bg-accent hover:bg-accent/90" size="lg">
              <Shield className="w-4 h-4 mr-2" />
              AUTHENTICATE
            </Button>
            <p className="text-xs text-muted-foreground text-center">Default PIN: 2024 (Change in auth-guard.tsx)</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
