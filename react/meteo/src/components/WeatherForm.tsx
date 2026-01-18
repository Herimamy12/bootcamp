import { useState } from 'react';
import { fetchWeather } from '../api/weatherApi';
import type { FormEvent } from 'react';
import type { WeatherData } from '../api/weatherApi';

interface WeatherFormProps {
  onWeatherFetched: (data: WeatherData) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function WeatherForm({ onWeatherFetched, onLoadingChange }: WeatherFormProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Veuillez entrer le nom d\'une ville.');
      return;
    }

    setLoading(true);
    onLoadingChange(true);
    setError(null);

    try {
        const data = await fetchWeather(city);
        onWeatherFetched(data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Une erreur inconnue est survenue.');
        }
    } finally {
        setLoading(false);
        onLoadingChange(false);
    }
  };

  return (
    <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4 bg-base-200 rounded-lg shadow-md w-full max-w-md mx-auto'
    >
      <input
        type="text"
        placeholder="Entrez le nom de la ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
        className="input input-bordered w-full max-w-md"
      />
      <button
        type="submit"
        disabled={loading}
        className={`btn btn-primary w-full max-w-md ${loading ? 'loading' : ''}`}
      >
        {loading ? 'Chargement...' : 'Obtenir la météo'}
      </button>
      {error && <p className="text-error mt-2">{error}</p>}
    </form>
  );
}
