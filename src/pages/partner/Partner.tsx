import { RouteComponentProps } from '@reach/router'
// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import staticPartners from '../../assets/data/staticPartners.json'
import BackButton from '../../components/BackButton'
import { DynamicSection, Heading, PageWrapper, SubHeading } from '../../components/Elements'
import { IPartner } from '../../sharedTypes'
import { elevation, media, transition } from '../../utils/mixins'
import Reports from './Reports'

interface IProps extends RouteComponentProps {
  slug?: string
}

const Partner: React.FC<IProps> = ({ slug }) => {
  const [partner, setPartner] = React.useState<IPartner | undefined>(undefined)

  React.useEffect(() => {
    const partnerResult = staticPartners.filter((p: IPartner) => p.slug === slug)[0]
    window.scrollTo(0, 0)
    setPartner(partnerResult)
  }, [])

  return (
    <CustomPageWrapper>
      {partner ? (
        <PartnerWrapper>
          <HeaderWrapper>
            <BackButton route={'/partners'} title="Partners" />
            <CustomHeading>{partner.title}</CustomHeading>
            <div style={{ width: 209 }} />
          </HeaderWrapper>
          <Hero>
            <Description>{Parser(partner.longDescription)}</Description>
            <HeroImages>
              {partner.featuredImages.map(image => (
                <FeaturedImage key={image.url} src={image.url} alt={image.alt || `${partner.title} Logo`} />
              ))}
            </HeroImages>
          </Hero>
          {partner.annualReports.length > 0 && (
            <ListWrapper>
              <SubHeading>Annual Reports</SubHeading>
              <Reports reports={partner.annualReports} />
            </ListWrapper>
          )}
          {partner.videoReports.length > 0 && (
            <ListWrapper>
              <SubHeading>Video Reports</SubHeading>
              <VideoReports>
                {partner.videoReports.map(report => (
                  <ReportItem key={report.url}>
                    <VideoReportCard href={report.url} target="_blank">
                      <VideoReportCover src={report.image.url} alt={`${report.title} cover`} />
                      <ReportTitle>{report.title}</ReportTitle>
                    </VideoReportCard>
                  </ReportItem>
                ))}
              </VideoReports>
            </ListWrapper>
          )}
        </PartnerWrapper>
      ) : (
        <h1>Partner Not Found</h1>
      )}
    </CustomPageWrapper>
  )
}
export default Partner

const CustomPageWrapper = styled(PageWrapper)`
  ${media.tabletLand`
    padding: 0;
  `}
`
const PartnerWrapper = styled.div`
  ${elevation(4)};
  margin: 2rem;
  padding-bottom: 2rem;
  ${media.tabletLand`
    margin: 2rem 0;
  `}
`
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.2rem;
  ${media.tabletLand`
    flex-direction: column;
    padding: 2rem 0 0;
  `}
`
const CustomHeading = styled(Heading)`
  ${media.tabletLand`
    padding: 1.2rem 0;
  `}
`
const Hero = styled.section`
  display: flex;
  justify-content: center;
  padding: 0 4rem;
  align-items: center;
  ${media.tabletLand`
    flex-direction: column;
    padding: 0;
  `}
`
const HeroImages = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const FeaturedImage = styled.img`
  height: 20rem;
  display: block;
  margin: 1.2rem;
  object-fit: contain;
`
const Description = styled(DynamicSection)`
  padding-right: 3.2rem;
  padding-top: 2rem;
  ${media.tabletLand`
    padding: 2rem 2.4rem 0;
    margin: 0;
    max-width: 100%;
    word-wrap: break-word;
  `}
`
const ListWrapper = styled.section`
  padding: 2rem 0;
`
const VideoReports = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const ReportItem = styled.li`
  margin: 3.2rem 2rem;
`
const ReportCard = styled.a`
  ${elevation(4)};
  padding: 3.2rem 2rem 2rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  width: 32rem;
  text-align: center;
  backface-visibility: hidden;
  ${transition({ name: 'easeOutCubic={true}', time: 0.3 })};
  &:hover {
    transform: rotate(1deg) translateX(-10px) translateY(-10px);
    ${transition({ name: 'easeInCubic' })};
  }
`
const ReportCover: any = styled.div`
  height: 33.2rem;
  width: 25rem;
  background-image: url(${(props: any) => props.src.replace("'", '')});
  background-size: cover;
  box-shadow: inset 0 0 4px 2px rgba(0, 0, 0, 0.2);
`

const VideoReportCard = styled(ReportCard)`
  width: 38.4rem;
  padding: 3.2rem 2rem 2rem;
`
const VideoReportCover = styled(ReportCover)`
  height: 25rem;
  width: 33.2rem;
`

const ReportTitle = styled.span`
  color: ${props => props.theme.primaryLink};
  font-weight: 500;
  font-size: 1.8rem;
  padding-top: 2rem;
`
