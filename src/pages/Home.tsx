import { Link, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button, P, SubHeading } from '../components/Elements'
import Icon from '../components/Icon'
import { elevation, media, transition } from '../utils/mixins'

const Home: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  return (
    <div>
      <HeroOverlay>
        <HeroImg
          src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_2080,h_1560,c_fill/v1549142846/team-huddle-edit.jpg"
          alt="a team in a huddle"
        />
      </HeroOverlay>
      <HeroText name="4-hMilitaryPartnerships" />
      <Vision>
        <VisionHeading>
          Military readiness through 4-H positive youth development for youth, families, and communities
        </VisionHeading>
      </Vision>
      <Mission>
        <MissionImg
          src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,h_800,w_600/v1549244332/Baggott-Avery-20180629_140829.jpg"
          alt="3 kids picking peaches"
        />
        <MissionText>
          <MissionSubHeading>Who We Are</MissionSubHeading>
          <MissionP>
            A collaboration of military and Land Grant University partners who intentionally integrate research-based
            programs and resources for military-connected youth, families, and communities to thrive.
          </MissionP>
          <MissionSubHeading>What We Do</MissionSubHeading>
          <MissionP>
            4-H Military Partnerships focuses on positive youth development through providing opportunities for youth to
            engage in intentional learning experiences. We partner with 4-H educators to provide them the training and
            resources they need to succeed in equipping the next generation of leaders
          </MissionP>
          <MissionSubHeading>Why We Do It</MissionSubHeading>
          <MissionP>
            As military families move frequently and experience the difficulties surrounding deployment and
            reintegration, 4-H provides predictable programming and a safe and nurturing environment for military
            connected children and youth to excel.
          </MissionP>
        </MissionText>
      </Mission>
      <FeaturedSection>
        <FeaturedTitle>It's Purple Up Month!</FeaturedTitle>
        <FeaturedText>
          The month of April provides an opportunity to recognize and honor the service of our youngest heroes, military
          children. Established by former Secretary of Defense Caspar Weinberger in 1986, the designation of April as
          the Month of the Military Child acknowledges the significant role military youth play in our communities. They
          are resilient and take pride in their service to our Country. They deserve our appreciation and support.
        </FeaturedText>
        <FeaturedImage
          src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_1200,h_800/v1555224324/purple-up-poster.jpg"
          alt="a purple up poster"
        />
      </FeaturedSection>
      <CardLinksHeading>Take a Look Around!</CardLinksHeading>
      <CardLinks>
        <CardLink to="about">
          <Card>
            <CardImageOverlay>
              <CardImage
                src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_350,h_225,c_fill/v1549242318/CT_Subase_Youth_Center_in_the_Big_E_parade.jpg"
                alt="a few kids holding a 4-H club sign"
              />
            </CardImageOverlay>
            <CardText>What is 4-H Military Partnerships?</CardText>
          </Card>
          <CardArrow>></CardArrow>
        </CardLink>
        <CardLink to="events">
          <Card>
            <CardImageOverlay>
              <CardImage
                src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_350,h_225,c_fill/v1549142849/rock-climbing.jpg"
                alt="a teen rock climbing"
              />
            </CardImageOverlay>
            <CardText>View Our Upcoming Events</CardText>
          </Card>
          <CardArrow>></CardArrow>
        </CardLink>
        <CardLink to="4-h-club">
          <Card>
            <CardImageOverlay>
              <CardImage
                src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_350,h_225,c_fill/v1549242318/HI_catlin.jpg"
                alt="3 kids holding paper that reads 'I (heart) (4-h logo)'"
              />
            </CardImageOverlay>
            <CardText>Learn About 4-H Club</CardText>
          </Card>
          <CardArrow>></CardArrow>
        </CardLink>
        <CardLink to="find-a-liaison">
          <Card>
            <CardImageOverlay>
              <CardImage
                src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_350,h_225,c_fill/v1549242703/DSC_0017.jpg"
                alt="several adults helping a student color"
              />
            </CardImageOverlay>
            <CardText>Contact Your State's Liaison</CardText>
          </Card>
          <CardArrow>></CardArrow>
        </CardLink>
        <CardLink to="resources">
          <Card>
            <CardImageOverlay>
              <CardImage
                src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto,w_350,h_225,c_fill/v1549241806/DSC_0009.jpg"
                alt="a man in an air-force uniform teaching some kids"
              />
            </CardImageOverlay>
            <CardText>View 4-H Military Partnerships Resources</CardText>
          </Card>
          <CardArrow>></CardArrow>
        </CardLink>
      </CardLinks>
      <Footer>
        <FooterSubHeading1>Have any Questions?</FooterSubHeading1>
        <FooterSubHeading2>Please feel free to contact us!</FooterSubHeading2>
        <ContactButton as={Link} to="contact-us">
          Contact Us
        </ContactButton>
      </Footer>
    </div>
  )
}
export default Home

const HeroText = styled(Icon)`
  font-family: Acme;
  position: absolute;
  top: 9.4rem;
  left: 0;
  right: 0;
  z-index: 3;
  margin: 0 auto;
  ${media.tabletLand`
    height: 5.5rem;
    top: 8rem;
  `}
  ${media.tabletPort`
    width: 90%;
  `}
`
const HeroOverlay = styled.div`
  &::after {
    display: block;
    position: relative;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%);
    margin-top: calc(-80vh + 6.8rem);
    height: calc(80vh - 6.8rem);
    width: 100%;
    content: '';
  }
`
const HeroImg = styled.img`
  width: 100%;
  height: calc(80vh - 6.8rem);
  object-fit: cover;
  object-position: center;
  display: block;
`
const Vision = styled.div``
const VisionHeading = styled(SubHeading)`
  max-width: 75rem;
  line-height: 1.5;
  margin: 2.4rem auto;
  ${media.tabletLand`
    margin: 2rem 1.2rem;
    font-size: 2rem;
  `}
`
const Mission = styled.div`
  display: flex;
  padding: 4.8rem 2.4rem;
  justify-content: center;
  ${media.tabletLand`
    padding: 0;
  `}
`
const MissionImg = styled.img`
  max-width: 40%;
  align-self: center;
  ${elevation(4)};
  border-radius: 5px;
  ${media.tabletLand`
    display: none;
  `}
`
const MissionSubHeading = styled(SubHeading)`
  ${media.tabletLand`
padding: 2rem 0 2rem;

`}
`
const MissionText = styled.div`
  padding-left: 3.6rem;
  max-width: 70rem;
  ${media.tabletLand`
    padding: 0 1.6rem;
    text-align: center;
  `}
`
const MissionP = styled.p`
  font-size: 2rem;
  padding-bottom: 2.4rem;
  ${media.tabletLand`
    font-size: 1.6rem;
    padding-bottom: 1.8rem;
  `}
`
const FeaturedSection = styled.div`
  padding-bottom: 3.6rem;
  ${media.tabletPort`
    padding-bottom: 0rem;
  `}
`
const FeaturedText = styled(P)`
  max-width: 60rem;
  font-size: 1.8rem;
  margin: 0 auto;
  padding: 0 2.4rem 3.6rem;
  ${media.tabletLand`
    font-size: 1.6rem;
    padding-bottom: 2.4rem;
    text-align: center;
  `}
`
const FeaturedTitle = styled(SubHeading)``
const FeaturedImage = styled.img`
  max-width: 80%;
  margin: 0 auto;
  display: block;
  object-fit: cover;
  border-radius: 5px;
  ${media.tabletPort`
    border-radius: 0px;
    width: 100%;
  `}
`
const CardLinksHeading = styled(SubHeading)`
  font-size: 3.6rem;
`
const CardLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
const CardImageOverlay = styled.div`
  &::after {
    display: block;
    position: relative;
    background: linear-gradient(180deg, #0000 50%, rgba(0, 0, 0, 0.4) 100%);
    margin-top: -225px;
    height: 225px;
    content: '';
    border-radius: 5px 0 0 5px;
    ${transition({ name: 'easeOutCubic' })};
  }
`
const CardLink = styled(Link)`
  display: inline-flex;
  margin: 0 1.6rem 3.2rem;
  ${elevation(4)};
  &:hover ${CardImageOverlay}::after {
    background: linear-gradient(180deg, #0000 50%, rgba(0, 0, 0, 0.4) 100%), hsla(150, 80%, 28%, 0.3);
  }
`
const Card = styled.div`
  width: 350px;
  position: relative;
  display: inline-block;
  ${media.phone`
    width: 300px;
  `}
`
const CardImage = styled.img`
  width: 350px;
  height: 225px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px 0 0 5px;
  display: block;
  ${media.phone`
    width: 300px;
  `}
`
const CardText = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: ${props => props.theme.white};
  bottom: 8px;
  text-shadow: 0 1px 0 black;
  font-weight: 500;
`
const CardArrow = styled.div`
  width: 2rem;
  color: ${props => props.theme.white};
  background: ${props => props.theme.primary};
  border-radius: 0 5px 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Footer = styled.div`
  background: ${props => props.theme.primaryLight};
  padding: 2.4rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: 3.6rem;
  ${media.tabletLand`
    flex-direction: column;
    align-items: center;
  `}
`
const FooterSubHeading1 = styled(SubHeading)`
  ${media.tabletLand`
    font-size: 2rem;
    padding: 0rem;
  `}
`
const FooterSubHeading2 = styled(SubHeading)`
  padding-left: 0.8rem;
  ${media.tabletLand`
  padding-top: 1.2rem;
    font-size: 2rem;
  `}
`
const ContactButton: any = styled(Button)`
  margin: 0 3.6rem;
  white-space: nowrap;
`
