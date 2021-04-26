import { Timer } from 'components/Timer'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <Timer timerLengthMinutes={0.5} onFinish={() => console.log('Finished')} />,
  document.getElementById('app')
)
