import { RouteComponentProps } from '@reach/router'
import { format } from 'date-fns'
import Downshift from 'downshift'
// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { theme } from '../../App'
import { Button, DynamicSection, Heading, InputGroup, OutlineButton, P, SubHeading } from '../../components/Elements'
import EmbedDocument from '../../components/EmbedDocument'
import Icon from '../../components/Icon'
import useErrorHandler from '../../hooks/useErrorHandler'
import useHash from '../../hooks/useHash'
import { ICamp } from '../../sharedTypes'
import api from '../../utils/api'
import { elevation, media } from '../../utils/mixins'

const Camps: React.FC<RouteComponentProps> = ({ location }) => {
  const pastEventRef = React.useRef<HTMLHeadingElement>(null)
  useHash({ refToFocus: pastEventRef, hash: '#past-events', location })
  React.useEffect(() => window.scrollTo(0, 0), [])
  const handleError = useErrorHandler()

  const sortCampsByDate = (campA: ICamp, campB: ICamp) => {
    if (!campA.dates.length) return 1
    if (!campB.dates.length) return -1
    return campA.dates[0].beginDate > campB.dates[0].beginDate ? 1 : -1
  }

  const [camps, setCamps] = React.useState<ICamp[]>([])
  React.useEffect(() => {
    api.camps
      .get()
      .then(c => {
        const sorted = c.sort(sortCampsByDate)
        setCamps(sorted)
      })
      .catch(handleError)
  }, [])
  const [clickedFlyer, setClickedFlyer] = React.useState<string | false | undefined>()
  const [filterState, setFilterState] = React.useState<string>('All')
  const [filterBranch, setFilterBranch] = React.useState<string>('All')

  const getFilteredCamps = () => [
    { state: 'All' },
    ...camps
      .sort((a, b) => (a.state > b.state ? 1 : -1))
      .reduce<ICamp[]>((arr, item) => {
        if (!arr.some(camp => camp.state === item.state)) arr.push(item)
        return arr
      }, []),
  ]
  const getCampsFilteredByBranch = () => [
    { serviceBranch: 'All' },
    ...camps
      .sort((a, b) => (a.serviceBranch > b.serviceBranch ? 1 : -1))
      .reduce<ICamp[]>((arr, item) => {
        if (!arr.some(camp => camp.serviceBranch === item.serviceBranch) && item.serviceBranch) arr.push(item)
        return arr
      }, []),
    { serviceBranch: 'Army' },
    { serviceBranch: 'Navy' },
  ]

  const findBranchColor = (branch: string) => {
    if (branch === 'Army') {
      return '#2F3D2C'
    } else if (branch === 'Air Force') {
      return '#00369E'
    } else if (branch === 'Navy') {
      return 'goldenrod'
    }
    return 'red'
  }

  return (
    <div>
      <Heading>Upcoming Camps</Heading>
      <DisclaimerText>
        The camps below have been funded through the 4-H / Air Force Partnership funds held at Kansas State University
        and awarded to respective land-grant universities. States, communities, and higher education institutions are
        responding to COVID-19 based on a variety of local factors, and institutions may adjust their scheduled dates,
        registration deadlines or other components for these camps. This website will be updated as we receive
        information. We also encourage you to follow the information from the specific land-grant university hosting the
        camp.
      </DisclaimerText>
      <EmbedDocument url={clickedFlyer || ''} title="Camp Flyer" open={!!clickedFlyer} setOpen={setClickedFlyer} />
      <Downshift
        onChange={selection => setFilterState(selection ? selection.state : '')}
        itemToString={item => (item ? item.state : '')}
        initialInputValue="All"
      >
        {({
          closeMenu,
          getRootProps,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          openMenu,
        }) => (
          <DownshiftContainer {...getRootProps()}>
            <FindInputGroup>
              <label {...getLabelProps()}>Filter Camps By State</label>
              <div style={{ position: 'relative' }}>
                <RequestInput
                  {...getInputProps()}
                  readOnly={true}
                  onClick={() => (isOpen ? closeMenu() : openMenu())}
                />
                <ControllerButton
                  onClick={() => (isOpen ? closeMenu() : openMenu())}
                  data-testid="controller-button"
                  type="button"
                >
                  <Icon name="arrow" isOpen={isOpen} />
                </ControllerButton>
              </div>
            </FindInputGroup>
            {isOpen ? (
              <Menu {...getMenuProps()}>
                {getFilteredCamps().map((item, index) => (
                  <Item
                    key="filler"
                    {...getItemProps({
                      item,
                      key: item.state,
                      style: {
                        background: index === highlightedIndex ? theme.primary : '',
                        color: index === highlightedIndex ? theme.white : theme.primaryGrey,
                      },
                    })}
                  >
                    {item && item.state}
                  </Item>
                ))}
              </Menu>
            ) : null}
          </DownshiftContainer>
        )}
      </Downshift>
      <Downshift
        itemToString={item => (item ? item.serviceBranch : '')}
        initialInputValue="All"
        onChange={selection => setFilterBranch(selection ? selection.serviceBranch : '')}
      >
        {({
          closeMenu,
          getRootProps,
          getInputProps,
          getLabelProps,
          isOpen,
          getMenuProps,
          highlightedIndex,
          openMenu,
          getItemProps,
        }) => (
          <DownshiftContainer {...getRootProps()}>
            <FindInputGroup>
              <label {...getLabelProps()}>Filter Camps By Branch</label>
              <div style={{ position: 'relative' }}>
                <RequestInput
                  {...getInputProps()}
                  readOnly={true}
                  onClick={() => (isOpen ? closeMenu() : openMenu())}
                />
                <ControllerButton
                  onClick={() => (isOpen ? closeMenu() : openMenu())}
                  data-testid="controller-button"
                  type="button"
                >
                  <Icon name="arrow" isOpen={isOpen} />
                </ControllerButton>
              </div>
            </FindInputGroup>
            {isOpen ? (
              <Menu {...getMenuProps()}>
                {getCampsFilteredByBranch().map((item, index) => (
                  <Item
                    key="filler"
                    {...getItemProps({
                      item,
                      key: item.serviceBranch,
                      style: {
                        background: index === highlightedIndex ? theme.primary : '',
                        color: index === highlightedIndex ? theme.white : theme.primaryGrey,
                      },
                    })}
                  >
                    {item && item.serviceBranch}
                  </Item>
                ))}
              </Menu>
            ) : null}
          </DownshiftContainer>
        )}
      </Downshift>
      <CampsWrapper>
        {camps.length > 0 ? (
          camps
            .filter(camp => (filterState === 'All' ? true : camp.state === filterState))
            .filter(camp => (filterBranch === 'All' ? true : camp.serviceBranch === filterBranch))
            .sort(sortCampsByDate)
            .map(camp => (
              <div key={camp._id}>
                {console.log(camp)}
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
                      <CampDescription>{Parser(camp.description)}</CampDescription>
                    </CampDescriptionSection>
                  </CampTitleSection>
                  <CampDetailsSection>
                    {(camp.type || camp.serviceBranch) && (
                      <CampType color={findBranchColor(camp.serviceBranch)}>
                        {camp.serviceBranch} {camp.type} Camp
                      </CampType>
                    )}
                    <CampDetailsWrapper>
                      <CampDetailsHeading>Age Range</CampDetailsHeading>
                      <CustomP>{camp.ageRange}</CustomP>
                      <CampDetailsHeading>Camp dates for 2020</CampDetailsHeading>
                      {camp.dates.map(date => (
                        <CustomP key={camp.title + date.beginDate}>{`${format(
                          new Date(date.beginDate),
                          'EEE, MMM d'
                        )} - ${format(new Date(date.endDate), 'EEE, MMM d')}`}</CustomP>
                      ))}
                      <CampDetailsHeading>Get More Information</CampDetailsHeading>
                      {camp.contact.name && <CustomP>{camp.contact.name}</CustomP>}
                      {camp.contact.email && (
                        <CustomA href={`mailto:${camp.contact.email}`}>{camp.contact.email}</CustomA>
                      )}
                      {camp.contact.phoneNumber && <CustomP>{camp.contact.phoneNumber}</CustomP>}
                      <Buttons>
                        {camp.contact.url && (
                          <CustomOutlineButton as="a" href={camp.contact.url}>
                            {camp.contact.urlText || camp.contact.url}
                          </CustomOutlineButton>
                        )}
                        {camp.flyerUrl && <Button onClick={() => setClickedFlyer(camp.flyerUrl)}>Camp Flyer</Button>}
                      </Buttons>
                    </CampDetailsWrapper>
                  </CampDetailsSection>
                </CampInfo>
              </div>
            ))
        ) : (
          <span></span>
        )}
      </CampsWrapper>
    </div>
  )
}
export default Camps

const DownshiftContainer = styled.div`
  position: relative;
  max-width: 40rem;
  margin: 0 auto;
`
const FindInputGroup = styled(InputGroup)`
  margin-bottom: 0rem;
  padding: 0 1.6rem;
`
const RequestInput = styled.input`
  background: ${props => props.theme.primaryBackground};
  height: 3.7rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`
const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 4rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const Menu = styled.ul`
  ${elevation(3)};
  background: ${props => props.theme.primaryBackground};
  position: absolute;
  width: 100%;
  z-index: 10;
`
const Item = styled.li`
  padding: 0.4rem 1.5rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`
const CampsWrapper = styled.div`
  padding-top: 3.2rem;
`
const CampImage = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  display: block;
`
const BlankImage = styled.div`
  width: 100%;
  height: 20vh;
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
const CampDescriptionSection = styled(DynamicSection)`
  padding: 5.2rem 0 9.6rem;
  max-width: 65rem;
  margin: 0 auto;
  ${media.tabletLand`
    padding: 3.6rem 0 3.2rem;
  `}
`
const CampType = styled.span`
  background: ${props => props.color};
  color: ${props => props.theme.white};
  border-radius: 50px;
  padding: 0.8rem 1.6rem;
  font-size: 2rem;
  position: absolute;
  text-align: center;
  line-height: 0.7;
  left: 2rem;
  top: 2rem;
`
const CampDescriptionTitle = styled.h3`
  font-size: 2.5rem;
  text-align: center;
  line-height: 1.3;
  ${media.tabletLand`
    font-size: 2rem;
  `}
`
const DisclaimerText = styled.p`
  color: red;
  margin: 0px auto 15px auto;
  text-align: center;
  max-width: 58rem;
`
const CampDescription = styled.p`
  padding-top: 2.4rem;
`
const CampDetailsSection = styled.section`
  width: 50%;
  vertical-align: top;
  padding: 1.6rem 0 9.6rem;
  display: inline-flex;
  justify-content: center;
  position: relative;
  ${media.tabletLand`
    width: 100%;
    padding: .8rem 2rem 3.2rem;
  `}
`
const CampDetailsWrapper = styled.div`
  word-break: break-all;
`
const CampDetailsHeading = styled.h3`
  font-size: 2.5rem;
  line-height: 1;
  padding: 4.8rem 0 1.2rem;
  ${media.tabletLand`
    font-size: 2rem;
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
    cursor: pointer;
  }
`
const Buttons = styled.div`
  padding: 2.4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  ${media.tabletPort`
    padding-bottom: .8rem;
  `}
`
const CustomOutlineButton = styled(OutlineButton)`
  background: ${props => props.theme.white};
  margin-bottom: 1.6rem;
  text-align: center;
  word-break: normal;
`
