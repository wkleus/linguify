// Decorative isometric cube/hexagon wireframe pattern that tiles seamlessly
// across the full background, at any viewport size. Deliberately irregular
// (varied sizes, gaps, opacity) rather than a perfectly uniform grid, so it
// doesn't read as a mechanical, repeating wallpaper. Purely decorative -
// hidden from screen readers and ignores pointer events.
import { useId, useMemo } from "react";

// Returns the 6 vertices of a flat-top hexagon centered at (x, y).
function hexPoints(x, y, size) {
  const h = size;
  const w = size * 0.866; // cos(30°), for a flat-top hexagon
  return [
    [x, y - h], // top
    [x + w, y - h / 2], // top-right
    [x + w, y + h / 2], // bottom-right
    [x, y + h], // bottom
    [x - w, y + h / 2], // bottom-left
    [x - w, y - h / 2], // top-left
  ];
}

// Renders a single isometric "cube": hexagon outline + 3 inner edges meeting
// at the center, giving the illusion of a 3D cube seen from the corner.
function Cube({ x, y, size, opacity }) {
  const pts = hexPoints(x, y, size);
  return (
    <g opacity={opacity}>
      <polygon points={pts.map((p) => p.join(",")).join(" ")} />
      <line x1={x} y1={y} x2={pts[0][0]} y2={pts[0][1]} />
      <line x1={x} y1={y} x2={pts[2][0]} y2={pts[2][1]} />
      <line x1={x} y1={y} x2={pts[4][0]} y2={pts[4][1]} />
    </g>
  );
}

// Deterministic pseudo-random hash in [0, 1) - same output for the same
// (i, j) on every render, so the tile content stays perfectly stable/seamless
// rather than using Math.random() (which would differ per render/reload).
function hash(i, j) {
  let h = i * 374761393 + j * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 1000) / 1000;
}

// Base lattice spacing. Cubes sit on a diamond lattice (points where
// i + j is even) so touching neighbours are offset by (±SIZE, ±SIZE).
const SIZE = 42;
// Tile spans GRID lattice steps in each direction (must be even, so the
// diamond-lattice parity lines up across tile boundaries). A larger grid
// means a longer repeat period, making the irregularity read as organic
// rather than an obviously repeating swatch.
const GRID = 8;
const TILE = GRID * SIZE;

export default function IsometricPattern({ className = "" }) {
  const patternId = `isometric-cubes-${useId()}`;

  // Computed once - deterministic, so no need to recompute on every render
  const cubes = useMemo(() => {
    const result = [];
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        if ((i + j) % 2 !== 0) continue; // only diamond-lattice points touch
        const keep = hash(i, j);
        if (keep > 0.62) continue; // skip ~38% of points to create gaps
        const size = SIZE * (0.65 + hash(i + 1, j) * 0.7); // 0.65x - 1.35x
        const opacity = 0.05 + hash(i, j + 1) * 0.09; // 0.05 - 0.14
        result.push({
          key: `${i}-${j}`,
          x: i * SIZE,
          y: j * SIZE,
          size,
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
      strokeWidth="1"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={TILE}
          height={TILE}
        >
          {cubes.map((c) => (
            <Cube
              key={c.key}
              x={c.x}
              y={c.y}
              size={c.size}
              opacity={c.opacity}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
