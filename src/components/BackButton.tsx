import { navigate as reachNavigate } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import Icon from './Icon'

interface IProps {
  navigate?: any
  route: string
  title: string
}

const UnstyledBackButton: React.FC<IProps> = ({ navigate = reachNavigate, route, title }) => {
  return (
    <BackButton onClick={() => navigate(route)}>
      <BackIcon name="back" circleColor="#339966" arrowColor="#fff" />
      <BackText>Back To {title}</BackText>
    </BackButton>
  )
}

export default UnstyledBackButton

const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 5px;
  display: flex;
  transition: transform 0.2s ease-in;
  padding: 0 1.2rem;
  margin: 1.2rem 0;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`
const BackIcon = styled(Icon)`
  height: 3.2rem;
  width: 3.2rem;
`
const BackText = styled.span`
  color: ${props => props.theme.primary};
  font-size: 1.8rem;
  font-weight: 600;
  margin-left: 1.2rem;
  white-space: nowrap;
`
