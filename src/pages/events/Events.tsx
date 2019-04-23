import { RouteComponentProps, Router } from '@reach/router'
import * as React from 'react'
import NotFound from '../NotFound'
import Camps from './Camps'
import EventsHome from './EventsHome'
const Educator: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  return (
    <Router>
      <EventsHome path="/" />
      <Camps path="camps" />
      <NotFound default={true} />
    </Router>
  )
}
export default Educator
