import { render } from '@testing-library/react'
import * as React from 'react'
import useHash from '../useHash'

let nativeScrollIntoView: any

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
  Element.prototype.scrollIntoView = nativeScrollIntoView
})

const setup = () => {
  const mockScrollIntoView = jest.fn(() => null)
  nativeScrollIntoView = Element.prototype.scrollIntoView
  Element.prototype.scrollIntoView = mockScrollIntoView
  return {
    mockScrollIntoView,
  }
}

describe('useHash', () => {
  it('should route when the hash is the same', async () => {
    const { mockScrollIntoView } = setup()
    const TestElement = () => {
      const fakeHash = '#go'
      const fakeRef = React.useRef<HTMLDivElement>(null)
      const fakeLocation = { hash: fakeHash }
      useHash({ refToFocus: fakeRef, hash: fakeHash, location: fakeLocation })
      return <div ref={fakeRef as any} />
    }
    render(<TestElement />)
    expect(mockScrollIntoView).toHaveBeenCalledTimes(0)
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
  })
})
