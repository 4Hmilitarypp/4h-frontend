import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { IWebinar } from '../../../../sharedTypes'
import generate from '../../../../utils/generate'
import Webinar from '../Webinar'

interface IProps {
  webinar?: IWebinar
}

const setup = (propOverrides?: IProps) => {
  const fakeWebinar = generate.webinar(100)
  const props = Object.assign(
    {
      webinar: { ...fakeWebinar },
    },
    propOverrides
  )

  const utils = render(<Webinar {...props} />)
  return {
    ...utils,
  }
}
it('should change expand to collapse when expand is clicked and then change back.', () => {
  const webinar = generate.webinar(1500)
  const { getByText, queryByText } = setup({ webinar })
  const expand = getByText(/expand/i)
  fireEvent.click(expand)
  const collapse = getByText(/collapse/i)
  expect(queryByText(/expand/i)).toBeNull()
  fireEvent.click(collapse)
  expect(getByText(/expand/i)).toBeDefined()
})
