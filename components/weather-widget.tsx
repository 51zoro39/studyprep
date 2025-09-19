import { Sun } from "lucide-react"

export function WeatherWidget() {
  return (
    <div className="space-y-6">
      <div className="widget-header">
        <div className="widget-icon">
          <Sun className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="widget-title">Weather</h3>
          <p className="widget-subtitle">Friday, 20 June 2025</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <Sun className="w-12 h-12 text-yellow-300" />
        </div>
        <div>
          <div className="text-3xl font-bold text-white">23°C</div>
          <div className="text-white/70">Sunny</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-white/60">Humidity</div>
            <div className="text-white/90 font-semibold">56%</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Wind Speed</div>
            <div className="text-white/90 font-semibold">25 km/h</div>
          </div>
        </div>
      </div>
    </div>
  )
}
