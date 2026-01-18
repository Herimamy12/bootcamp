import { useState } from "react"
import { WeatherForm } from "./components/WeatherForm"
import { WeatherCard } from "./components/WeatherCard"
import type { WeatherData } from "./api/weatherApi"

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold mb-6">🌦️ Météo App</h1>

      {/* Formulaire de recherche */}
      <WeatherForm onWeatherFetched={setWeatherData} />

      {/* Affichage de la météo si disponible */}
      {weatherData ?
      (
        <WeatherCard data={weatherData} />
      ) : (
        <p className="mt-6 text-gray-600">Entrez une ville pour obtenir la météo.</p>
      )}
    </div>
  )
}

export default App
