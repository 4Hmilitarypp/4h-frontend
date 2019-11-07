import * as React from 'react'
import styled from 'styled-components/macro'

interface IDayProps {
  dateInfo: Date
}

class Day extends React.Component<IDayProps, any> {
  render() {
    return (
      <DayItem href="https://reddit.com">
        {this.props.dateInfo.toLocaleString('default', { weekday: 'short' })} {this.props.dateInfo.getDate()}
      </DayItem>
    )
  }
}

export default Day

const DayItem = styled.a`
  width: 60px;
  height: 60px;
  border: 1px solid #339866;
  background-color: #f1f9f5;
  padding: 3px 0 0 3px;
  display: inline-block;
  text-decoration: none;
  color: black;
  &:hover {
    color: #53288a;
    filter: drop-shadow(2px 2px 5px gray);
  }
`
