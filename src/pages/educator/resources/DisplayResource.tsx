import { Link } from '@reach/router'
// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button, SubHeading } from '../../../components/Elements'
import { IResource } from '../../../sharedTypes'
import { elevation } from '../../../utils/mixins'
const DisplayResource = ({ resource }: { resource: IResource }) => {
  const { title, slug, shortDescription } = resource
  return (
    <Wrapper key={title}>
      <Title>
        <CustomSubHeading as="h3">{title}</CustomSubHeading>
        <ViewButton as={Link} to={slug}>
          View
        </ViewButton>
      </Title>
      <Description>{shortDescription}</Description>
    </Wrapper>
  )
}

export default DisplayResource

const Wrapper = styled.div`
  background: ${props => props.theme.primaryBackground};
  padding: 2rem 3.2rem;
  ${elevation(3)};
  &:not(:last-child) {
    margin-bottom: 3.2rem;
  }
`
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 2.4rem;
`
const CustomSubHeading = styled(SubHeading)`
  padding: 0;
  text-align: left;
`
const ViewButton = styled(Button)`
  white-space: nowrap;
  margin: 0 -1.2rem 0 2rem;
  padding: 0.4rem 1.2rem;
  color: ${props => props.theme.white} !important;
  &:hover {
    opacity: 1 !important;
    transform: none !important;
    background: #327654 !important;
  }
`
const Description = styled.div``
