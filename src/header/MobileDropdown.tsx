import * as React from 'react'
import styled from 'styled-components/macro'
import Icon from '../components/Icon'

interface IProps {
  title: string
}

const MobileDropdown: React.FC<IProps> = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <DropDown>
      <Wrapper onClick={() => setExpanded(!expanded)}>
        {title}
        <Icon name={expanded ? 'chevron-down' : 'chevron-right'} height={24} />
      </Wrapper>
      {expanded && <div>{children}</div>}
    </DropDown>
  )
}

export default MobileDropdown

const DropDown = styled.div`
  width: 100%;
`

const Wrapper = styled.span`
  color: ${(props: any) => props.theme.secondary};
  font-size: 1.6rem;
  padding: 1.2rem 2.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  width: 100%;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.primaryGrey};
    .icon-chevron-right,
    .icon-chevron-down {
      .secondary {
        fill: hsl(150, 6%, 31%);
      }
    }
  }
  .icon-chevron-right,
  .icon-chevron-down {
    .secondary {
      fill: hsl(266, 55%, 35%);
    }
  }
`
