import { RouteComponentProps, Router } from '@reach/router'
import * as React from 'react'
import EducatorHome from './EducatorHome'
import Researches from './research/Researches'
import Resource from './resources/Resource'
import Resources from './resources/Resources'
import ManciniBio from './webinars/manciniWebinar/ManciniBio'
import ManciniResources from './webinars/manciniWebinar/ManciniResources'
import OnealBio from './webinars/manciniWebinar/OnealBio'
import Webinars from './webinars/Webinars'

const Educator: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  return (
    <Router>
      <EducatorHome path="/" />
      <ManciniBio path="webinars/mancini-bio" />
      <OnealBio path="webinars/oneal-bio" />
      <ManciniResources path="webinars/mancini-resources" />
      <Webinars path="webinars/*" />
      <Researches path="research/*" />
      <Resources path="resources/*" />
      <Resource path="resources/:slug" />
    </Router>
  )
}
export default Educator
