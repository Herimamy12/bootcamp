import type { WeatherData } from "../api/weatherApi";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
    return (
        <div className="card bg-base-200 shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{data.city}</h2>
            <p className="text-4xl font-extrabold mb-2">{Math.round(data.temperature)}</p>
            <p className="text-lg italic mb-4 capitalize">{data.description}</p>
            <div className="flex justify-around text-center mt-4">
                <div>
                    <span className="font-bold">{data.humidity}%</span>
                    <p className="text-sm">Humidité</p>
                </div>
                <div>
                    <span className="font-bold">{Math.round(data.wind)} km/h</span>
                    <p className="text-sm">Vent</p>
                </div>
            </div>
        </div>
    );
}
