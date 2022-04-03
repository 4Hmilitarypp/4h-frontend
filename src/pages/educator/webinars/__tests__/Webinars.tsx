import * as React from 'react'
import { fireEvent,  render } from '@testing-library/react'
import Webinars from '../Webinars'
import generate from '../../../../utils/generate'

interface IProps {
  value: string
}

const staticWebinars = generate.webinars(6)

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Webinars {...props} />)
  return {
    ...utils,
  }
}

it('should display all webinars initially', () => {
  const { getByText } = setup()
  // flushEffects()
  const differentWebinars = [staticWebinars[0].title, staticWebinars[3].title, staticWebinars[5].title]
  differentWebinars.forEach(webinar => expect(getByText(webinar)).toBeDefined())
})

it('should only show the webinars whose categories match', () => {
  const { getByText, queryByText } = setup()
  // flushEffects()
  const differentWebinars = [staticWebinars[0].title, staticWebinars[3].title, staticWebinars[5].title]
  const firstCategoryButton = getByText(staticWebinars[0].category)
  fireEvent.click(firstCategoryButton)
  expect(getByText(differentWebinars[0])).toBeDefined()
  expect(queryByText(differentWebinars[1])).toBeNull()
  expect(queryByText(differentWebinars[2])).toBeNull()
})
