import { RouteComponentProps } from '@reach/router'
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
    <AboutBody>
      <Section>
        <CustomSubHeading>This is What We Do</CustomSubHeading>
        <SubSection>
          <Icons>
            <Circle name="circle" height={64} width={64} />
            <Icon name="link" height={32} width={32} />
          </Icons>
          <InlineP>
            4-H Military Partnership creates opportunities and provides support to military connected youth whether they
            live on or near an installation, in our communities, or on overseas installations. 4-H clubs provide
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
            The 4-H Military Partnership represent a collaboration of the U.S. Department of Agriculture (USDA),
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
            The 4-H Military Partnership rely on Land Grant University Extension faculty, the “Extension 4-H Military
            Liaison” to serve as a link between the State Cooperative Extension System, Military Service Branches, and
            4-H National Headquarters at USDA. The Liaison serves as a coordinator with these partners in support of
            research based programming for military connected children, youth, and families.
          </InlineP>
        </SubSection>
      </SectionLight>
      <FinalSectionLight />
    </AboutBody>
  )
}

export default About

const AboutBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 68.8px);
`

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
  margin: 0 auto;
  padding-bottom: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

const FinalSectionLight = styled.div`
  background: ${props => props.theme.secondaryBackground};
  flex-grow: 1;
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
  max-width: 61rem;
  color: ${props => props.theme.secondaryGrey};
`
