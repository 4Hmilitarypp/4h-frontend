import * as React from 'react'
import { fireEvent, flushEffects, render, wait } from 'react-testing-library'
jest.mock('../../utils/api')
import FlashContext, { useFlash } from '../../contexts/FlashContext'
import api from '../../utils/api'
import generate from '../../utils/generate'
import ContactUs from '../ContactUs'

beforeEach(() => (api as any).reset())

const Component: React.FC<{ setFlash: any }> = ({ children, setFlash }) => {
  const { flashState, resetFlashState, setFlashState } = useFlash()

  const combinedSetFlash = (args: any) => {
    setFlash(args)
    setFlashState(args)
  }

  return (
    <FlashContext.Provider value={{ ...flashState, reset: resetFlashState, set: combinedSetFlash }}>
      {children}
    </FlashContext.Provider>
  )
}

interface IProps {
  setFlash: (args: any) => void
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({ setFlash: () => null }, propOverrides)

  const fakeCaptcha = jest.fn(() => 'token')
  ;(window as any).grecaptcha = {}
  ;(window as any).grecaptcha.execute = fakeCaptcha

  const utils = render(
    <Component setFlash={props.setFlash}>
      <ContactUs {...props} />
    </Component>
  )
  flushEffects()
  const nameInput = utils.getByLabelText(/Your Name/i) as HTMLInputElement
  const emailInput = utils.getByLabelText(/Your Email/i) as HTMLInputElement
  const messageTextArea = utils.getByLabelText(/Your Message/i) as HTMLInputElement
  const submitButton = utils.getByText(/Send Message/i) as HTMLButtonElement
  return {
    emailInput,
    messageTextArea,
    nameInput,
    props,
    submitButton,
    ...utils,
  }
}

describe('interaction', () => {
  it('should submit the form with the correct values', async () => {
    const setFlash = jest.fn((args: any) => null)
    const { emailInput, messageTextArea, nameInput, submitButton } = setup({ setFlash })

    const fakeEmail = generate.contactUsEmail()

    fireEvent.change(nameInput, { target: { value: fakeEmail.name } })
    fireEvent.change(emailInput, { target: { value: fakeEmail.email } })
    fireEvent.change(messageTextArea, { target: { value: fakeEmail.message } })

    fireEvent.submit(submitButton)

    await wait(() => expect(api.emails.contactUs).toHaveBeenCalledTimes(1))
    expect(api.emails.contactUs).toHaveBeenCalledWith({
      email: fakeEmail.email,
      message: fakeEmail.message,
      name: fakeEmail.name,
    })

    expect(setFlash).toHaveBeenCalledTimes(1)
    expect(setFlash).toHaveBeenCalledWith({
      message: 'Your message was sent successfully, and you should hear back soon!',
    })
  })

  it('should display a captcha error if the backend says the user is a robot', async () => {
    const setFlash = jest.fn(() => null)
    ;(api.emails.checkIfSpam as any).mockImplementationOnce(() => Promise.resolve(true))
    const { emailInput, messageTextArea, nameInput, submitButton } = setup({ setFlash })

    const fakeEmail = generate.contactUsEmail()

    fireEvent.change(nameInput, { target: { value: fakeEmail.name } })
    fireEvent.change(emailInput, { target: { value: fakeEmail.email } })
    fireEvent.change(messageTextArea, { target: { value: fakeEmail.message } })

    fireEvent.submit(submitButton)

    await wait(() => expect(setFlash).toHaveBeenCalledTimes(1))

    expect(setFlash).toHaveBeenCalledWith({
      isError: true,
      message: 'you failed to pass the captcha test, please try again',
    })
  })
})
