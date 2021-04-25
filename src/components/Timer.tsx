import React, { useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import './Timer.scss'

interface Props {
  timerLengthMinutes: number
  onFinish: () => void
}

export function Timer({ timerLengthMinutes, onFinish }: Props) {
  const timeoutRef = useRef<number | null>(null)
  const totalSeconds = timerLengthMinutes * 60
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const elapsedTime =
    elapsedMinutes.toString() +
    ':' +
    (elapsedSeconds % 60).toString().padStart(2, '0')

  useEffect(() => {
    const timeout = (timeoutRef.current = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000))
    return () => {
      clearInterval(timeout)
    }
  }, [timerLengthMinutes])

  useEffect(() => {
    if (elapsedSeconds == timerLengthMinutes * 60) {
      const timeout = timeoutRef.current
      if (timeout) clearInterval(timeout)
      onFinish()
    }
  }, [elapsedSeconds])

  return (
    <div className="timer-container">
      <CircularProgressbar
        value={elapsedSeconds}
        minValue={0}
        maxValue={totalSeconds}
        text={elapsedTime}
      />
    </div>
  )
}
