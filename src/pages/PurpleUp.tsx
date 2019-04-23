import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components'
import { P, Section, SubHeading } from '../components/Elements'
import { elevation, media } from '../utils/mixins'

const PurpleUp: React.FC<RouteComponentProps> = () => (
  <Section>
    <SubHeading>Purple Up! for Military Kids</SubHeading>
    <Img
      src="https://res.cloudinary.com/four-hmpp/image/upload/v1556049706/logos/purple-up-logo.png"
      alt="Purple Up Logo"
    />
    <P>
      The month of April provides an opportunity to recognize and honor the service of our youngest heroes, military
      children. Established by former Secretary of Defense Caspar Weinberger in 1986, the designation of April as the
      Month of the Military Child acknowledges the significant role military youth play in our communities. They are
      resilient and take pride in their service to our Country. They deserve our appreciation and support.
    </P>
    <P>
      In 2011, the University of New Hampshire Cooperative Extension Military Youth and Family Program started the
      “Purple Up! for Military Kids” initiative that quickly gained momentum and is now celebrated nation-wide. Children
      in school and youth groups, employees in businesses and organizations, and everyone in the community is encouraged
      to wear purple on a specific day in April in honor of military kids. New Hampshire has chosen April 15 to be that
      special day, as long as it does not fall on a weekend.
    </P>
    <P />
    Wearing the color purple is a visible way to show support and thank military youth for their strength and
    sacrifices. Why purple? Purple is the color that symbolizes all branches of the military, as it is a combination of
    Army green, Marine Red, and Coast Guard, Air Force, and Navy blue. The goal of “Purple Up!” is for military youth to
    actually SEE the support in their school, youth groups, and the community!
  </Section>
)
export default PurpleUp
const Img = styled.img`
  width: 50%;
  margin: 0 auto 4rem;
  object-fit: cover;
  border-radius: 5px;
  display: block;
  ${elevation(4)};
  ${media.tabletLand`
    width: 90%:
    margin: 0;
    border-radius: 0;
  `}
`
