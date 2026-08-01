import { useEffect, useState } from "react";

function weatherIcon(code: number | null) {
  if (code === null) return "";
  if (code === 0 || code === 1) return "☀️";
  if (code === 2 || code === 3 || code === 45 || code === 48) return "⛅";
  if (code >= 51 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";
  return "⛅";
}

export function StatusBadge({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  const [code, setCode] = useState<number | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let alive = true;
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=38.5816&longitude=-121.4944&current_weather=true&temperature_unit=fahrenheit",
    )
      .then((r) => r.json())
      .then((d) => {
        if (!alive || !d?.current_weather) return;
        setTemp(Math.round(d.current_weather.temperature));
        setCode(d.current_weather.weathercode);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!time) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-zinc-700/70 bg-black/20 px-3 py-1.5 text-xs text-zinc-400 ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="whitespace-nowrap">
        📍 Sacramento, CA · {time}
        {temp !== null ? ` · ${temp}°F ${weatherIcon(code)}` : ""}
      </span>
    </div>
  );
}
