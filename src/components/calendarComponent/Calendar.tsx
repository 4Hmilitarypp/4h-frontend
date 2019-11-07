import * as React from 'react'
import styled from 'styled-components/macro'
import HeaderBar from './HeaderBar'
import Week from './Week'

interface ICalendarState {
  date: Date
}

class Calendar extends React.Component<any, ICalendarState> {
  constructor(props: any) {
    super(props)
    const date = new Date()
    const current = new Date(date.getFullYear(), date.getMonth(), date.getDay())
    this.state = { date: current }

    this.nextMonth = this.nextMonth.bind(this)
    this.prevMonth = this.prevMonth.bind(this)
    this.getDaysInMonth = this.getDaysInMonth.bind(this)
    this.buildWeeks = this.buildWeeks.bind(this)
  }
  nextMonth() {
    this.setState({
      date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, this.state.date.getDay()),
    })
  }
  prevMonth() {
    this.setState({
      date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1, this.state.date.getDay()),
    })
  }
  getDaysInMonth(month: number, year: number) {
    const date = new Date(Date.UTC(year, month, 1))
    const days: Date[] = []
    while (date.getMonth() === month - 1) {
      days.push(new Date(date))
      date.setDate(date.getDate() - 1)
    }
    return days
  }
  buildWeeks(days: Date[]) {
    const weeks: Date[][] = []
    let counter = 0
    let j = 0
    for (const day of days) {
      if (counter === 0) {
        weeks[j] = []
      }
      weeks[j].push(day)
      counter++
      if (counter === 7) {
        counter = 0
        j++
      }
    }
    return weeks
  }
  render() {
    return (
      <CalendarItem>
        <HeaderBar dateInfo={this.state} updateMonths={{ prevMonth: this.prevMonth, nextMonth: this.nextMonth }} />
        {this.buildWeeks(
          this.getDaysInMonth(this.state.date.getMonth() + 1, this.state.date.getFullYear()).reverse()
        ).map(week => (
          <Week weekInfo={week} key={week[0].toLocaleDateString()} />
        ))}
      </CalendarItem>
    )
  }
}
export default Calendar

const CalendarItem = styled.div`
  display: inline-block;
  border: 1px solid red;
  margin: 0 auto;
  padding: 50px 50px;
`
