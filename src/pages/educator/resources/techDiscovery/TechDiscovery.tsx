import { RouteComponentProps, Router } from '@reach/router'
import * as React from 'react'
import NotFound from '../../../NotFound'
import TechDiscoveryHome from './TechDiscoveryHome'

const TechDiscovery: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  return (
    <Router>
      <TechDiscoveryHome path="/" />
      <ManciniBio path="webinars/mancini-bio" />
      <OnealBio path="webinars/oneal-bio" />
      <ManciniResources path="webinars/mancini-resources" />
      <Webinars path="webinars/*" />
      <Researches path="research/*" />
      <TechDiscovery path="educator-resources/tech-discovery/*" />
      <Resources path="educator-resources/*" />
      <Resource path="educator-resources/:slug" />
      <NotFound default={true} />
    </Router>
  )
}
export default TechDiscovery
