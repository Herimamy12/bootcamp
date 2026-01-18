import { useEffect, useState } from "react"
import { WeatherForm } from "./components/WeatherForm"
import { WeatherCard } from "./components/WeatherCard"
import { Loader } from "./components/Loader"
import type { WeatherData } from "./api/weatherApi"
import { fetchWeather } from "./api/weatherApi"

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const defaultCity = "Antananarivo";

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeather(defaultCity);
        setWeatherData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données météo par défaut:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold mb-6">🌦️ Météo App</h1>

      {/* Formulaire de recherche */}
      <WeatherForm onWeatherFetched={setWeatherData} onLoadingChange={setLoading} />
      {/* Affichage de la météo si disponible */}
      {
        loading ? (
          <Loader />
        ) : weatherData && <WeatherCard data={weatherData} />
      }
    </div>
  )
}

export default App
