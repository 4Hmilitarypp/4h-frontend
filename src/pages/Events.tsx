import { RouteComponentProps } from '@reach/router'
import { format } from 'date-fns'
import * as React from 'react'
import styled from 'styled-components/macro'
import { P, SubHeading } from '../components/Elements'
import useErrorHandler from '../hooks/useErrorHandler'
import useHash from '../hooks/useHash'
import { ICamp } from '../sharedTypes'
import api from '../utils/api'
import { elevation, media } from '../utils/mixins'

const Events: React.FC<RouteComponentProps> = ({ location }) => {
  const pastEventRef = React.useRef<HTMLHeadingElement>(null)
  useHash({ refToFocus: pastEventRef, hash: '#past-events', location })
  React.useEffect(() => window.scrollTo(0, 0), [])
  const handleError = useErrorHandler()

  const [camps, setCamps] = React.useState<ICamp[]>([])
  React.useEffect(() => {
    api.camps
      .get()
      .then(c => {
        const sorted = c.sort((a, b) => {
          if (!a.featuredImage && !b.featuredImage) {
            if (a.dates[0]) return !b.dates[0] || a.dates[0].beginDate < b.dates[0].beginDate ? -1 : 1
            return 1
          }
          if (!a.featuredImage || !a.dates[0]) return 1
          if (!b.featuredImage || !b.dates[0]) return -1
          return a.dates[0].beginDate < b.dates[0].beginDate ? -1 : 1
        })
        setCamps(sorted)
      })
      .catch(handleError)
  }, [])
  return (
    <>
      {camps.map(camp => (
        <div key={camp._id}>
          {camp.featuredImage ? (
            <CampImage src={camp.featuredImage.url} alt={camp.featuredImage.alt} />
          ) : (
            <BlankImage />
          )}
          <CampInfo>
            <CampTitleSection>
              <TitleCard>
                <CampHeading>{camp.title}</CampHeading>
                <CampLocation>{`${camp.city}, ${camp.state}`}</CampLocation>
              </TitleCard>
              <CampDescriptionSection>
                <CampDescriptionTitle>{camp.descriptionTitle}</CampDescriptionTitle>
                <CampDescription>{camp.description}</CampDescription>
              </CampDescriptionSection>
            </CampTitleSection>
            <CampDetailsSection>
              <CampDetailsWrapper>
                <CampDetailsHeading>Age Range</CampDetailsHeading>
                <CustomP>{camp.ageRange}</CustomP>
                <CampDetailsHeading>Camp dates for 2019</CampDetailsHeading>
                {camp.dates.map(date => (
                  <CustomP key={camp.title + date.beginDate}>{`${format(date.beginDate, 'ddd, MMM D')} - ${format(
                    date.endDate,
                    'ddd, MMM D'
                  )}`}</CustomP>
                ))}
                <CampDetailsHeading>Get More Information</CampDetailsHeading>
                {camp.contact.name && <CustomP>{camp.contact.name}</CustomP>}
                {camp.contact.email && <CustomA href={`mailto:${camp.contact.email}`}>{camp.contact.email}</CustomA>}
                {camp.contact.phoneNumber && <CustomP>{camp.contact.phoneNumber}</CustomP>}
                {camp.contact.url && (
                  <CustomP>
                    <CustomA href={camp.contact.url}>{camp.contact.urlText || camp.contact.url}</CustomA>
                  </CustomP>
                )}
              </CampDetailsWrapper>
            </CampDetailsSection>
          </CampInfo>
        </div>
      ))}
    </>
  )
}
export default Events

const CampImage = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  display: block;
`
const BlankImage = styled.div`
  width: 100%;
  height: 70vh;
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
  padding-bottom: 1.2rem;
  display: block;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`
