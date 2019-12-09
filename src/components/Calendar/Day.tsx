import React from 'react'
import { IDayProps, IDayState } from '../../sharedTypes'

class Day extends React.Component<IDayProps, IDayState> {
  state: IDayState = {
    events: [],
  }
  render() {
    return (
      <div className="Day" onClick={this.props.onClick}>
        <p>
          {this.props.date.toLocaleString('default', { weekday: 'short' })} {this.props.date.getDate()}
        </p>
      </div>
    )
  }
}

export default Day
