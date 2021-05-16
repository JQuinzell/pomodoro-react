import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Timer } from './Timer'
import { act } from 'react-dom/test-utils'

describe('Timer', () => {
  const timerLengthMinutes = 10
  const onFinish = jest.fn()
  const init = () => {
    render(
      <Timer
        timerLengthMinutes={timerLengthMinutes}
        onFinish={onFinish}
        continuous={false}
      />
    )
  }
  const advanceByMinutes = (minutes: number) => {
    act(() => {
      const timeMs = minutes * 60 * 1000
      jest.advanceTimersByTime(timeMs)
    })
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('displays elapsed time', async () => {
    init()

    advanceByMinutes(5.5)

    const text = screen.getByText('5:30')
    expect(text).toBeInTheDocument()
  })

  it('stops and calls finish when time over', async () => {
    init()

    advanceByMinutes(11)

    const text = screen.getByText('10:00')
    expect(text).toBeInTheDocument()
    expect(onFinish).toBeCalledTimes(1)
  })

  it('pauses and resumes on click', () => {
    init()
    const timer = screen.getByTestId('timer')

    user.click(timer)
    advanceByMinutes(1)

    expect(screen.getByText('0:00')).toBeInTheDocument()

    user.click(timer)
    advanceByMinutes(1)

    expect(screen.getByText('1:00')).toBeInTheDocument()
  })
})
