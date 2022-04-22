import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import {
  Heading,
  Link,
  P,
  PageWrapper,
  Section,
} from '../../components/Elements';

const EducatorHome: React.FC<RouteComponentProps> = () => (
  <PageWrapper>
    <Section>
      <Heading>Camps, Training Sessions, and Photos!</Heading>
      <P>
        <Link to="camps">Check out our upcoming camps</Link>.
      </P>
      <P>
        <Link to="calendar">See a calendar of our upcoming events</Link>.
      </P>
    </Section>
  </PageWrapper>
);
export default EducatorHome;
