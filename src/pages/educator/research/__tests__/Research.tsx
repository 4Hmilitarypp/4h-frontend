import * as React from 'react'
import { fireEvent, flushEffects, render } from 'react-testing-library'
import { IResearch } from '../../../../sharedTypes'
import generate from '../../../../utils/generate'
import Research from '../Research'

interface IProps {
  research: IResearch
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Research {...props} />)
  return {
    ...utils,
  }
}

describe('documentOpen', () => {
  it('should enable open and closing of the pdf', async () => {
    const research = generate.research(undefined, { type: 'pdf' })
    const { getByText, queryByText } = setup({ research })
    expect(queryByText(/close/i)).toBeFalsy()

    const viewButton = getByText(/view/i)
    fireEvent.click(viewButton)

    const closeButton = getByText(/close/i)
    fireEvent.click(closeButton)

    expect(queryByText(/close/i)).toBeFalsy()
  })
  it('should enable open and closing of the doc', async () => {
    const research = generate.research(undefined, { type: 'doc' })
    const { getByText, queryByText } = setup({ research })
    expect(queryByText(/close/i)).toBeFalsy()

    const viewButton = getByText(/view/i)
    fireEvent.click(viewButton)

    const closeButton = getByText(/close/i)
    fireEvent.click(closeButton)

    expect(queryByText(/close/i)).toBeFalsy()
  })
})

describe('trimDescription', () => {
  it('should change expand to collapse when expand is clicked and then change back.', () => {
    const research = generate.research(1500)
    const { getByText, queryByText } = setup({ research })
    flushEffects() // flush effects to allow the heigh comparison to be done
    const expand = getByText(/expand/i)
    fireEvent.click(expand)
    const collapse = getByText(/collapse/i)
    expect(queryByText(/expand/i)).toBeNull()
    fireEvent.click(collapse)
    expect(getByText(/expand/i)).toBeDefined()
  })
})
