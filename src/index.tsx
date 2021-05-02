import { PomodoroTimer } from 'components/PomodoroTimer'
import React from 'react'
import ReactDOM from 'react-dom'

const pomodoroLength = 0.01
const shortBreakLength = 0.01
const longBreakLength = 0.1

ReactDOM.render(
  <PomodoroTimer
    pomodoroLength={pomodoroLength}
    shortBreakLength={shortBreakLength}
    longBreakLength={longBreakLength}
  />,
  document.getElementById('app')
)
