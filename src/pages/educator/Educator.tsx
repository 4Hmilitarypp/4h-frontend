import { RouteComponentProps, Router } from '@reach/router'
import * as React from 'react'
import EducatorHome from './EducatorHome'
import Researches from './research/Researches'
import Resource from './resources/Resource'
import Resources from './resources/Resources'
import Webinars from './webinars/Webinars'

const Educator: React.FC<RouteComponentProps> = () => (
  <Router>
    <EducatorHome path="/" />
    <Webinars path="webinars/*" />
    <Researches path="research/*" />
    <Resources path="resources/*" />
    <Resource path="resources/:slug" />
  </Router>
)
export default Educator
