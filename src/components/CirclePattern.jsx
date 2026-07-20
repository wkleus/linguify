// Decorative circle wireframe pattern for background
import { useId, useMemo } from "react";

function hash(i, j) {
  let h = i * 374761393 + j * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 1000) / 1000;
}

const SIZE = 46;
const GRID = 8;
const TILE = GRID * SIZE;

export default function CirclePattern({ className = "" }) {
  const patternId = `circle-pattern-${useId()}`;

  const circles = useMemo(() => {
    const result = [];
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const keep = hash(i, j);
        if (keep > 0.55) continue;

        const jitterX = (hash(i + 1, j) - 0.5) * SIZE * 0.5;
        const jitterY = (hash(i, j + 1) - 0.5) * SIZE * 0.5;

        const radius = SIZE * 0.22 * (0.6 + hash(i + 2, j) * 1.1);
        const opacity = 0.05 + hash(i, j + 2) * 0.1;

        result.push({
          key: `${i}-${j}`,
          x: i * SIZE + jitterX,
          y: j * SIZE + jitterY,
          radius,
          opacity,
        });
      }
    }
    return result;
  }, []);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      stroke="white"
      strokeWidth="2"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={TILE}
          height={TILE}
        >
          {circles.map((c) => (
            <circle
              key={c.key}
              cx={c.x}
              cy={c.y}
              r={c.radius}
              opacity={c.opacity}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
