// Decorative light-bulb wireframe pattern for background
import { useId, useMemo } from "react";

function hash(i, j) {
  let h = i * 374761393 + j * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 1000) / 1000;
}

function LightBulb({ size }) {
  const r = size * 0.55; // bulb head radius
  const headCy = -size * 0.15;
  const baseW = size * 0.44;
  const baseH = size * 0.35;
  const baseX = -baseW / 2;
  const baseY = size * 0.35;

  return (
    <g>
      <circle cx={0} cy={headCy} r={r} />
      <rect x={baseX} y={baseY} width={baseW} height={baseH} rx={size * 0.06} />
      <line
        x1={baseX}
        y1={baseY + baseH * 0.35}
        x2={baseX + baseW}
        y2={baseY + baseH * 0.35}
      />
      <line
        x1={baseX}
        y1={baseY + baseH * 0.7}
        x2={baseX + baseW}
        y2={baseY + baseH * 0.7}
      />
      <polyline
        points={`${-r * 0.35},${headCy - r * 0.3} ${r * 0.15},${headCy + r * 0.15} ${-r * 0.15},${headCy + r * 0.15} ${r * 0.35},${headCy + r * 0.5}`}
      />
    </g>
  );
}

const SIZE = 52;
const GRID = 7;
const TILE = GRID * SIZE;

export default function LightBulbPattern({ className = "" }) {
  const patternId = `light-bulb-pattern-${useId()}`;
  const bulbs = useMemo(() => {
    const result = [];
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const keep = hash(i, j);
        if (keep > 0.3) continue;

        const jitterX = (hash(i + 1, j) - 0.5) * SIZE * 0.5;
        const jitterY = (hash(i, j + 1) - 0.5) * SIZE * 0.5;
        const size = SIZE * 0.55 * (0.6 + hash(i + 2, j) * 1.1);
        const rotation = (hash(i, j + 2) - 0.5) * 20;
        const opacity = 0.06 + hash(i + 2, j + 2) * 0.11;

        result.push({
          key: `${i}-${j}`,
          x: i * SIZE + jitterX,
          y: j * SIZE + jitterY,
          size,
          rotation,
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
          {bulbs.map((b) => (
            <g
              key={b.key}
              opacity={b.opacity}
              transform={`translate(${b.x}, ${b.y}) rotate(${b.rotation})`}
            >
              <LightBulb size={b.size} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
