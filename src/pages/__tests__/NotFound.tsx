import * as React from 'react'
import { render } from '@testing-library/react'
import NotFound from '../NotFound'

interface IProps {
  value: string
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<NotFound {...props} />)
  return {
    ...utils,
  }
}

it('should render', () => {
  setup()
})
