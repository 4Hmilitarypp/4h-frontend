import * as React from 'react'
import { fireEvent, flushEffects, render } from 'react-testing-library'
import { IReport } from '../../../sharedTypes'
import Reports from '../Reports'

let nativeScrollTo: any

afterAll(() => (window.scrollTo = nativeScrollTo))

interface IProps {
  reports?: IReport[]
}

const fakeReports = [
  {
    image:
      'https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,h_660/v1542943962/report-covers/army/2010_Army_Report_cover.jpg',
    title: 'Army Annual Report 2010',
    url: 'https://res.cloudinary.com/four-hmpp/image/upload/v1542944083/reports/army/2010_Army_annual_report.pdf',
  },
]

const setup = (propOverrides?: IProps) => {
  const props = Object.assign(
    {
      reports: fakeReports,
    },
    propOverrides
  )
  const mockScrollTo = jest.fn()
  nativeScrollTo = window.scrollTo
  window.scrollTo = mockScrollTo

  const utils = render(<Reports {...props} />)
  flushEffects()
  return {
    ...utils,
    mockScrollTo,
  }
}

describe('documentOpen', () => {
  it('should enable open and closing of the pdf', async () => {
    const { getByText, queryByText, getByTestId } = setup()
    expect(queryByText(/close/i)).toBeFalsy()

    const reportCard = getByTestId('reportCard')
    fireEvent.click(reportCard)

    const closeButton = getByText(/close/i)
    fireEvent.click(closeButton)

    expect(queryByText(/close/i)).toBeFalsy()
  })
})
