import React from 'react'
import { render, screen } from '@testing-library/react'
import { Timer } from './Timer'
import { act } from 'react-dom/test-utils'

describe('Timer', () => {
  const timerLengthMinutes = 10
  const onFinish = jest.fn()
  const init = () => {
    render(
      <Timer timerLengthMinutes={timerLengthMinutes} onFinish={onFinish} />
    )
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('displays elapsed time', async () => {
    init()

    act(() => {
      jest.advanceTimersByTime(5.5 * 60 * 1000)
    })

    const text = screen.getByText('5:30')
    expect(text).toBeInTheDocument()
  })

  it('stops and calls finish when time over', async () => {
    init()

    act(() => {
      jest.advanceTimersByTime(11 * 60 * 1000)
    })

    const text = screen.getByText('10:00')
    expect(text).toBeInTheDocument()
    expect(onFinish).toBeCalledTimes(1)
  })
})
