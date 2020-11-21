import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Calendar, Event, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import useErrorHandler from '../../hooks/useErrorHandler'
import styled from 'styled-components/macro'
import api from '../../utils/api'

const localizer = momentLocalizer(moment)

const EventsCalendar: React.FC<RouteComponentProps> = () => {
  const [eventsList, setEventsList] = React.useState<Event[]>([])
  const handleError = useErrorHandler()
  React.useEffect(() => {
    api.camps
      .get()
      .then(p => {
        setEventsList(p)
      })
      .catch(handleError)
  }, [])
  return (
    <CalendarContainer>
      <Calendar localizer={localizer} events={eventsList} startAccessor="start" endAccessor="end" />
    </CalendarContainer>
  )
}

export default EventsCalendar

const CalendarContainer = styled.div`
  display: block;
  height: 65rem;
`
