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

  function clearTimerInterval(timeout = timeoutRef.current) {
    const currentTimeout = timeoutRef.current
    if (currentTimeout === timeout) {
      console.log('nulling timer ref', { currentTimeout, timeout })
      timeoutRef.current = null
    }
    if (timeout) {
      console.log('clearing timer intervalw')
      clearInterval(timeout)
    }
  }

  function setTimerInterval() {
    if (!timerPaused) {
      console.log('Setting timer interval')
      const timeout = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000)
      timeoutRef.current = timeout
      return timeout
    } else {
      return null
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
