import React, { useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import './Timer.scss'

interface Props {
  timerLengthMinutes: number
  onFinish: () => void
  continuous: boolean
}

export function Timer({ timerLengthMinutes, onFinish, continuous }: Props) {
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
    const timeout = timeoutRef.current
    console.log('clear interval', { timeout, continuous })
    if (timeout) {
      clearInterval(timeout)
    }
    // TODO: does this really work. setState does not set it synchronously so setTimerInterval will have the wrong value.
    // Can easily fix by pulling out the check
    setTimerPaused(continuous ? false : true)
    if (continuous) {
      setTimerInterval()
    }
  }

  function setTimerInterval() {
    if (!timerPaused) {
      console.log('setting interval')
      setElapsedSeconds(0)
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
    console.log('timerPaused effect', { timerPaused })
    setTimerInterval()
  }, [timerPaused])

  useEffect(() => {
    if (elapsedSeconds >= timerLengthMinutes * 60) {
      console.log('timer length reached')
      clearTimerInterval()
      onFinish()
    }
  }, [elapsedSeconds])

  function togglePause() {
    console.log('setting timerPaused to', !timerPaused)
    setTimerPaused(!timerPaused)
    const pausing = !timerPaused
    if (pausing) clearTimerInterval()
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
