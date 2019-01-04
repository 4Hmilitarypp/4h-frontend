import * as React from 'react'
import { flushEffects, render, waitForElement } from 'react-testing-library'
import Resource from '../Resource'
jest.mock('../../../../utils/api')
import fakeApi from '../../../../utils/api'
import generate from '../../../../utils/generate'

beforeEach(() => (fakeApi as any).reset())

interface IProps {
  slug: string
}

const setup = async (propOverrides?: IProps) => {
  const fakeLessons = generate.lessons(3)
  const fakeResource = generate.resource(undefined, fakeLessons)
  const props = Object.assign(
    {
      slug: fakeResource.slug,
    },
    propOverrides
  )

  const resourcesMock = fakeApi.resources.getBySlug as any
  resourcesMock.mockImplementationOnce(() => Promise.resolve(fakeResource))

  const utils = render(<Resource {...props} />)
  flushEffects()

  await waitForElement(() => utils.getByTestId('resource'))

  return {
    ...utils,
  }
}

it('should render', async () => {
  await setup()
})

it('should not render if there is no slug', async () => {
  await setup({ slug: '' })
})
