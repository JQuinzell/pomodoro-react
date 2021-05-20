import { PomodoroTimer } from 'components/PomodoroTimer'
import React, { useState } from 'react'
import { FormControlLabel, Switch, TextField } from '@material-ui/core'

export function App() {
  const [pomodoroLength, setPomodoroLength] = useState(0.1)
  const [shortBreakLength, setShortBreakLength] = useState(5)
  const [longBreakLength, setLongBreakLength] = useState(10)
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(2)
  const [isContinuous, setIsContinuous] = useState(false)

  return (
    <>
      <PomodoroTimer
        pomodoroLength={pomodoroLength}
        shortBreakLength={shortBreakLength}
        longBreakLength={longBreakLength}
        cyclesBeforeLongBreak={cyclesBeforeLongBreak}
        continuous={isContinuous}
      />
      <FormControlLabel
        control={
          <Switch
            checked={isContinuous}
            onChange={(e) => setIsContinuous(e.target.checked)}
          />
        }
        label="Continuous"
      />
      <TextField
        id="pomodoro-length"
        label="Pomodoro Length"
        value={pomodoroLength}
        onChange={(e) => {
          const length = Number(e.target.value)
          if (length > 0) setPomodoroLength(length)
        }}
        type="number"
      />
      <TextField
        id="short-break-length"
        label="Short Break Length"
        value={shortBreakLength}
        onChange={(e) => {
          const length = Number(e.target.value)
          if (length > 0) setShortBreakLength(length)
        }}
        type="number"
      />
      <TextField
        id="long-break-length"
        label="Long Break Length"
        value={longBreakLength}
        onChange={(e) => {
          const length = Number(e.target.value)
          if (length > 0) setLongBreakLength(length)
        }}
        type="number"
      />
      <TextField
        id="number-cycles"
        label="Number of Cycles"
        value={cyclesBeforeLongBreak}
        onChange={(e) => {
          const length = Number(e.target.value)
          if (length > 0) setCyclesBeforeLongBreak(length)
        }}
        type="number"
      />
    </>
  )
}
