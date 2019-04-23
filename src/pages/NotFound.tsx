import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Heading, Link, PageWrapper, Section } from '../components/Elements'
import { media } from '../utils/mixins'

const NotFound: React.FC<RouteComponentProps> = () => (
  <PageWrapper>
    <Section>
      <NotFoundHeading>Sorry, we weren't able to find your page</NotFoundHeading>
      <CustomP>
        After the website upgrade the urls to our resources changed. Most of the old information is on this new website
        if you look around.
      </CustomP>
      <CustomP>
        If you have trouble finding anything, please feel free to <CustomLink to="/contact-us">Contact Us</CustomLink>
      </CustomP>
    </Section>
  </PageWrapper>
)
export default NotFound

const NotFoundHeading = styled(Heading)`
  font-family: Rubik;
  font-weight: 500;
`
const CustomP = styled.p`
  font-size: 2rem;
  padding-bottom: 2rem;
  ${media.tabletPort`
    font-size: 1.8rem;
  `}
`
const CustomLink = styled(Link)`
  font-size: 2rem;
  ${media.tabletPort`
    font-size: 1.8rem;
  `}
`
