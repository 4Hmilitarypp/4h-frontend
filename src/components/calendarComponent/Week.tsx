import * as React from 'react'
import styled from 'styled-components/macro'
import Day from './Day'

interface IWeekProps {
  weekInfo: Date[]
}

class Week extends React.Component<IWeekProps, any> {
  render() {
    return (
      <WeekItem>
        {this.props.weekInfo.map(day => (
          <Day key={day.toLocaleDateString()} dateInfo={day} />
        ))}
      </WeekItem>
    )
  }
}

export default Week

const WeekItem = styled.div`
  padding: 0px;
`
