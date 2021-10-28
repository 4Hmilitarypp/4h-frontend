import { Link as UnstyledLink, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button } from '../components/Elements'
import Icon from '../components/Icon'
import { elevation, media, transition } from '../utils/mixins'
import DropdownBackground from './DropdownBackground'
import LinkGroup from './LinkGroup'

const DropdownLink: React.FC = props => <UnstyledLink to="./" tabIndex={0} {...props} />

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
  const backgroundManagement = {
    setCoords: setBackgroundCoords,
    setOpen: setBackgroundOpen,
    navRef,
    hamburgerActive,
  }

  return (
    <>
      <DropdownBackground {...backgroundCoords} open={backgroundOpen} />
      <HeaderContainer>
        <Heading to="/" data-testid="main-logo">
          <Title>
            <TitleWords>4-H Military</TitleWords>
            <TitleWords>Partnership</TitleWords>
          </Title>
          <Logo src="https://res.cloudinary.com/four-hmpp/image/upload/v1542786198/logos/4h-logo.png" alt="4-H Logo" />
        </Heading>
        <Links ref={navRef as any} className={hamburgerActive ? 'mobile' : ''}>
          <HomeLink to="/" onClick={() => setHamburgerActive(false)}>
            Home
          </HomeLink>
          <LinkGroup title="About Us" to="/about" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/about" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>About 4-H Military Partnership</LinkTitle>
              <LinkDescription>Learn about the 4-H Military Partnership</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/4-h-club" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>About 4-H Club</LinkTitle>
              <LinkDescription>Learn about 4-H club in general</LinkDescription>
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
          <LinkGroup title="For Military Families" to="/about" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/events/camps" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Upcoming Camps</LinkTitle>
              <LinkDescription>There are dozens of camps youth can attend</LinkDescription>
            </StyledDropdownLink>
            <StyledPublicDropdownLink
              href="https://www.4-hmilitarypartnership.org/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setHamburgerActive(false)}
            >
              <LinkTitle>Connect with a state liaison</LinkTitle>
              <LinkDescription>Go to an external site to get connected with the liaison closest to you</LinkDescription>
            </StyledPublicDropdownLink>
            <StyledDropdownLink to="/find-a-liaison" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Services available for OCONUS families</LinkTitle>
              <LinkDescription>Connect with a liaison who support OCONUS families</LinkDescription>
            </StyledDropdownLink>
            <StyledPublicDropdownLink
              href="https://4-h.org/find/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setHamburgerActive(false)}
            >
              <LinkTitle>Find 4-H in my area</LinkTitle>
              <LinkDescription>Go to an external site to find 4-H clubs in your area</LinkDescription>
            </StyledPublicDropdownLink>
          </LinkGroup>
          <LinkGroup title="For Staff & Volunteers" to="/about" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/resources/educator-resources" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Resources / Curriculum</LinkTitle>
              <LinkDescription>Find the educating resources and curriculums you need</LinkDescription>
            </StyledDropdownLink>
          </LinkGroup>
          <LinkGroup title="For 4-H Military Liaisons" to="/about" manageBackground={backgroundManagement}>
            <StyledDropdownLink to="/contact-us" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Join our ListServ</LinkTitle>
              <LinkDescription>Receive 4-H Military Partnership updates</LinkDescription>
            </StyledDropdownLink>
            <StyledDropdownLink to="/latest-news" onClick={() => setHamburgerActive(false)}>
              <LinkTitle>Latest News</LinkTitle>
              <LinkDescription>Latest News from 4-H Military Partnership</LinkDescription>
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
      </HeaderContainer>
    </>
  )
}
export default Header

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 122rem;
  padding: 0 2rem;
  margin: 0 auto;
  ${media.tabletPort`
    padding: 1rem 2rem;
    justify-content: space-between;
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
  margin-left: 4.8rem;
  ${media.desktop`
    margin-left: 2rem;
  `}
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
const StyledPublicDropdownLink = styled.a`
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
