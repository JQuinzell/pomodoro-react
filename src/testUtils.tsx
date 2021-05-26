import { render } from '@testing-library/react'
import React from 'react'

export const createInit = <T,>(
  defaultProps: T,
  Component: React.ComponentType<T>
) => (overrides?: Partial<T>) =>
  render(<Component {...defaultProps} {...overrides} />)
