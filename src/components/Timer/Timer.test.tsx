import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Timer } from './Timer'
import { act } from 'react-dom/test-utils'

describe('Timer', () => {
  const timerLengthMinutes = 10
  const onFinish = jest.fn()
  const defaultProps = {
    timerLengthMinutes: timerLengthMinutes,
    onFinish: onFinish,
    continuous: false
  }

  const init = (overrides?: Partial<typeof defaultProps>) => {
    render(<Timer {...defaultProps} {...overrides} />)
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

    advanceByMinutes(1)
    user.click(timer)

    expect(screen.getByText('1:00')).toBeInTheDocument()

    user.click(timer)
    advanceByMinutes(1)

    expect(screen.getByText('2:00')).toBeInTheDocument()
  })

  it('starts over if continuous set', () => {
    init({ continuous: true })

    advanceByMinutes(15)

    expect(screen.getByText('5:00')).toBeInTheDocument()
  })
})
