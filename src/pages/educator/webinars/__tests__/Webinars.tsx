import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import * as React from 'react'
import fakeApi from '../../../../utils/api'
import generate from '../../../../utils/generate'
import Webinars from '../Webinars'
jest.mock('../../../../utils/api')

interface IProps {
  value: string
}

const setup = async (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const webinars = generate.webinars(5)
  const webinarsMock = fakeApi.webinars.get as any
  webinarsMock.mockImplementationOnce(async () => webinars)
  const utils = render(<Webinars {...props} />)

  await waitForDomChange
  return {
    ...utils,
    webinars,
  }
}

it('should display all webinars initially', async () => {
  const { webinars, getByText } = await setup()
  const differentWebinars = [webinars[0].title, webinars[3].title, webinars[4].title]
  differentWebinars.forEach(webinar => expect(getByText(webinar)).toBeDefined())
})
it('should only show the webinars whose categories match', async () => {
  const { webinars, getByText, getAllByText, queryByText } = await setup()
  const differentWebinars = [webinars[0].title, webinars[3].title, webinars[4].title]
  const firstCategoryButton = getAllByText(webinars[0].category)[0]
  fireEvent.click(firstCategoryButton)
  expect(getByText(differentWebinars[0])).toBeDefined()
  expect(queryByText(differentWebinars[1])).toBeNull()
  expect(queryByText(differentWebinars[2])).toBeNull()
})
