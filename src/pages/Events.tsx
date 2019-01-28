import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components'
import { Heading, P, PageWrapper } from '../components/Elements'
import useHash from '../hooks/useHash'

const Events: React.FC<RouteComponentProps> = ({ location }) => {
  const pastEventRef = React.useRef<HTMLHeadingElement>(null)
  useHash({ refToFocus: pastEventRef, hash: '#past-events', location })
  return (
    <PageWrapper>
      <Heading>Events</Heading>
      <CustomP>We don't quite have this page finished yet, but it will be up soon!</CustomP>
    </PageWrapper>
  )
}
export default Events

const CustomP = styled(P)`
  font-weight: 600;
`
