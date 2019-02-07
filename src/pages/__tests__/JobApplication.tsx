import * as React from 'react'
import { render } from 'react-testing-library'
import JobApplication from '../JobApplication'

interface IProps {
  value: string
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<JobApplication {...props} />)
  return {
    ...utils,
  }
}

it('should render', () => {
  setup()
})
