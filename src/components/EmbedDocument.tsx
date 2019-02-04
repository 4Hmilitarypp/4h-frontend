import * as React from 'react'
import styled from 'styled-components/macro'
import { LessonLinkType } from '../sharedTypes'

interface IProps {
  type: LessonLinkType
  title: string
  url: string
  open: boolean
  setOpen: any
}

const EmbedDocument: React.FC<IProps> = ({ type, title, url, open, setOpen }) => {
  React.useEffect(
    () => {
      if (open) {
        window.addEventListener('keydown', handleKeydown)
      } else {
        window.removeEventListener('keydown', handleKeydown)
      }
    },
    [open]
  )

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return open ? (
    <EmbedWrapper>
      <DocumentCommands>
        <DocumentCloseButton as="a" href={url} download={title}>
          Download
        </DocumentCloseButton>
        <DocumentCloseButton onClick={() => setOpen(false)}>Close</DocumentCloseButton>
      </DocumentCommands>
      <Doc src={`https://docs.google.com/gview?url=${url}&embedded=true`} />
    </EmbedWrapper>
  ) : null
}

export default EmbedDocument

const Doc: any = styled.iframe`
  height: 100%;
  width: 100%;
  padding-bottom: 5rem;
`
const EmbedWrapper = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: hsl(206, 7%, 21%);
`
const DocumentCloseButton: any = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  margin: 0 1.6rem;
  color: ${props => props.theme.white} !important;
  font-weight: 400 !important;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
const DocumentCommands = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 1.6rem 4rem;
`