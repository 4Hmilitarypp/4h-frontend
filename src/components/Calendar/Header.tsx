import React from 'react'
import { IHeaderProps } from '../../sharedTypes'

class Header extends React.Component<IHeaderProps, {}> {
  render() {
    return (
      <div className="Header">
        <button className="Control" onClick={() => this.props.changeMonth(this.props.date, -1)} id="PrevMonth">
          &lt;&lt;
        </button>
        <h1 id="MainHeader">
          {this.props.date.toLocaleString('default', { month: 'short' })} {this.props.date.getFullYear()}
        </h1>
        <button className="Control" onClick={() => this.props.changeMonth(this.props.date, 1)} id="NextMonth">
          &gt;&gt;
        </button>
      </div>
    )
  }
}

export default Header
