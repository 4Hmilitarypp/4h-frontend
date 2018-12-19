import * as React from 'react'
import { render } from 'react-testing-library'
import Events from '../Events'

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
