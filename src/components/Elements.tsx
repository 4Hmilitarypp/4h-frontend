import { Link as UnstyledLink } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { elevation, transition } from '../utils/mixins'

// TODO Refactor this to use an Input and a label and return actual components.

export const InputGroup = styled.div`
  margin: 0 0.4rem 1.2rem;
  flex-grow: 1;
  label,
  legend {
    color: ${props => props.theme.primaryGrey};
    padding-bottom: 0.4rem;
  }
  label,
  input {
    display: block;
  }
  input,
  select,
  textarea {
    width: 100%;
    border-radius: 5px;
    padding: 0.9rem 1.5rem;
    border: none;
    background: ${props => props.theme.primaryBackground};
  }
`
export const PageWrapper = styled.div`
  padding: 0 2rem 2rem;
  max-width: 140rem;
  margin: 0 auto;
`
export const Heading = styled.h1`
  color: ${props => props.theme.primaryBlack};
  padding: 3.2rem 0 3.2rem;
  text-align: center;
  line-height: 1.2;
`
export const SubHeading = styled.h2`
  color: ${props => props.theme.primaryBlack};
  padding: 3.2rem 0 3.2rem;
  text-align: center;
  line-height: 1.2;
`
export const Button: any = styled.button`
  border-radius: 5px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.primaryLink};
  border: none;
  padding: 1.2rem 1.5rem;
  font-weight: 500;
  ${elevation(3)};
  ${transition({ prop: 'all', time: 0.15, name: 'easeOutQuart' })};
  &:hover,
  &:focus {
    transform: translateY(-1px);
    ${transition({ prop: 'all', time: 0.15, name: 'easeInCubic' })};
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1), 0 4px 7px 0 rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }
`
export const SecondaryButton = styled(Button)`
  background: ${props => props.theme.secondary};
`
export const Section = styled.section`
  max-width: 80rem;
  margin: 0 auto;
`
export const A = styled.a`
  font-weight: 500;
  color: ${props => props.theme.primaryLink};
  background: none;
  padding: 0;
  border: 0;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
// Have to do the props thing because of a jest error
export const Link = styled(props => <UnstyledLink {...props} />)`
  font-weight: 500;
  color: ${props => props.theme.primaryLink};
  &:hover {
    opacity: 0.8;
  }
`
export const P = styled.p`
  padding-bottom: 1.6rem;
  color: ${props => props.theme.primaryGrey};
  &:last-child {
    padding-bottom: 0;
  }
`
export const DynamicSection = styled(Section)`
  a {
    font-weight: 500;
    color: ${props => props.theme.primaryLink};
    &:hover {
      opacity: 0.8;
    }
  }
  p {
    padding-bottom: 1.5rem;
    &:last-child {
      padding-bottom: 0;
    }
  }
  ul {
    list-style: initial;
    padding-left: 4rem;
  }
`
