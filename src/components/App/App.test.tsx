import { screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { PomodoroTimer } from 'components/PomodoroTimer'
import { createInit } from 'testUtils'
import { App } from './App'

jest.mock('components/PomodoroTimer', () => {
  return {
    PomodoroTimer: jest.fn()
  }
})

describe('App', () => {
  const MockPomodoroTimer = PomodoroTimer as jest.Mock
  const init = createInit({}, App)

  beforeEach(() => {
    MockPomodoroTimer.mockReturnValue(null)
  })

  it('renders PomodoroTimer with default props', () => {
    const pomodoroLength = 15
    const shortBreakLength = 5
    const longBreakLength = 10
    const cyclesBeforeLongBreak = 2
    const continuous = false
    init()

    expect(MockPomodoroTimer).toHaveBeenCalledTimes(1)
    expect(MockPomodoroTimer).toHaveBeenCalledWith(
      {
        pomodoroLength,
        shortBreakLength,
        longBreakLength,
        cyclesBeforeLongBreak,
        continuous
      },
      {}
    )
  })

  it('renders PomodoTimer with settings', () => {
    const pomodoroLength = 100
    const shortBreakLength = 100
    const longBreakLength = 100
    const cyclesBeforeLongBreak = 100
    const continuous = true
    init()

    const pomodoroLengthInput = screen.getByLabelText('Pomodoro Length')
    const shortBreakLengthInput = screen.getByLabelText('Short Break Length')
    const longBreakLengthInput = screen.getByLabelText('Long Break Length')
    const cyclesInput = screen.getByLabelText('Number of Cycles')
    const continuousToggle = screen.getByLabelText('Continuous')
    user.clear(pomodoroLengthInput)
    user.type(pomodoroLengthInput, pomodoroLength.toString())
    user.clear(shortBreakLengthInput)
    user.type(shortBreakLengthInput, shortBreakLength.toString())
    user.clear(longBreakLengthInput)
    user.type(longBreakLengthInput, longBreakLength.toString())
    user.clear(cyclesInput)
    user.type(cyclesInput, cyclesBeforeLongBreak.toString())
    user.click(continuousToggle)

    expect(MockPomodoroTimer).toHaveBeenLastCalledWith(
      {
        pomodoroLength,
        shortBreakLength,
        longBreakLength,
        cyclesBeforeLongBreak,
        continuous
      },
      {}
    )
  })
})
