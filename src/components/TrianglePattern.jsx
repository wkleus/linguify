// Decorative triangle wireframe pattern for background
import { useId, useMemo } from "react";

function hash(i, j) {
  let h = i * 374761393 + j * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 1000) / 1000;
}

function trianglePoints(size) {
  const r = size;
  return [0, 1, 2].map((k) => {
    const angle = -Math.PI / 2 + (k * (2 * Math.PI)) / 3;
    return [r * Math.cos(angle), r * Math.sin(angle)];
  });
}

const SIZE = 64;
const GRID = 8;
const TILE = GRID * SIZE;

export default function TrianglePattern({ className = "" }) {
  const patternId = `triangle-pattern-${useId()}`;

  const triangles = useMemo(() => {
    const result = [];
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const keep = hash(i, j);
        if (keep > 0.55) continue;

        const jitterX = (hash(i + 1, j) - 0.5) * SIZE * 0.5;
        const jitterY = (hash(i, j + 1) - 0.5) * SIZE * 0.5;
        const size = SIZE * 0.3 * (0.6 + hash(i + 2, j) * 1.1);
        const rotation = hash(i, j + 2) * 360;
        const opacity = 0.05 + hash(i + 2, j + 2) * 0.1;
        const pts = trianglePoints(size)
          .map((p) => p.join(","))
          .join(" ");

        result.push({
          key: `${i}-${j}`,
          x: i * SIZE + jitterX,
          y: j * SIZE + jitterY,
          rotation,
          opacity,
          pts,
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
          {triangles.map((t) => (
            <polygon
              key={t.key}
              points={t.pts}
              opacity={t.opacity}
              transform={`translate(${t.x}, ${t.y}) rotate(${t.rotation})`}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
