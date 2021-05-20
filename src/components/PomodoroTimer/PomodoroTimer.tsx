import React, { useState } from 'react'
import { formatMinutes } from 'utils'
import { Timer } from '../Timer'

interface Props {
  pomodoroLength: number
  shortBreakLength: number
  longBreakLength: number
  continuous: boolean
  cyclesBeforeLongBreak: number
}

enum TimerMode {
  Pomodoro = 'POMODORO',
  ShortBreak = 'SHORT_BREAK',
  LongBreak = 'LONG_BREAK'
}

export function PomodoroTimer({
  pomodoroLength,
  shortBreakLength,
  longBreakLength,
  cyclesBeforeLongBreak,
  continuous
}: Props) {
  const [mode, setMode] = useState<TimerMode>(TimerMode.Pomodoro)
  const [timerLengthMinutes, setTimerLengthMinutes] = useState(pomodoroLength)
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0)
  const [timeStats, setTimeStats] = useState({
    [TimerMode.Pomodoro]: 0,
    [TimerMode.ShortBreak]: 0,
    [TimerMode.LongBreak]: 0
  })
  const workPercent =
    timeStats['POMODORO'] > 0
      ? (timeStats['POMODORO'] /
          (timeStats['SHORT_BREAK'] +
            timeStats['LONG_BREAK'] +
            timeStats['POMODORO'])) *
        100
      : 0

  function handleTimerFinish() {
    const timerLengthMap = {
      [TimerMode.Pomodoro]: pomodoroLength,
      [TimerMode.ShortBreak]: shortBreakLength,
      [TimerMode.LongBreak]: longBreakLength
    }
    const updatedPomodorosCompleted =
      mode === TimerMode.Pomodoro ? pomodorosCompleted + 1 : pomodorosCompleted
    const deserveLongBreak =
      updatedPomodorosCompleted % cyclesBeforeLongBreak === 0
    const nextMode =
      mode === TimerMode.Pomodoro
        ? deserveLongBreak
          ? TimerMode.LongBreak
          : TimerMode.ShortBreak
        : TimerMode.Pomodoro
    const nextTimerLength = timerLengthMap[nextMode]
    setPomodorosCompleted(updatedPomodorosCompleted)
    setMode(nextMode)
    setTimerLengthMinutes(nextTimerLength)
    setTimeStats((prev) => ({
      ...prev,
      [mode]: prev[mode] + timerLengthMap[mode]
    }))
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
      <p>POMODORO Time: {formatMinutes(timeStats['POMODORO'])}</p>
      <p>SHORT_BREAK Time: {formatMinutes(timeStats['SHORT_BREAK'])}</p>
      <p>LONG_BREAK Time: {formatMinutes(timeStats['LONG_BREAK'])}</p>
      <p>Work %: {workPercent}%</p>
    </>
  )
}
