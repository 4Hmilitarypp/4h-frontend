import { RouteComponentProps, Router } from '@reach/router';
import * as React from 'react';
import Resource from '../Resource';
import TechDiscoveryHome from './TechDiscoveryHome';

const TechDiscovery: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), []);
  return (
    <Router>
      <TechDiscoveryHome path="/" />
      <Resource
        path="/:slug"
        backButtonRoute="/resources/educator-resources/tech-discovery"
      />
    </Router>
  );
};
export default TechDiscovery;
