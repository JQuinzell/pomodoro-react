import React from 'react'
import { act, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { PomodoroTimer } from '.'
import { createInit } from 'testUtils'

describe('PomodoroTimer', () => {
  const pomodoroLength = 15
  const shortBreakLength = 5
  const longBreakLength = 25
  const workPercent = 50
  const cyclesBeforeLongBreak = 2
  const continuous = false
  const defaultProps = {
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
    cyclesBeforeLongBreak,
    continuous
  }
  const init = createInit(defaultProps, PomodoroTimer)

  const advanceByMinutes = (minutes: number) => {
    act(() => {
      const timeMs = minutes * 60 * 1000
      jest.advanceTimersByTime(timeMs)
    })
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('changes to next mode when one ends after you click', () => {
    init({ continuous: false })
    const timer = screen.getByTestId('timer')

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()

    advanceByMinutes(pomodoroLength)
    expect(screen.getByText('Mode: SHORT_BREAK')).toBeInTheDocument()

    user.click(timer)
    advanceByMinutes(shortBreakLength)

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()

    user.click(timer)
    advanceByMinutes(pomodoroLength)

    expect(screen.getByText('Mode: LONG_BREAK')).toBeInTheDocument()

    user.click(timer)
    advanceByMinutes(longBreakLength)

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()
  })

  it('displays time stats for each mode', () => {
    init({ continuous: false })
    const timer = screen.getByTestId('timer')

    advanceByMinutes(pomodoroLength)
    user.click(timer)
    advanceByMinutes(shortBreakLength)
    user.click(timer)
    advanceByMinutes(pomodoroLength)
    user.click(timer)
    advanceByMinutes(longBreakLength)

    expect(
      screen.getByText(`POMODORO Time: ${pomodoroLength * 2}:00`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`SHORT_BREAK Time: ${shortBreakLength}:00`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`LONG_BREAK Time: ${longBreakLength}:00`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Work %: ${workPercent}%`)).toBeInTheDocument()
  })

  it('changes to next mode when one ends if continuous set', () => {
    init({ continuous: true })

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()

    advanceByMinutes(pomodoroLength)

    expect(screen.getByText('Mode: SHORT_BREAK')).toBeInTheDocument()

    advanceByMinutes(shortBreakLength)

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()

    advanceByMinutes(pomodoroLength)

    expect(screen.getByText('Mode: LONG_BREAK')).toBeInTheDocument()

    advanceByMinutes(longBreakLength)

    expect(screen.getByText('Mode: POMODORO')).toBeInTheDocument()
  })
})
