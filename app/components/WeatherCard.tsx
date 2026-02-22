"use client";

import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, CloudRain, Sun, CloudLightning, Thermometer, MapPin } from "lucide-react";

export default function WeatherCard({ lat, lng }: { lat: number; lng: number }) {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const data = await res.json();
        if (data && data.main) {
          setWeather(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (lat && lng) fetchWeather();
  }, [lat, lng]);

  const getWeatherConfig = (main: string) => {
    switch (main) {
      case "Rain":         return { icon: <CloudRain size={32} />,      accent: "#0ea5e9", bg: "#e0f2fe", border: "#bae6fd", label: "Rainy" };
      case "Clear":        return { icon: <Sun size={32} />,            accent: "#f59e0b", bg: "#fef3c7", border: "#fde68a", label: "Clear Sky" };
      case "Thunderstorm": return { icon: <CloudLightning size={32} />, accent: "#7c3aed", bg: "#ede9fe", border: "#c4b5fd", label: "Stormy" };
      default:             return { icon: <Cloud size={32} />,          accent: "#0ea5e9", bg: "#e0f2fe", border: "#bae6fd", label: "Cloudy" };
    }
  };

  if (error) return (
    <>
      <style>{styles}</style>
      <div className="w-error">
        <CloudRain size={15} />
        Weather service unavailable
      </div>
    </>
  );

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="w-skeleton">
        <div className="sk-row">
          <div className="sk-block" style={{ width: "55%", height: 10 }} />
          <div className="sk-circle" />
        </div>
        <div className="sk-block" style={{ width: "35%", height: 40, marginTop: 14 }} />
        <div className="sk-row" style={{ marginTop: 16, gap: 8 }}>
          <div className="sk-block" style={{ flex: 1, height: 48 }} />
          <div className="sk-block" style={{ flex: 1, height: 48 }} />
          <div className="sk-block" style={{ flex: 1, height: 48 }} />
        </div>
      </div>
    </>
  );

  const cfg = getWeatherConfig(weather.weather?.[0]?.main);

  return (
    <>
      <style>{styles}</style>
      <div className="w-card">

        <div className="w-top">
          <div className="w-meta">
            <span className="w-eyebrow">Current Weather</span>
            <span className="w-location">
              <MapPin size={11} />
              {weather.name}
            </span>
          </div>
          <div
            className="w-icon-wrap"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.accent }}
          >
            {cfg.icon}
          </div>
        </div>

        <div className="w-body">
          <div className="w-temp-row">
            <span className="w-temp">{Math.round(weather.main.temp)}</span>
            <span className="w-unit">°C</span>
          </div>
          <div className="w-label-col">
            <span className="w-condition" style={{ color: cfg.accent }}>{cfg.label}</span>
            <span className="w-desc">{weather.weather?.[0]?.description}</span>
          </div>
        </div>

        <div className="w-stats">
          <div className="w-stat">
            <div className="stat-icon-wrap" style={{ background: cfg.bg, color: cfg.accent }}>
              <Droplets size={13} />
            </div>
            <span className="stat-lbl">Humidity</span>
            <span className="stat-val">{weather.main.humidity}%</span>
          </div>
          <div className="stat-sep" />
          <div className="w-stat">
            <div className="stat-icon-wrap" style={{ background: cfg.bg, color: cfg.accent }}>
              <Wind size={13} />
            </div>
            <span className="stat-lbl">Wind</span>
            <span className="stat-val">{weather.wind.speed} m/s</span>
          </div>
          <div className="stat-sep" />
          <div className="w-stat">
            <div className="stat-icon-wrap" style={{ background: cfg.bg, color: cfg.accent }}>
              <Thermometer size={13} />
            </div>
            <span className="stat-lbl">Feels like</span>
            <span className="stat-val">{Math.round(weather.main.feels_like)}°</span>
          </div>
        </div>

      </div>
    </>
  );
}

const styles = `
  .w-card {
    background: #fff;
    border: 1px solid #daeeff;
    border-radius: 18px;
    padding: 1.4rem;
    font-family: 'Inter', -apple-system, sans-serif;
    transition: box-shadow 0.2s ease;
  }

  .w-card:hover {
    box-shadow: 0 4px 20px rgba(14,165,233,0.08);
  }

  .w-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.1rem;
  }

  .w-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .w-eyebrow {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #0ea5e9;
  }

  .w-location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #0c2340;
  }

  .w-icon-wrap {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .w-card:hover .w-icon-wrap {
    transform: scale(1.06) rotate(5deg);
  }

  .w-body {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 1.25rem;
  }

  .w-temp-row {
    display: flex;
    align-items: flex-start;
    line-height: 1;
  }

  .w-temp {
    font-size: 3.25rem;
    font-weight: 300;
    letter-spacing: -0.05em;
    color: #0c2340;
  }

  .w-unit {
    font-size: 1.25rem;
    font-weight: 400;
    color: #94a3b8;
    margin-top: 6px;
  }

  .w-label-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-bottom: 5px;
  }

  .w-condition {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .w-desc {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: capitalize;
  }

  /* Stats */
  .w-stats {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    background: #f8fbff;
    border: 1px solid #daeeff;
    border-radius: 12px;
  }

  .w-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .stat-icon-wrap {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-lbl {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .stat-val {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0c2340;
    letter-spacing: -0.01em;
  }

  .stat-sep {
    width: 1px;
    height: 36px;
    background: #daeeff;
    flex-shrink: 0;
  }

  /* Error */
  .w-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 1rem 1.25rem;
    background: #fff1f2;
    border: 1px solid #fecdd3;
    border-radius: 14px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #e11d48;
    font-family: 'Inter', sans-serif;
  }

  /* Skeleton */
  .w-skeleton {
    padding: 1.4rem;
    background: #fff;
    border: 1px solid #daeeff;
    border-radius: 18px;
    animation: wPulse 1.6s ease-in-out infinite;
  }

  @keyframes wPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }

  .sk-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sk-block {
    background: #e0f2fe;
    border-radius: 6px;
  }

  .sk-circle {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: #e0f2fe;
    flex-shrink: 0;
  }
`;