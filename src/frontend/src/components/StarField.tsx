import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: number;
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      type: Math.floor(Math.random() * 3),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${
            star.type === 0 ? "star-1" : star.type === 1 ? "star-2" : "star-3"
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.size > 2 ? "oklch(0.88 0.15 75)" : "white",
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow:
              star.size > 2
                ? `0 0 ${star.size * 3}px oklch(0.88 0.15 75 / 0.8)`
                : undefined,
          }}
        />
      ))}
    </div>
  );
}
