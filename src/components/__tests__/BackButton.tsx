import * as React from 'react'
import { fireEvent, render } from 'react-testing-library'
import BackButton from '../BackButton'

interface IProps {
  navigate: () => void
  route: string
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({ title: 'Title' }, propOverrides)

  const utils = render(<BackButton {...props} />)
  const button = utils.getByText(`Back To ${props.title}`) as HTMLInputElement
  return {
    button,
    props,
    ...utils,
  }
}

it('should call the navigate function when clicked', () => {
  const fakeNavigate = jest.fn()
  const fakeRoute = 'test-route'
  const { button } = setup({ navigate: fakeNavigate, route: fakeRoute })

  fireEvent.click(button)

  expect(fakeNavigate).toHaveBeenCalledTimes(1)
  expect(fakeNavigate).toHaveBeenCalledWith(fakeRoute)
})
