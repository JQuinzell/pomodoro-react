export function formatMinutes(minutes: number, seconds: number = 0) {
  return minutes.toString() + ':' + (seconds % 60).toString().padStart(2, '0')
}

const alarmSound = new Audio('alarm.mp3')

export function playAlarm() {
  return alarmSound.play()
}
