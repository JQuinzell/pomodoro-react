export function formatMinutes(minutes: number, seconds: number = 0) {
  return minutes.toString() + ':' + (seconds % 60).toString().padStart(2, '0')
}
