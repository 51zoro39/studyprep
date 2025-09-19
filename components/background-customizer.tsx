"use client"

import { useState } from "react"
import { Palette, Upload } from "lucide-react"

interface BackgroundCustomizerProps {
  currentBackground: string
  onBackgroundChange: (background: string) => void
}

export function BackgroundCustomizer({ currentBackground, onBackgroundChange }: BackgroundCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const presetBackgrounds = [
    "/modern-living-room-with-warm-lighting.jpg",
    "/cozy-study-room-with-books-and-plants.jpg",
    "/minimalist-workspace-with-natural-light.jpg",
    "/library-with-wooden-shelves-and-soft-lighting.jpg",
    "/modern-office-city-view.png",
  ]

  return (
    <div className="bg-customizer">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white/80 hover:text-white transition-colors">
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glass-widget">
          <h3 className="widget-title text-sm mb-4">Customize Background</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {presetBackgrounds.map((bg, index) => (
              <button
                key={index}
                onClick={() => onBackgroundChange(bg)}
                className="aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-white/30 transition-colors"
              >
                <img
                  src={bg || "/placeholder.svg"}
                  alt={`Background ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 text-sm transition-colors">
            <Upload className="w-4 h-4" />
            Upload Custom
          </button>
        </div>
      )}
    </div>
  )
}
