import * as React from 'react'
import { render } from '@testing-library/react'
import Events from '../events/Events'

interface IProps {
  value: string
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Events {...props} />)
  return {
    ...utils,
  }
}

it('should render', () => {
  setup()
})
