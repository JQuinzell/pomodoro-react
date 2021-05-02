import React from 'react'
import { act, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { PomodoroTimer } from '.'

describe('PomodoroTimer', () => {
  const pomodoroLength = 15
  const shortBreakLength = 5
  const longBreakLength = 10
  const defaultProps = {
    pomodoroLength,
    shortBreakLength,
    longBreakLength
  }
  const init = () => render(<PomodoroTimer {...defaultProps} />)

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
    const { rerender } = init()
    const timer = screen.getByTestId('timer')

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()

    console.log('advancing timer pomodoro')
    advanceByMinutes(pomodoroLength)
    rerender(<PomodoroTimer {...defaultProps} />)

    expect(screen.getByText('Mode: SHORT_BREAK')).toBeInTheDocument()

    user.click(timer)
    console.log('advancing timer short break')
    advanceByMinutes(shortBreakLength)
    rerender(<PomodoroTimer {...defaultProps} />)

    expect(screen.getByText('Mode: LONG_BREAK')).toBeInTheDocument()

    user.click(timer)
    console.log('advancing timer long break')
    advanceByMinutes(longBreakLength)

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()
  })
})
