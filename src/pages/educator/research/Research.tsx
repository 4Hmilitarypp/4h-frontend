// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button, Doc, EmbedWrapper, Pdf, SubHeading } from '../../../components/Elements'
import { IResearch } from '../../../sharedTypes'
import { elevation } from '../../../utils/mixins'

interface IProps {
  research: IResearch
}

const Research: React.FC<IProps> = ({ research }) => {
  const descriptionRef = React.useRef<HTMLDivElement>(null)
  const [trimDescription, setTrimDescription] = React.useState(false)
  const [showExpand, setShowExpand] = React.useState(false)
  const [pdfOpen, setPdfOpen] = React.useState(false)
  const setPdfOpenHelper = (state: boolean) => {
    if (state) {
      setPdfOpen(true)
      document.addEventListener('keydown', handleKeydown)
    } else {
      setPdfOpen(false)
      document.removeEventListener('keydown', handleKeydown)
    }
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setPdfOpenHelper(false)
    }
  }

  React.useEffect(() => {
    const descNode = descriptionRef.current
    if (descNode) {
      // des.length > 2000 is for jest to be able to test
      if (descNode.clientHeight > 160 || (research.description && research.description.length > 2000)) {
        setTrimDescription(true)
        setShowExpand(true)
      } else {
        setTrimDescription(false)
      }
    }
  }, [])

  const handleExpandClicked = () => {
    setTrimDescription(!trimDescription)
  }

  return (
    <ResearchWrapper>
      {research.type === 'pdf' && pdfOpen && (
        <EmbedWrapper>
          <CloseButton onClick={() => setPdfOpenHelper(false)}>Close</CloseButton>
          <Pdf data={research.url} type="application/pdf">
            alt : <a href={research.url}>{research.url}</a>
          </Pdf>
        </EmbedWrapper>
      )}
      {research.type === 'doc' && pdfOpen && (
        <EmbedWrapper>
          <CloseButton onClick={() => setPdfOpenHelper(false)}>Close</CloseButton>
          <Doc src={`https://docs.google.com/gview?url=${research.url}&embedded=true`} />
        </EmbedWrapper>
      )}

      <ResearchTitle>
        <MySubHeading as="h3">{research.title}</MySubHeading>
        {/* Set a pdf type */}
        {research.type === 'link' ? (
          <ViewButton as="a" href={research.url}>
            View the Research
          </ViewButton>
        ) : (
          <ViewButton onClick={() => setPdfOpenHelper(true)}>View the Research</ViewButton>
        )}
      </ResearchTitle>
      <Description ref={descriptionRef} trim={trimDescription}>
        {Parser(research.description)}
      </Description>
      {showExpand && (
        <>
          <Ellipses>{trimDescription ? '. . .' : ''}</Ellipses>
          <Expand onClick={handleExpandClicked} show={showExpand} trim={trimDescription}>
            {trimDescription ? 'expand' : 'collapse'}
          </Expand>
        </>
      )}
    </ResearchWrapper>
  )
}
export default Research

const ResearchWrapper = styled.div`
  background: ${props => props.theme.primaryBackground};
  padding: 2rem 3.2rem;
  ${elevation(3)};
  &:not(:last-child) {
    margin-bottom: 3.2rem;
  }
`
const ResearchTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 2.4rem;
`
const MySubHeading = styled(SubHeading)`
  padding: 0;
  text-align: left;
`
const ViewButton = styled(Button)`
  white-space: nowrap;
  margin: 0 -1.2rem 0 2rem;
  padding: 0.4rem 1.6rem;
  color: ${props => props.theme.white} !important;
  line-height: normal;
  &:hover {
    transform: none;
    opacity: 1;
    background: #327654;
  }
`
const Description: any = styled.div`
  max-height: ${(props: any) => (props.trim ? '17rem' : 'unset')};
  overflow: hidden;
  position: relative;
`
const Ellipses = styled.span`
  display: block;
  color: ${props => props.theme.primaryGrey};
  text-align: center;
  font-size: 3.2rem;
  line-height: 0.4;
  padding-top: 0.4rem;
`
const Expand: any = styled.button`
  background: none;
  border: none;
  display: block;
  color: ${props => props.theme.primaryLink};
  font-weight: 500;
  margin: 1.6rem auto 0;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  padding: 0.4rem;
  margin: 1.2rem 2.8rem;
  color: ${props => props.theme.white};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
