import React from 'react'
import { act, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { PomodoroTimer } from '.'

describe('PomodoroTimer', () => {
  const pomodoroLength = 15
  const shortBreakLength = 5
  const longBreakLength = 10
  const continuous = false
  const defaultProps = {
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
    continuous
  }
  const init = (overrides?: Partial<typeof defaultProps>) =>
    render(<PomodoroTimer {...defaultProps} {...overrides} />)

  const advanceByMinutes = (minutes: number) => {
    act(() => {
      const timeMs = minutes * 60 * 1000
      jest.advanceTimersByTime(timeMs)
    })
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('changes to next mode when one ends', () => {
    init({ continuous: true })
    const timer = screen.getByTestId('timer')

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()

    advanceByMinutes(pomodoroLength)

    expect(screen.getByText('Mode: SHORT_BREAK')).toBeInTheDocument()

    advanceByMinutes(shortBreakLength)

    expect(screen.getByText('Mode: LONG_BREAK')).toBeInTheDocument()

    // user.click(timer)
    advanceByMinutes(longBreakLength)

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()
  })
})
