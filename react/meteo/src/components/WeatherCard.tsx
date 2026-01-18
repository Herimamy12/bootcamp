import type { WeatherData } from "../api/weatherApi";
import { FaCloud, FaCloudSun, FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
    const getWeatherIcon = () => {
        const desc = data.description.toLowerCase();
        if (desc.includes('nuageux') || desc.includes('couvert')) return <FaCloud size={48} />;
        if (desc.includes('partiellement')) return <FaCloudSun size={48} />;
        if (desc.includes('ensoleillé') || desc.includes('clair')) return <FaSun size={48} />;
        if (desc.includes('pluie') || desc.includes('averse')) return <FaCloudRain size={48} />;
        if (desc.includes('neige')) return <FaSnowflake size={48} />;
        return <FaSun size={48} />; // Default icon
    };

    return (
        <div className="card bg-base-200 shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{data.city}</h2>
            <div className="flex justify-center items-center gap-4 mb-2">
                {getWeatherIcon()}
                <p className="text-4xl font-extrabold mb-2">{Math.round(data.temperature)}</p>
            </div>
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
