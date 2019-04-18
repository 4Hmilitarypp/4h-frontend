import { Link as UnstyledLink, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button } from '../components/Elements'
import Icon from '../components/Icon'
import { elevation, media, transition } from '../utils/mixins'
import DropdownBackground from './DropdownBackground'
import LinkGroup from './LinkGroup'

const DropdownLink: React.FC = props => <UnstyledLink tabIndex={0} {...props} />

const Header: React.FC<RouteComponentProps> = () => {
  const [backgroundCoords, setBackgroundCoords] = React.useState({
    height: 100,
    left: 0,
    top: 0,
    width: 100,
  })
  const [backgroundOpen, setBackgroundOpen] = React.useState(false)
  const [hamburgerActive, setHamburgerActive] = React.useState(false)
  const navRef = React.useRef<HTMLDivElement>(null)
  const backgroundManagement = { setCoords: setBackgroundCoords, setOpen: setBackgroundOpen, navRef, hamburgerActive }

  return (
    <>
      <DropdownBackground {...backgroundCoords} open={backgroundOpen} />
      <HeaderContainer>
        <Heading to="/" data-testid="main-logo">
          <Title>
            <TitleWords>4-H Military</TitleWords>
            <TitleWords>Partnerships</TitleWords>
          </Title>
          <Logo src="https://res.cloudinary.com/four-hmpp/image/upload/v1542786198/logos/4h-logo.png" alt="4-H Logo" />
        </Heading>
        <Links ref={navRef as any} className={hamburgerActive ? 'mobile' : ''}>
          <HomeLink to="/" onClick={() => setHamburgerActive(false)}>
            Home
          </HomeLink>
          <LinkGroup title="About Us" to="/about" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/about" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>About Us</LinkTitle>
              <LinkDescription>Learn about the 4-H Military Partnership</LinkDescription>
            </StyledDropdownLink>
          </LinkGroup>
          <LinkGroup title="Events" to="/events/" manageBackground={backgroundManagement}>
            {/* <StyledDropdownLink to="/events/#past-events" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Past Events</LinkTitle>
              <LinkDescription>Check out some of the past events we have sponsored</LinkDescription>
            </StyledDropdownLink> */}
            <StyledDropdownLink to="/events" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Upcoming Events</LinkTitle>
              <LinkDescription>Get involved with one of our upcoming events</LinkDescription>
            </StyledDropdownLink>
            {/* <StyledDropdownLink to="/photos" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Photos</LinkTitle>
              <LinkDescription>View some of the photos taken at our fun events</LinkDescription>
            </StyledDropdownLink> */}
          </LinkGroup>
          <LinkGroup title="4-H Club" to="/4-h-club" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/4-h-club" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>About</LinkTitle>
              <LinkDescription>Learn about 4-H club in general</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="4-h-club/get-involved" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Get Involved</LinkTitle>
              <LinkDescription>Learn how to join 4-H or make an impact through becoming a volunteer</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink as="a" href="https://4-h.org" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>4-H Website</LinkTitle>
              <LinkDescription>Check out the 4-H official website</LinkDescription>
            </StyledDropdownLink>
          </LinkGroup>
          <LinkGroup title="Educators" to="/educators" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/educators" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>General Info</LinkTitle>
              <LinkDescription>Learn about your role as an educator</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/educators/webinars" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Webinars</LinkTitle>
              <LinkDescription>Watch recorded webinars</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/educators/research" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Research</LinkTitle>
              <LinkDescription>Read up on some relevant research articles</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/educators/resources" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Resources</LinkTitle>
              <LinkDescription>Find the educating resources you need</LinkDescription>
            </StyledDropdownLink>
          </LinkGroup>
          <LinkGroup title="Connect" to="/find-a-liaison" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/find-a-liaison" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>What is a Liaison?</LinkTitle>
              <LinkDescription>Learn about how our liaisons can assist you</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/find-a-liaison" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Find A Liaison</LinkTitle>
              <LinkDescription>Get connected with the liaison closest to you</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/partners" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Partners List</LinkTitle>
              <LinkDescription>View all of the partners affiliated with 4-H</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/contact-us" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Contact Us</LinkTitle>
              <LinkDescription>Send us a message to answer any questions</LinkDescription>
            </StyledDropdownLink>
          </LinkGroup>
        </Links>
        <MobileMenu>
          <ContactButton as={UnstyledLink} to="contact-us">
            Contact Us
          </ContactButton>
          <Hamburger name="menu" height={24} onClick={() => setHamburgerActive(!hamburgerActive)} />
          {hamburgerActive && <HamburgerClickOverlay onClick={() => setHamburgerActive(false)} />}
        </MobileMenu>
        <Spacer />
      </HeaderContainer>
    </>
  )
}
export default Header

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 122rem;
  padding: 0 2rem;
  margin: 0 auto;
  ${media.tabletPort`
    padding: 1rem 2rem;
  `}
`
const Heading = styled(UnstyledLink)`
  color: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  padding: 0.4rem;
`
const Title = styled.div`
  font-weight: 700;
`
const TitleWords = styled.span`
  line-height: 1.4;
  display: block;
  ${media.tabletLand`
    line-height: 1.1;
  `}
`
const Logo = styled.img`
  height: 4.2rem;
  padding-left: 2rem;
  ${media.tabletLand`
    height: 3.6rem;
  `}
`
const Links: any = styled.nav`
  display: inline-flex;
  align-items: center;
  ${media.tabletPort`
    display: none;
  `}
  &.mobile {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    top: 6.4rem;
    left: 0;
    z-index: 5000;
    background: hsl(0, 0%, 100%);
    padding: 1.6rem 0 0.8rem;
    border-top: 2px solid hsl(150, 39%, 27%);
    ${elevation(4)}
  }
`
const HomeLink = styled(UnstyledLink)`
  color: ${props => props.theme.secondary};
  font-size: 1.8rem;
  font-weight: 500;
  padding: 0.4rem;
  margin: 0 0.4rem;
  &:hover {
    opacity: 0.8;
  }
  ${media.tabletLand`
    font-size: 1.6rem;
  `}
  ${media.tabletPort`
    margin: 0rem;
    padding: 1.2rem .8rem 1.2rem 2.8rem;
    width: 100%;
    &:hover {
      opacity: 1;
      color: hsl(150, 6%, 31%);
    }
  `}
`
const LinkTitle = styled.p`
  font-weight: 700;
  color: ${props => props.theme.primary};
  ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.2 })};
  ${media.tabletPort`
    font-weight: 500;
    margin-top: -.8rem;
  `}
`
const StyledDropdownLink: any = styled(DropdownLink)`
  display: block;
  padding: 0.4rem;
  &:not(:first-child) {
    padding-top: 1.2rem;
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    ${LinkTitle} {
      color: ${props => props.theme.primaryGrey} !important;
    }
  }
  &:nth-child(2n + 1) {
    ${LinkTitle} {
      color: ${props => props.theme.secondary};
    }
  }
  ${media.tabletPort`
    padding: 0.8rem 1.6rem .8rem 4rem;
  `}
`
const LinkDescription = styled.p`
  color: hsl(150, 4%, 53%);
  font-weight: 400;
  padding-left: 1.5rem;
  padding-top: 0;
  ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.2 })};
`
const Spacer = styled.div`
  width: 10rem;
  ${media.tabletLand`
    width: 0;
  `}
  ${media.tabletPort`
    display: none;
  `}
`
const MobileMenu = styled.div`
  display: none;
  ${media.tabletPort`
    display: flex;
    align-items: center;
  `}
`
const ContactButton: any = styled(Button)`
  margin: 0 1.2rem;
  white-space: nowrap;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  ${media.phone`
    display: none;
  `}
`
const Hamburger = styled(Icon)``

const HamburgerClickOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 4999;
`
