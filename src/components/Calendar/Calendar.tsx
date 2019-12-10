import React from 'react'
import '../../assets/styles/index.css'
import { ICalendarState, IDayItem } from '../../sharedTypes'
import Body from './Body'
import Header from './Header'

class Calendar extends React.Component<{}, ICalendarState> {
  state: ICalendarState = {
    date: new Date(),
  }
  changeMonth = (currentDate: Date, shift: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + shift, currentDate.getDate())
    this.setState({ date: newDate })
  }
  getDateInfo(month: number, year: number): IDayItem[] {
    const days = []
    const daysInMonth = new Date(year, month, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      const newDay = new Date(year, month - 1, i)
      days.push({ dateInfo: newDay, events: [] })
    }
    if (days[0].dateInfo.getDay() !== 0) {
      let day = new Date(days[0].dateInfo)
      while (day.getDay() !== 0) {
        day.setDate(day.getDate() - 1)
        days.unshift({ dateInfo: day, events: [] })
        day = new Date(days[0].dateInfo)
      }
    }
    return days
  }
  render() {
    const days = this.getDateInfo(this.state.date.getMonth() + 1, this.state.date.getFullYear())
    return (
      <div className="CalendarWrapper">
        <Header date={this.state.date} changeMonth={this.changeMonth} />
        <Body days={days} />
      </div>
    )
  }
}

export default Calendar
