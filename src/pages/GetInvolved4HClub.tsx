import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { A, Heading, P, PageWrapper, SubHeading } from '../components/Elements'
import { elevation, media } from '../utils/mixins'

const About4HClub: React.FC<RouteComponentProps> = () => {
  React.useEffect(() => window.scrollTo(0, 0), [])
  return (
    <CustomPageWrapper>
      <CustomHeading>Getting Involved with 4-H Club</CustomHeading>
      <ImageSection>
        <Text>
          <CustomSubHeading1>Join 4-H</CustomSubHeading1>
          <P>
            4-H is the largest out of school youth organization in the United States with over<b> 7 million </b>youth
            members.
          </P>
          <P>
            There is<A href="http://www.4-h.org/get-involved/find-4-h-clubs-camps-programs/"> Cooperative Extension </A>
            staff responsible for 4-H programs in every county and city - so there's probably a 4-H program near you.
          </P>
          <P>
            Whether you live in a city, suburb or rural area, there's something for you in 4-H. In most states, you can
            join 4-H if you are between the ages of 7-18.
          </P>
          <P>Some areas have special age-appropriate programs designed especially for younger kids.</P>
          <P>
            Check with your
            <A href="http://www.4-h.org/get-involved/find-4-h-clubs-camps-programs/"> Cooperative Extension </A> office
            to find out what projects and activities are available for youth your age.
          </P>
          <P>
            Your
            <A href="http://www.4-h.org/get-involved/find-4-h-clubs-camps-programs/"> Cooperative Extension </A> office
            can help you to find a local club or program that's right for you.
          </P>
          <P>
            Or, it's easy to start a new club with some of your friends or other interested young people and a few
            adults willing to help.
          </P>
        </Text>
        <SectionImage src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto/v1542863544/pictures-from-states/NSA_Annapolis.jpg" />
      </ImageSection>
      <ImageSection>
        <SectionImage2 src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto/v1542863550/pictures-from-states/NSA_Annapolis1.jpg" />
        <Text>
          <CustomSubHeading>Become a 4-H Volunteer</CustomSubHeading>
          <P>Adult volunteers play an important role in the 4-H program.</P>
          <P>
            Volunteers coordinate local community clubs and help to plan and conduct local, regional, state, and
            national 4-H events.
          </P>
          <P>
            Over<b> 500,000 </b>teen and adult volunteers share their time and talents with 4-H youth. Call your local
            <A href="http://www.4-h.org/get-involved/find-4-h-clubs-camps-programs/"> Cooperative Extension </A>office
            to learn about how to apply and receive training to be a 4-H volunteer.
          </P>
        </Text>
      </ImageSection>
    </CustomPageWrapper>
  )
}
export default About4HClub

const CustomPageWrapper = styled(PageWrapper)`
  padding: 0 4rem 2rem;
  ${media.tabletLand`
    padding: 0 1.6rem 2rem;
  `}
`
const CustomHeading = styled(Heading)`
  color: ${props => props.theme.primary};
  ${media.tabletLand`
    font-size: 2.4rem;
  `}
`
const CustomSubHeading = styled(SubHeading)`
  color: ${props => props.theme.primary};
`
const CustomSubHeading1 = styled(CustomSubHeading)`
  ${media.tabletLand`
    display: none;
  `}
`
const ImageSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 3.2rem 0;
  ${media.tabletLand`
    flex-direction: column;
    padding: 0;
  `}
`
const SectionImage = styled.img`
  height: 60rem;
  object-fit: cover;
  margin: 0 2rem;
  border-radius: 5px;
  ${elevation(4)};
  ${media.tabletLand`
    margin: 2.4rem 0 0;
    border-radius: 0;
    height: 40rem;
  `}
`
const Text = styled.div`
  max-width: 65rem;
  margin: 0 auto;
`
const SectionImage2 = styled(SectionImage)`
  ${media.tabletLand`
    order: 1;
  `}
`
