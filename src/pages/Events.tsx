import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { P, SubHeading } from '../components/Elements'
import useHash from '../hooks/useHash'
import { elevation, media } from '../utils/mixins'

const Events: React.FC<RouteComponentProps> = ({ location }) => {
  const pastEventRef = React.useRef<HTMLHeadingElement>(null)
  useHash({ refToFocus: pastEventRef, hash: '#past-events', location })
  React.useEffect(() => window.scrollTo(0, 0), [])
  return (
    <div>
      <CampImage src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto/v1549323203/IMG_0511.jpg" />
      <CampInfo>
        <CampTitleSection>
          <TitleCard>
            <CampHeading>Oregon 4-H Teen Camp</CampHeading>
            <CampLocation>Klamath Falls, Oregon</CampLocation>
          </TitleCard>
          <CampDescriptionSection>
            <CampDescriptionTitle>Adventure Like Never Before</CampDescriptionTitle>
            <CampDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec hendrerit urna. Donec iaculis,
              lacus nec tincidunt pellentesque, ligula arcu posuere nunc, nec gravida justo neque non quam. Phasellus
              consequat erat ut lorem consectetur, sit amet blandit est tristique. Morbi mattis, sapien a ullamcorper
              fermentum, magna dolor viverra justo, ac imperdiet eros nibh at magna. Phasellus at hendrerit neque.
              Curabitur luctus efficitur fringilla. Praesent ullamcorper eleifend nulla, at finibus urna varius ac.
              Suspendisse mollis nisi sit amet tincidunt laoreet. Ut tempus erat ac semper commodo. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel feugiat massa, vitae convallis felis.
              Aliquam erat volutpat. Aliquam tristique libero nulla, eu tempor tortor posuere vel.
            </CampDescription>
          </CampDescriptionSection>
        </CampTitleSection>
        <CampDetailsSection>
          <CampDetailsWrapper>
            <CampDetailsHeading>Age Range</CampDetailsHeading>
            <CustomP>2nd - 6th graders</CustomP>
            <CampDetailsHeading>Camp dates for 2019</CampDetailsHeading>
            <CustomP>Wed, June 26 - Fri, June 28</CustomP>
            <CustomP>Sat, Aug 2 - Mon, Aug 4</CustomP>
            <CampDetailsHeading>Get More Information</CampDetailsHeading>
            <CustomP>Phillip Wendte</CustomP>
            <CustomP>alexwendte@ksu.edu</CustomP>
            <CustomP>913-206-8228</CustomP>
            <CustomP>
              <CustomA href="https://4-hmilitarypartnerships.org">4-hmilitarypartnerships.org</CustomA>
            </CustomP>
          </CampDetailsWrapper>
        </CampDetailsSection>
      </CampInfo>
      <CampImage src="https://res.cloudinary.com/four-hmpp/image/upload/f_auto,q_auto/v1549323006/IMG_1559.jpg" />
      <CampInfo>
        <CampTitleSection>
          <TitleCard>
            <CampHeading>Drone Camp</CampHeading>
            <CampLocation>Burlington, Vermont</CampLocation>
          </TitleCard>
          <CampDescriptionSection>
            <CampDescriptionTitle>Mapping Our World Using Drones and Geospatial Technology</CampDescriptionTitle>
            <CampDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec hendrerit urna. Donec iaculis,
              lacus nec tincidunt pellentesque, ligula arcu posuere nunc, nec gravida justo neque non quam. Phasellus
              consequat erat ut lorem consectetur, sit amet blandit est tristique. Morbi mattis, sapien a ullamcorper
              fermentum, magna dolor viverra justo, ac imperdiet eros nibh at magna. Phasellus at hendrerit neque.
              Curabitur luctus efficitur fringilla. Praesent ullamcorper eleifend nulla, at finibus urna varius ac.
              Suspendisse mollis nisi sit amet tincidunt laoreet. Ut tempus erat ac semper commodo. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel feugiat massa, vitae convallis felis.
              Aliquam erat volutpat. Aliquam tristique libero nulla, eu tempor tortor posuere vel.
            </CampDescription>
          </CampDescriptionSection>
        </CampTitleSection>
        <CampDetailsSection>
          <CampDetailsWrapper>
            <CampDetailsHeading>Age Range</CampDetailsHeading>
            <CustomP>2nd - 6th graders</CustomP>
            <CampDetailsHeading>Camp dates for 2019</CampDetailsHeading>
            <CustomP>Wed, June 26 - Fri, June 28</CustomP>
            <CustomP>Sat, Aug 2 - Mon, Aug 4</CustomP>
            <CampDetailsHeading>Get More Information</CampDetailsHeading>
            <CustomP>Phillip Wendte</CustomP>
            <CustomP>alexwendte@ksu.edu</CustomP>
            <CustomP>913-206-8228</CustomP>
            <CustomP>
              <CustomA href="https://4-hmilitarypartnerships.org">4-hmilitarypartnerships.org</CustomA>
            </CustomP>
          </CampDetailsWrapper>
        </CampDetailsSection>
      </CampInfo>
    </div>
  )
}
export default Events

const CampImage = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  display: block;
`
const CampInfo = styled.div`
  background: ${props => props.theme.primaryLight};
  display: flex;
  ${media.tabletLand`
    flex-direction: column;
  `}
`
const CampTitleSection = styled.div`
  width: 50%;
  display: inline-block;
  padding: 0 6.4rem;
  background: ${props => props.theme.white};
  ${media.tabletLand`
    width: 100%;
    padding: 0 2rem;
  `}
`
const TitleCard = styled.div`
  ${elevation(4)};
  margin-top: -6.4rem;
  background: ${props => props.theme.white};
  border-radius: 5px;
  align-items: center;
  position: relative;
  padding: 2.4rem;
  ${media.tabletLand`
    padding: 1.6rem;
  `}
`
const CampHeading = styled(SubHeading)`
  padding: 0;
  font-size: 3.6rem;
  font-weight: 500;
  font-family: Rubik;
  ${media.tabletLand`
    font-size: 2rem;
    padding: 0;
  `}
`
const CampLocation = styled.span`
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  display: block;
  padding-top: 1.2rem;
  ${media.tabletLand`
    font-size: 1.8rem;
    padding-top: .4rem;
  `}
`
const CampDescriptionSection = styled.section`
  padding: 4.8rem 0 9.6rem;
  max-width: 65rem;
  margin: 0 auto;
  ${media.tabletLand`
    padding: 3.6rem 0 3.2rem;
  `}
`
const CampDescriptionTitle = styled.h3`
  font-size: 2.5rem;
  text-align: center;
  line-height: 1.3;
  ${media.tabletLand`
    font-size: 2rem;
  `}
`
const CampDescription = styled.p`
  padding-top: 2.4rem;
`
const CampDetailsSection = styled.section`
  width: 50%;
  vertical-align: top;
  padding: 1.6rem 0 9.6rem;
  padding-top: 1.6rem;
  display: inline-flex;
  justify-content: center;
  ${media.tabletLand`
    width: 100%;
    padding: .8rem 2rem 3.2rem;
  `}
`
const CampDetailsWrapper = styled.div``
const CampDetailsHeading = styled.h3`
  font-size: 2.5rem;
  line-height: 1;
  padding: 4.8rem 0 1.2rem;
  ${media.tabletLand`
    font-size: 2rem;
    padding: 2.4rem 0 1.2rem;
  `}
`
const CustomP = styled(P)`
  padding-bottom: 1.2rem;
  line-height: 1;
`
const CustomA = styled.a`
  color: ${props => props.theme.primaryGrey};
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`
