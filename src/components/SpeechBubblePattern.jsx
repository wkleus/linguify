// Decorative speech-bubble wireframe pattern for background
import { useId, useMemo } from "react";

function hash(i, j) {
  let h = i * 374761393 + j * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return ((h >>> 0) % 1000) / 1000;
}
function speechBubblePath(size) {
  const w = size * 1.3;
  const h = size;
  const r = size * 0.28;
  const x = -w / 2;
  const y = -h / 2;
  const tailW = size * 0.22;
  const tailH = size * 0.24;
  const tailX = x + w * 0.28;

  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${tailX + tailW}`,
    `L ${tailX} ${y + h + tailH}`,
    `L ${tailX} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

const SIZE = 54;
const GRID = 7;
const TILE = GRID * SIZE;

export default function SpeechBubblePattern({ className = "" }) {
  const patternId = `speech-bubble-pattern-${useId()}`;

  const bubbles = useMemo(() => {
    const result = [];
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const keep = hash(i, j);
        if (keep > 0.5) continue;

        const jitterX = (hash(i + 1, j) - 0.5) * SIZE * 0.5;
        const jitterY = (hash(i, j + 1) - 0.5) * SIZE * 0.5;
        const size = SIZE * 0.4 * (0.6 + hash(i + 2, j) * 1.1);
        const rotation = (hash(i, j + 2) - 0.5) * 24;
        const flip = hash(i + 2, j + 2) > 0.5 ? -1 : 1;
        const opacity = 0.05 + hash(i + 1, j + 2) * 0.1;

        result.push({
          key: `${i}-${j}`,
          x: i * SIZE + jitterX,
          y: j * SIZE + jitterY,
          rotation,
          flip,
          opacity,
          d: speechBubblePath(size),
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
          {bubbles.map((b) => (
            <path
              key={b.key}
              d={b.d}
              opacity={b.opacity}
              transform={`translate(${b.x}, ${b.y}) rotate(${b.rotation}) scale(${b.flip}, 1)`}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
