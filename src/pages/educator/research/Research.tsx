// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button, SubHeading } from '../../../components/Elements'
import EmbedDocument from '../../../components/EmbedDocument'
import useTrimDescription from '../../../hooks/useTrimDescription'
import { IResearch } from '../../../sharedTypes'
import { elevation } from '../../../utils/mixins'

interface IProps {
  research: IResearch
}

const Research: React.FC<IProps> = ({ research }) => {
  const [documentOpen, setDocumentOpen] = React.useState(false)

  const descriptionRef = React.useRef<HTMLDivElement>(null)
  const { trimDescription, showExpand, setTrimDescription } = useTrimDescription(descriptionRef, research.description)
  const handleExpandClicked = () => {
    setTrimDescription(!trimDescription)
  }

  return (
    <ResearchWrapper>
      <EmbedDocument url={research.url} title={research.title} open={documentOpen} setOpen={setDocumentOpen} />
      <ResearchTitle>
        <MySubHeading as="h3">{research.title}</MySubHeading>
        {research.type === 'external' ? (
          <ViewButton as="a" href={research.url}>
            View
          </ViewButton>
        ) : (
          <ViewButton onClick={() => setDocumentOpen(true)}>View</ViewButton>
        )}
      </ResearchTitle>
      <Description ref={descriptionRef} className={trimDescription ? 'trim' : ''}>
        {Parser(research.description)}
      </Description>
      {showExpand && (
        <>
          <Ellipses>{trimDescription ? '. . .' : ''}</Ellipses>
          <Expand onClick={handleExpandClicked}>{trimDescription ? 'expand' : 'collapse'}</Expand>
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
  padding: 0.4rem 1.2rem;
  color: ${props => props.theme.white} !important;
  line-height: normal;
  &:hover {
    transform: none;
    opacity: 1;
    background: #327654;
  }
`
const Description = styled.div`
  overflow: hidden;
  position: relative;
  &.trim {
    max-height: 17rem;
  }
`
const Ellipses = styled.span`
  display: block;
  color: ${props => props.theme.primaryGrey};
  text-align: center;
  font-size: 3.2rem;
  line-height: 0.4;
  padding-top: 0.4rem;
`
const Expand = styled.button`
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
