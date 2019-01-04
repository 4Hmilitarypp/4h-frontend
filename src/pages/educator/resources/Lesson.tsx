import * as React from 'react'
import styled from 'styled-components/macro'
import { A, Doc, EmbedWrapper, Pdf } from '../../../components/Elements'
import useDocument from '../../../hooks/useDocument'
import { ILesson, ILessonType } from '../../../sharedTypes'

interface IProps {
  lesson: ILesson
}

const Lesson: React.FC<IProps> = ({ lesson }) => {
  const [documentType, setDocumentType] = React.useState<'pdf' | 'doc' | 'external' | 'ppt' | undefined>(undefined)
  const { documentOpen, setDocumentOpen } = useDocument()
  const [openUrl, setOpenUrl] = React.useState<string | undefined>(undefined)

  const handleOpenChange = (type?: ILessonType, url?: string) => {
    setDocumentOpen(type ? true : false)
    setDocumentType(type)
    if (type !== undefined) {
      setOpenUrl(url)
    }
  }
  return (
    <>
      {documentOpen && (
        <EmbedWrapper>
          <DocumentCommands>
            {documentType !== 'pdf' && (
              <CloseButton as="a" href={openUrl} download={lesson.title}>
                Download
              </CloseButton>
            )}
            <CloseButton onClick={() => handleOpenChange(undefined)}>Close</CloseButton>
          </DocumentCommands>
          {documentType === 'pdf' ? (
            <Pdf data={openUrl} type="application/pdf">
              - alt : <a href={openUrl}>{openUrl}</a>
            </Pdf>
          ) : (
            <Doc src={`https://docs.google.com/gview?url=${openUrl}&embedded=true`} />
          )}
        </EmbedWrapper>
      )}
      <Wrapper>
        <LessonTitle>{lesson.title}</LessonTitle>
        {lesson.links
          .sort((a, b) => (a.type > b.type ? 1 : -1))
          .map(link =>
            link.type === 'external' ? (
              <A href={link.url} key={link.url}>
                External Website
              </A>
            ) : (
              <CustomA as={'button'} onClick={() => handleOpenChange(link.type, link.url)} key={link.url}>
                {link.type === 'pdf' && 'PDF'}
                {link.type === 'doc' && 'Word Document'}
                {link.type === 'ppt' && 'PowerPoint'}
              </CustomA>
            )
          )}
      </Wrapper>
    </>
  )
}
export default Lesson
const DocumentCommands = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 1.6rem 4rem;
`
const CloseButton: any = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  margin: 0 1.6rem;
  color: ${props => props.theme.white};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% repeat(2, minmax(10.2rem, 1fr));
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  padding: 1.2rem;
  &:nth-child(2n-1) {
    background: ${props => props.theme.primaryBackground};
  }
`
const LessonTitle = styled.span`
  font-size: 1.8rem;
`
const CustomA = styled(A)`
  text-align: left;
`
