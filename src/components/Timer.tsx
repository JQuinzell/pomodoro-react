import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import './Timer.scss'

interface Props {
  timerLengthMinutes: number
}
/**
 * Todo:
 * - display progress & minutes passed
 * - tick timer / update every second
 * - callback when complete & stop picking
 */

export function Timer({ timerLengthMinutes }: Props) {
  const totalSeconds = timerLengthMinutes * 60
  const elapsedMinutes = timerLengthMinutes / 3
  const elapsedSeconds = elapsedMinutes * 60
  const elapsedTime =
    Math.floor(elapsedMinutes).toString() +
    ':' +
    (elapsedSeconds % 60).toString().padStart(2, '0')
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
