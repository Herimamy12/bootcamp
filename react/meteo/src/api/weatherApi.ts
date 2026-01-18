import axios from 'axios';

export interface WeatherData {
  city: string;       // city name
  temperature: number; // in Celsius
  description: string; // weather description
  humidity: number;    // in percentage
  wind: number;   // in km/h
}

const API_KEY = '34dd74bdb03a3a0241ca203a2fa532eb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeather(city: string): Promise<WeatherData> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'fr'
      }
    });

    const data = response.data;
    return {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed * 3.6 // convert m/s to km/h
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Erreur lors de la récupération des données météo: ${error.response.status} ${error.response.statusText}`);
    } else {
      throw new Error('Erreur lors de la récupération des données météo');
    }
  }
}
