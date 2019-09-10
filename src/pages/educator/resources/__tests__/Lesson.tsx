import * as React from 'react'
import { fireEvent, render } from 'react-testing-library'
import Lesson from '../Lesson'
import { ILesson } from '../../../../sharedTypes'
import generate from '../../../../utils/generate'
jest.mock('../../../../utils/api')

interface IProps {
  lesson: ILesson
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const utils = render(<Lesson {...props} />)

  return {
    ...utils,
  }
}

describe('documentOpen', () => {
  it('should enable open and closing of the embed documents', async () => {
    const lesson = generate.lesson({
      links: [
        { url: 'http://fake1.com', type: 'pdf' },
        { url: 'http://fake2.com', type: 'doc' },
        { url: 'http://fake3.com', type: 'ppt' },
        { url: 'http://fake4.com', type: 'external' },
      ],
    })
    const { getByText, queryByText } = setup({ lesson })
    expect(queryByText(/close/i)).toBeFalsy()

    const viewButton1 = getByText(/pdf/i)
    fireEvent.click(viewButton1)

    const closeButton1 = getByText(/close/i)
    fireEvent.click(closeButton1)

    const viewButton2 = getByText(/Word Document/i)
    fireEvent.click(viewButton2)

    const closeButton2 = getByText(/close/i)
    fireEvent.click(closeButton2)

    const viewButton3 = getByText(/PowerPoint/i)
    fireEvent.click(viewButton3)

    const closeButton3 = getByText(/close/i)
    fireEvent.click(closeButton3)

    expect(getByText(/External Website/i)).toBeDefined()

    expect(queryByText(/close/i)).toBeFalsy()
  })
})
