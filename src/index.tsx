import { PomodoroTimer } from 'components/PomodoroTimer'
import React from 'react'
import ReactDOM from 'react-dom'

const pomodoroLength = 0.05
const shortBreakLength = 0.05
const longBreakLength = 0.1

ReactDOM.render(
  <PomodoroTimer
    pomodoroLength={pomodoroLength}
    shortBreakLength={shortBreakLength}
    longBreakLength={longBreakLength}
    continuous={false}
  />,
  document.getElementById('app')
)
