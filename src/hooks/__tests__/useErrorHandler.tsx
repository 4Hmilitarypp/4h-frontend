import * as React from 'react'
import { fireEvent, render } from 'react-testing-library'
import FlashContext, { useFlash } from '../../contexts/FlashContext'
import Flash from '../../Flash'
import { IApiError } from '../../sharedTypes'
import useErrorHandler from '../useErrorHandler'

interface IProps {
  err: IApiError
  fakeHandleError: (err: IApiError) => void
}

interface IChildProps extends IProps {
  resetFlashState: () => void
}

const Child: React.FC<IChildProps> = ({ fakeHandleError, err, resetFlashState }) => {
  const handleError = useErrorHandler()

  const combinedHandleError = () => {
    fakeHandleError(err)
    handleError(err)
  }
  return (
    <div>
      <button onClick={combinedHandleError}>Handle Error</button>
      <button onClick={resetFlashState}>Reset Flash</button>
    </div>
  )
}

const Parent: React.FC<IProps> = ({ fakeHandleError, err }) => {
  const { flashState, resetFlashState, setFlashState } = useFlash()

  return (
    <FlashContext.Provider value={{ ...flashState, reset: resetFlashState, set: setFlashState }}>
      <Flash />
      <Child fakeHandleError={fakeHandleError} resetFlashState={resetFlashState} err={err} />
    </FlashContext.Provider>
  )
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({ fakeHandleError: () => null }, propOverrides)

  const utils = render(<Parent {...props} />)

  return {
    ...utils,
  }
}

it('should display an error on screen if there is one', () => {
  const fakeMessage = 'fake message'
  const fakeHandleError = jest.fn()
  const err = { response: { data: { message: fakeMessage }, status: 500, statusText: 'fake status' } }

  const { getByText, queryByText } = setup({ fakeHandleError, err })

  fireEvent.click(getByText(/Handle Error/i))

  expect(getByText(fakeMessage)).toBeDefined()

  fireEvent.click(getByText(/Reset Flash/i))

  expect(queryByText(fakeMessage)).toBeNull()
})
