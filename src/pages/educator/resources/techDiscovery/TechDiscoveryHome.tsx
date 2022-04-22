import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components/macro';
import UnstyledBackButton from '../../../../components/BackButton';
import {
  A,
  Heading,
  P,
  PageWrapper,
  Section,
  SubHeading,
} from '../../../../components/Elements';
import { media } from '../../../../utils/mixins';
import TechDiscoveryResources from './TechDiscoveryResources';

const TechDiscoveryHome: React.FC<RouteComponentProps> = () => (
  <PageWrapper>
    <HeaderWrapper>
      <UnstyledBackButton
        route={'/resources/educator-resources'}
        title="Resources"
      />
      <Heading>DoD-USDA Partnership: Tech Discovery Curriculum</Heading>
      <div style={{ width: 209 }} />
    </HeaderWrapper>
    <Section>
      <P>
        The Tech Discovery Curriculum is designed for 5th-12th grade military
        connected youth from all branches of service. It is focused on
        developing life skills and increased resiliency supporting military
        connected families during times of deployment and reintegration back
        into normal life. These educational experiences are designed to be
        delivered in group learning environments utilizing an experiential
        learning methodology. These experiences are a great support to youth
        development programs such as Yellow Ribbon; camps focused on military
        children, youth and families; Family Readiness Groups; etc. The
        curriculum includes 35 youth and family educational experiences that
        focus on building skills in Communication, Teamwork,
        Self-responsibility, Decision Making and Problem Solving while at the
        same time supporting enhancement of youth resilience in their emotional,
        social, family and spiritual (their set of beliefs, principles and
        values that give them strength) realms.
      </P>
      <P>
        The Tech Discovery activity plans are only available on-line. Each state
        and territory has received 1-2 Tech Discovery Tool Kits that are
        accessible to community and military partners who will be implementing
        the Tech Discovery curriculum. Tool Kits provide most of the durable
        goods needed to implement these educational experiences. Priority in
        scheduling use of the Tech Discovery Tool Kits is to be given to
        supporting military connected youth with a parent from the Reserve
        Component / geographically dispersed.
      </P>
      <P>
        NOTE: Because of the more technical context of these activities,
        volunteers and staff leading the activities will need a fair amount of
        planning and preparation time. Please plan accordingly. Additional
        supplies not found in the Tech Discovery Tool Kits will have to be
        secured as well.
      </P>
    </Section>
    <TechDiscoveryResources />
    <Section>
      <P>
        The DoD-USDA Partnership: Tech Discovery Curriculum was developed at the
        University of Minnesota Extension Center for Youth Development through a
        partnership of the Department of Defense, Office of the Secretary of
        Defense, Military Community & Family Policy, Office of Family
        Policy/Children and Youth and the United States Department of
        Agriculture, National Institute of Food and Agriculture, Institute of
        Youth, Family and Community, 4-H National Headquarters under Kansas
        State University special project number 2010-48713-21882.
      </P>
      <P>
        The University of Minnesota Extension is committed to the policy that
        all persons shall have equal access to its programs, facilities, and
        employment without regard to race, color, creed, religion, national
        origin, sex, age, marital status, disability, public assistance status,
        veteran status, or sexual orientation. UMN logo 4-H Clover
      </P>
      <P>
        © 2012, 2014 Regents of the University of Minnesota. Rights reserved by
        Department of Defense, USDA/NIFA.
      </P>
    </Section>
    <Section>
      <SubHeading>What's Going On?</SubHeading>
      <P>
        Youth campers at the Arizona Career pathfinders Camp describe their
        experience using tools from the Tech Discovery Curriculum. Check out
        these videos from camp.
      </P>

      <P>
        <A href="https://www.youtube.com/watch?v=TJxAkf9IlmM">
          https://www.youtube.com/watch?v=TJxAkf9IlmM
        </A>
      </P>

      <P>
        <A href="https://www.youtube.com/watch?v=n1axGf_Szb4">
          https://www.youtube.com/watch?v=n1axGf_Szb4
        </A>
      </P>
    </Section>
  </PageWrapper>
);
export default TechDiscoveryHome;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.2rem;
  ${media.tabletLand`
    flex-direction: column;
    padding: 0;
  `}
`;
