import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import {
  Heading,
  Link,
  P,
  PageWrapper,
  Section,
  SubHeading,
} from '../../components/Elements';

const EducatorHome: React.FC<RouteComponentProps> = () => (
  <PageWrapper>
    <Section>
      <Heading>Welcome Educators!</Heading>
      <P>
        As an Educator/Staff Member, there are a number of resources to support
        4-H clubs on installations world-wide and 4-H clubs and opportunities in
        communities. If you’re just learning about 4-H, the 4-H 101: The Basics
        of Starting 4-H Clubs curriculum will be your resource for understanding
        4-H. If you’re already involved with 4-H clubs, there are a number of
        curriculum resources for 4-H projects with children and youth. The
        Research section highlights studies involving military youth and
        families as well as positive youth
        <Link to="/find-a-liaison"> Extension 4-H Military Liaison</Link>.
      </P>
    </Section>
    <Section>
      <SubHeading>Online Resources</SubHeading>
      <P>
        <b>Webinars: </b>
        We have <Link to="./webinars">recorded webinars</Link> you can listen
        to.
      </P>
      <P>
        <b>Research: </b>
        There is an abundance of research 4-H affiliates have undertaken and
        those resources are all available
        <Link to="./research"> here</Link>
      </P>
      <P>
        <b>Resources: </b>Over the years different instructors have presented on
        different topics. We now have a centralized archive of these
        <Link to="./resources"> teaching materials</Link>.
      </P>
    </Section>
  </PageWrapper>
);
export default EducatorHome;
