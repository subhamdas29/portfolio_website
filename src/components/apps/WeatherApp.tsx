import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudSun, CloudRain, CloudLightning, CloudSnow, MapPin, RefreshCw } from 'lucide-react';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  weatherCode: number;
  hourly: { time: string; temp: number; code: number }[];
}

export const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const KOLKATA_LAT = 22.5726;
  const KOLKATA_LON = 88.3639;

  const getWMOCondition = (code: number): { text: string; icon: React.ReactNode } => {
    if (code === 0) return { text: 'Clear Sky', icon: <Sun className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" /> };
    if (code >= 1 && code <= 3) return { text: 'Partly Cloudy', icon: <CloudSun className="w-4 h-4 text-sky-200 shrink-0" /> };
    if (code === 45 || code === 48) return { text: 'Foggy', icon: <Cloud className="w-4 h-4 text-stone-300 shrink-0" /> };
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { text: 'Rainy', icon: <CloudRain className="w-4 h-4 text-blue-200 shrink-0" /> };
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { text: 'Snowy', icon: <CloudSnow className="w-4 h-4 text-indigo-100 shrink-0" /> };
    if (code >= 95) return { text: 'Thunderstorm', icon: <CloudLightning className="w-4 h-4 text-amber-300 shrink-0" /> };
    return { text: 'Mostly Cloudy', icon: <Cloud className="w-4 h-4 text-sky-100 shrink-0" /> };
  };

  const fetchWeatherData = async (lat: number, lon: number, cityName: string) => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API failed');
      const data = await res.json();

      const currentObj = data.current_weather || (data.current ? { temperature: data.current.temperature_2m, weathercode: data.current.weather_code } : null);
      const currentTemp = currentObj ? Math.round(currentObj.temperature) : 29;
      const code = currentObj ? (currentObj.weathercode ?? currentObj.weather_code ?? 2) : 2;

      const highTemp = data.daily?.temperature_2m_max?.[0] ? Math.round(data.daily.temperature_2m_max[0]) : currentTemp + 3;
      const lowTemp = data.daily?.temperature_2m_min?.[0] ? Math.round(data.daily.temperature_2m_min[0]) : currentTemp - 3;
      const conditionInfo = getWMOCondition(code);

      const currentHourIndex = new Date().getHours();
      const hourlyForecasts = [];
      const hourlyTemps = data.hourly?.temperature_2m || [];
      const hourlyCodes = data.hourly?.weathercode || data.hourly?.weather_code || [];

      for (let i = 0; i < 6; i++) {
        const idx = (currentHourIndex + i) % 24;
        const hourTime = (currentHourIndex + i) % 24;
        hourlyForecasts.push({
          time: i === 0 ? 'Now' : `${hourTime}:00`,
          temp: hourlyTemps[idx] !== undefined ? Math.round(hourlyTemps[idx]) : currentTemp,
          code: hourlyCodes[idx] !== undefined ? hourlyCodes[idx] : code,
        });
      }

      setWeather({
        city: cityName || 'Kolkata',
        temp: currentTemp,
        condition: conditionInfo.text,
        high: highTemp,
        low: lowTemp,
        weatherCode: code,
        hourly: hourlyForecasts,
      });
    } catch (err: any) {
      console.error('Weather fetch failed, loading default fallback:', err);
      // Fallback to Kolkata defaults if network request fails
      setWeather({
        city: cityName || 'Kolkata',
        temp: 29,
        condition: 'Rainy',
        high: 33,
        low: 26,
        weatherCode: 55,
        hourly: [
          { time: 'Now', temp: 29, code: 55 },
          { time: '15:00', temp: 29, code: 55 },
          { time: '16:00', temp: 29, code: 95 },
          { time: '17:00', temp: 29, code: 51 },
          { time: '18:00', temp: 28, code: 3 },
          { time: '19:00', temp: 28, code: 3 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const geoData = await geoRes.json();
            const cityName = geoData.city || geoData.locality || geoData.principalSubdivision || 'My Location';
            fetchWeatherData(lat, lon, cityName);
          } catch {
            fetchWeatherData(lat, lon, 'Local Area');
          }
        },
        () => {
          fetchWeatherData(KOLKATA_LAT, KOLKATA_LON, 'Kolkata');
        },
        { timeout: 4000 }
      );
    } else {
      fetchWeatherData(KOLKATA_LAT, KOLKATA_LON, 'Kolkata');
    }
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#2979FF] via-[#1565C0] to-[#0D47A1] p-3 text-white flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-1 font-bold text-xs sm:text-sm tracking-tight text-white drop-shadow-sm">
            <span>{weather?.city || 'Kolkata'}</span>
            <MapPin className="w-3 h-3 text-sky-200 fill-sky-200/30 shrink-0" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tighter mt-0.5">
            {loading && !weather ? '--°' : `${weather?.temp ?? 29}°`}
          </div>
        </div>

        <div className="text-right flex flex-col items-end">
          <div className="flex items-center space-x-1 text-xs text-sky-100 font-medium">
            {weather && getWMOCondition(weather.weatherCode).icon}
            <span>{loading && !weather ? 'Loading...' : weather?.condition}</span>
          </div>
          <div className="text-[11px] text-sky-200 font-mono mt-1 font-semibold">
            {weather ? `H:${weather.high}° L:${weather.low}°` : 'H:33° L:26°'}
          </div>
        </div>
      </div>

      {/* Hourly Forecast Bar */}
      <div className="pt-2 border-t border-white/20 grid grid-cols-6 gap-1 text-center items-center">
        {loading && !weather ? (
          <div className="col-span-6 flex items-center justify-center py-1 text-xs text-sky-200 space-x-1.5">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Fetching forecast...</span>
          </div>
        ) : (
          weather?.hourly.map((h, idx) => {
            const cond = getWMOCondition(h.code);
            return (
              <div key={idx} className="flex flex-col items-center space-y-0.5">
                <span className="text-[10px] text-sky-200 font-medium">{h.time}</span>
                <div className="my-0.5">{cond.icon}</div>
                <span className="text-[11px] font-bold font-mono">{h.temp}°</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
