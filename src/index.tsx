import { Timer } from 'components/Timer'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <Timer timerLengthMinutes={10} />,
  document.getElementById('app')
)
