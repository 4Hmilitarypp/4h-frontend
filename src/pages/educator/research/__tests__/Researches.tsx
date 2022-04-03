import * as React from 'react'
import {  render, waitFor } from '@testing-library/react'
import Researches from '../Researches'
import fakeApi from '../../../../utils/api'
import generate from '../../../../utils/generate'
jest.mock('../../../../utils/api')

beforeEach(() => (fakeApi as any).reset())

interface IProps {
  value: string
}

const setup = async (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides)

  const researches = generate.researches(5)
  const researchMock = fakeApi.research.get as any
  researchMock.mockImplementationOnce(() => Promise.resolve(researches))

  const utils = render(<Researches {...props} />)
  // flushEffects()

  await waitFor(() => utils.getByTestId('research'))

  return {
    ...utils,
  }
}

it('should render', async () => {
  await setup()
})
