import * as React from 'react'
import { render } from '@testing-library/react'
import Educator from '../Educator'

interface IProps {
  children: any
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Educator {...props} />)
  return {
    ...utils,
  }
}

it('should render', () => {
  setup()
})
