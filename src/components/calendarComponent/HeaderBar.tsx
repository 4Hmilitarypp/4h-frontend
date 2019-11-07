import * as React from 'react'
import styled from 'styled-components/macro'

interface ICalendarState {
  date: Date
}
interface IHeaderProps {
  updateMonths: { prevMonth: () => void; nextMonth: () => void }
  dateInfo: ICalendarState
}

class HeaderBar extends React.Component<IHeaderProps, any> {
  render() {
    return (
      <Header>
        <HeaderNavigation>
          <NavigationItem>
            <LeftArrow onClick={this.props.updateMonths.prevMonth}>&lt;&lt;</LeftArrow>
          </NavigationItem>
          <NavigationItem>
            <HeaderTitle>
              {this.props.dateInfo.date.toLocaleString('default', { month: 'short' })}{' '}
              {this.props.dateInfo.date.toLocaleString('default', { year: 'numeric' })}
            </HeaderTitle>
          </NavigationItem>
          <NavigationItem>
            <RightArrow onClick={this.props.updateMonths.nextMonth}>&gt;&gt;</RightArrow>
          </NavigationItem>
        </HeaderNavigation>
      </Header>
    )
  }
}

export default HeaderBar

const LeftArrow = styled.p`
  padding: 0 100px 0 0;
  text-decoration: none;
  font-weight: bold;
  color: white;
  filter: drop-shadow(3px 3px 2px black);
  &:hover {
    filter: drop-shadow(6px 6px 2px black);
  }
`
const RightArrow = styled.p`
  padding: 0 0 0 100px;
  text-decoration: none;
  font-weight: bold;
  color: white;
  filter: drop-shadow(3px 3px 2px black);
  &:hover {
    filter: drop-shadow(6px 6px 2px black);
  }
`
const HeaderTitle = styled.h1`
  font-family: sans-serif;
  font-size: 25px;
  color: white;
`
const HeaderNavigation = styled.ul`
  display: inline-block;
  padding: 0px;
`
const NavigationItem = styled.li`
  list-style: none;
  display: inline-block;
  padding: 2px;
`
const Header = styled.div`
  padding: 5px;
  background-color: #339866;
  text-align: center;
  width: 420px;
`
