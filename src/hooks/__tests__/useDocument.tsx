import * as React from 'react'
import { fireEvent, flushEffects, render } from 'react-testing-library'
import useDocument from '../useDocument'

const Comp: React.FC<{}> = () => {
  const { documentOpen, setDocumentOpen } = useDocument()
  return documentOpen ? (
    <button onClick={() => setDocumentOpen(false)}>Close</button>
  ) : (
    <button onClick={() => setDocumentOpen(true)}>Open</button>
  )
}

const setup = (propOverrides?: {}) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Comp {...props} />)
  return {
    ...utils,
  }
}

it('should enable open and closing of the pdf', async () => {
  const { getByText, queryByText } = setup()
  expect(queryByText(/close/i)).toBeFalsy()

  const openButton = getByText(/open/i)
  fireEvent.click(openButton)

  const closeButton = getByText(/close/i)
  fireEvent.click(closeButton)

  expect(queryByText(/close/i)).toBeFalsy()
})

it('should close when the escape key is pressed', async () => {
  const { getByText, queryByText, container } = setup()

  const openButton = getByText(/open/i)
  fireEvent.click(openButton)
  flushEffects()

  const closeButton = getByText(/close/i)
  expect(closeButton).toBeDefined()

  fireEvent.keyDown(container, { key: 'Escape', code: 27 })

  expect(queryByText(/close/i)).toBeFalsy()
})
