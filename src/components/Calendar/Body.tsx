import React from 'react'
import { IBodyProps } from '../../sharedTypes'
import Day from './Day'

class Body extends React.Component<IBodyProps, {}> {
  render() {
    return (
      <div className="Body">
        {this.props.days.map(day => (
          <Day key={day.dateInfo.toDateString()} date={day.dateInfo} onClick={() => null} />
        ))}
      </div>
    )
  }
}

export default Body
