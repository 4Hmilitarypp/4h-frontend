import { Link as UnstyledLink, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { A, P, Section, SubHeading } from '../components/Elements'
import UnstyledIcon from '../components/Icon'
import useHash from '../hooks/useHash'
import { media } from '../utils/mixins'

const About: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  const historyRef = React.useRef<HTMLHeadingElement>(null)
  useHash({ refToFocus: historyRef, hash: '#history', location: window.location })
  return (
    <>
      <Section>
        <CustomSubHeading>What We Do</CustomSubHeading>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="link" height={32} width={32} />
          </Icons>
          <InlineP>
            4-H Military Partnerships creates opportunities and provides support to military connected youth whether
            they live on or near an installation, in our communities, or on overseas installations. 4-H clubs provide
            consistency in belonging and an opportunity to develop life skills through a positive youth development
            framework.
          </InlineP>
        </SubSection>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="heart" height={48} width={48} />
          </Icons>
          <InlineP>
            The 4-H Program is built upon four{' '}
            <CustomA href="http://www.4-h.org/resource-library/professional-development-learning/4-h-youth-development/youth-development/essential-elements/">
              Essential Elements
            </CustomA>{' '}
            ensuring that youth feel a sense of belonging in a safe environment, develop independence in both group and
            individual work, share with others in the community through generosity, and develop a sense of mastery that
            continues throughout life as they practice and share what they have learned with others.
          </InlineP>
        </SubSection>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="airplane" height={32} width={32} />
          </Icons>
          <InlineP>
            As military families move frequently and experience the difficulties surrounding deployment and
            reintegration, 4-H provides predictable programming and a safe and nurturing environment for military
            connected children and youth.
          </InlineP>
        </SubSection>
      </Section>
      <SectionLight>
        <CustomSubHeading>Who We Are</CustomSubHeading>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="medal" height={38} width={38} />
          </Icons>
          <InlineP>
            The 4-H Military Partnerships represent a collaboration of the U.S. Department of Agriculture (USDA),
            National Institute of Food and Agriculture and the U.S. Department of Defense, Military Community and Family
            Policy, Army Child, Youth and School Services, Air Force Child and Youth Programs, Navy Child and Youth
            Programs, Coast Guard, and National Guard Bureau.
          </InlineP>
        </SubSection>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="user-couple" height={32} width={32} />
          </Icons>
          <InlineP>
            Land Grant Universities partner with Active Duty installation programs and National Guard and Reserve to
            support children and youth in their local communities.
          </InlineP>
        </SubSection>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="chat-group-alt" height={32} width={32} />
          </Icons>
          <InlineP>
            The 4-H Military Partnerships rely on Land Grant University Extension faculty, the “Extension 4-H Military
            Liaison” to serve as a link between the State Cooperative Extension System, Military Service Branches, and
            4-H National Headquarters at USDA. The Liaison serves as a coordinator with these partners in support of
            research based programming for military connected children, youth, and families.
          </InlineP>
        </SubSection>
      </SectionLight>
      <SectionDark>
        <HelpfulHeading>Helpful Links</HelpfulHeading>
        <LinkSection>
          <LinksHeading>Military Family Members</LinksHeading>
          <Links>
            <LinkItem to="/find-a-liaison">
              Connect with your state 4-H office <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
            <LinkItem to="/events/">
              Current camp listings <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
            <LinkItem to="/partners">
              Information about our partners <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
          </Links>
        </LinkSection>
        <LinkSection>
          <LinksHeading>Educators or Volunteers with Military Families</LinksHeading>
          <Links>
            <LinkItem to="/resources/educator-resources">
              View curriculum resources <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
            <LinkItem to="/find-a-liaison/">
              Locate your 4-H office <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
            <LinkItem to="/partners">
              Information about our partners <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
          </Links>
        </LinkSection>
        <LinkSection>
          <LinksHeading>Extension 4-H Military Liaisons</LinksHeading>
          <Links>
            <LinkItem as="a" href="https://cms.4h.wendte.tech">
              Sign into the liaison section <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
            <LinkItem to="/resources/educator-resources">
              View curriculum resources <Chevron name="chevron-right-circle" width={20} height={20} />
            </LinkItem>
          </Links>
        </LinkSection>
      </SectionDark>
    </>
  )
}

export default About

const CustomA = styled(A)`
  color: ${props => props.theme.secondary};
`
const Icon = styled(UnstyledIcon)`
  position: absolute;
  right: 15px;
  bottom: 22px;
  .primary {
    fill: ${props => props.theme.secondaryMiddle};
  }
  .secondary {
    fill: ${props => props.theme.secondary};
  }
  &.icon-heart {
    right: 8px;
    bottom: 14px;
    .primary {
      fill: none;
    }
  }
  &.icon-medal {
    right: 11px;
    bottom: 15px;
  }
`
const Circle = styled(UnstyledIcon)`
  .circle {
    fill: ${props => props.theme.secondaryLight};
  }
`
const CustomSubHeading = styled(SubHeading)`
  color: ${props => props.theme.secondaryBlack};
`
const SubSection = styled.div`
  max-width: 66.2rem;
  margin: 0 auto;
  padding-bottom: 1.6rem;
  display: flex;
  align-items: center;
  ${media.tabletPort`
    flex-direction: column;
    padding: 0 1.6rem 1.6rem;
  `}
`
const SectionLight = styled.div`
  margin-top: 1.6rem;
  background: ${props => props.theme.secondaryBackground};
  padding-bottom: 1.6rem;
`
const Icons = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 4rem;
  ${media.tabletPort`
    margin: 0 0 .8rem;

  `}
`
const InlineP = styled(P)`
  display: inline-block;
  max-width: 58rem;
  color: ${props => props.theme.secondaryGrey};
`
const SectionDark = styled.div`
  background: ${props => props.theme.secondary};
  padding-bottom: 0.8rem;
  ${media.tabletPort`
    padding: 0 1.6rem;
  `}
`
const HelpfulHeading = styled(SubHeading)`
  color: ${props => props.theme.white};
`
const LinkSection = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  justify-content: left;
  max-width: 66.2rem;
  margin: 0 auto;
  border-top: 2px solid #7a5ba2;
  padding: 1.6rem 0 2.4rem;
  ${media.tabletPort`
    grid-template-columns: 1fr;
  `}
`
const LinksHeading = styled.h4`
  color: ${props => props.theme.white};
  font-weight: 700;
  max-width: 32rem;
  font-size: 2rem;
  line-height: normal;
  ${media.tabletPort`
    padding: .8rem 0;
  `}
`
const Links = styled.div``
const LinkItem: any = styled(UnstyledLink)`
  font-size: 1.8rem;
  display: block;
  color: ${props => props.theme.white};
  line-height: normal;
  &:not(:last-child) {
    padding-bottom: 0.8rem;
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  ${media.tabletPort`
    font-size: 1.4rem;
  `}
`
const Chevron = styled(UnstyledIcon)`
  position: relative;
  top: 5px;
  right: 5px;
  .secondary {
    fill: #dfd0f4;
  }
  .primary {
    fill: none;
  }
`
