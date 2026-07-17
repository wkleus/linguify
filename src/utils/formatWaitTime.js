// Turns rate-limit "reset" ISO timestamp (returned by backend on 429) into a short, readable wait time
export function formatWaitTime(resetIso) {
  if (!resetIso) return null;

  const resetTime = new Date(resetIso).getTime();
  if (Number.isNaN(resetTime)) return null;

  const secondsLeft = Math.max(0, Math.ceil((resetTime - Date.now()) / 1000));
  if (secondsLeft === 0) return null;

  if (secondsLeft < 60) {
    return `${secondsLeft} second${secondsLeft === 1 ? "" : "s"}`;
  }

  const minutesLeft = Math.ceil(secondsLeft / 60);
  return `${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}`;
}
