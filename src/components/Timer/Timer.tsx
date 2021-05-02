import React, { useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import './Timer.scss'

interface Props {
  timerLengthMinutes: number
  onFinish: () => void
}

export function Timer({ timerLengthMinutes, onFinish }: Props) {
  const [timerPaused, setTimerPaused] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const totalSeconds = timerLengthMinutes * 60
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const elapsedTime =
    elapsedMinutes.toString() +
    ':' +
    (elapsedSeconds % 60).toString().padStart(2, '0')

  function clearTimerInterval() {
    console.log('clearing timer intervalw')
    const timeout = timeoutRef.current
    timeoutRef.current = null
    if (timeout) clearInterval(timeout)
  }

  function setTimerInterval() {
    console.log('Setting timer interval')
    if (!timerPaused) {
      const timeout = (timeoutRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000))
      return timeout
    }
  }

  useEffect(() => {
    console.log('Timer paused effect', { timerPaused })
    setTimerInterval()
    return () => {
      console.log('timer paused cleanup')
      // This timer cleanup is clearing an interval for the next mode which stops the timer.
      clearTimerInterval()
    }
  }, [timerPaused])

  useEffect(() => {
    if (elapsedSeconds >= timerLengthMinutes * 60) {
      console.log('elapsed timer > length')
      clearTimerInterval()
      onFinish()
    }
  }, [elapsedSeconds])

  function togglePause() {
    console.log('togglePause', { timerPaused })
    setTimerPaused(!timerPaused)
  }

  return (
    <div className="timer-container" onClick={togglePause} data-testid="timer">
      <CircularProgressbar
        value={elapsedSeconds}
        minValue={0}
        maxValue={totalSeconds}
        text={elapsedTime}
      />
    </div>
  )
}
