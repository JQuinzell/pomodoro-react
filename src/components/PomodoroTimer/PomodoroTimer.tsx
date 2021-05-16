import React, { useState } from 'react'
import { Timer } from '../Timer'

interface Props {
  pomodoroLength: number
  shortBreakLength: number
  longBreakLength: number
  continuous: boolean
}

enum TimerMode {
  Pomodoro = 'POMODORO',
  ShortBreak = 'SHORT_BREAK',
  LongBreak = 'LONG_BREAK'
}

const nextModeMap = {
  [TimerMode.Pomodoro]: TimerMode.ShortBreak,
  [TimerMode.ShortBreak]: TimerMode.LongBreak,
  [TimerMode.LongBreak]: TimerMode.Pomodoro
}

export function PomodoroTimer({
  pomodoroLength,
  shortBreakLength,
  longBreakLength,
  continuous
}: Props) {
  const [mode, setMode] = useState<TimerMode>(TimerMode.Pomodoro)
  const [timerLengthMinutes, setTimerLengthMinutes] = useState(pomodoroLength)

  function handleTimerFinish() {
    const timerLengthMap = {
      [TimerMode.Pomodoro]: pomodoroLength,
      [TimerMode.ShortBreak]: shortBreakLength,
      [TimerMode.LongBreak]: longBreakLength
    }
    const nextMode = nextModeMap[mode]
    const nextTimerLength = timerLengthMap[nextMode]
    setMode(nextMode)
    setTimerLengthMinutes(nextTimerLength)
    console.log('finished timer', { nextMode, nextTimerLength })
  }

  return (
    <>
      <Timer
        timerLengthMinutes={timerLengthMinutes}
        onFinish={handleTimerFinish}
        continuous={continuous}
      />
      <div>Mode: {mode}</div>
    </>
  )
}
