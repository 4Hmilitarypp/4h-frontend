import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Heading, P, PageWrapper } from '../components/Elements'

const Home: React.FC<RouteComponentProps> = () => (
  <PageWrapper>
    <Heading>Home</Heading>
    <CustomP>We don't quite have this page finished yet, but it will be up soon!</CustomP>
    <P>Almost all of the rest of the site is finished, please look around</P>
  </PageWrapper>
)
export default Home

const CustomP = styled(P)`
  font-weight: 600;
`
