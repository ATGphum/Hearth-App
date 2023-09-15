export function formatTime(inputSeconds: number) {
  const seconds = Math.round(inputSeconds);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
