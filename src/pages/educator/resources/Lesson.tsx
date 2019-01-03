import * as React from 'react'
import styled from 'styled-components/macro'
import { A, Doc, EmbedWrapper, Pdf } from '../../../components/Elements'
import useDocument from '../../../hooks/useDocument'
import { ILesson } from '../../../sharedTypes'

interface IProps {
  lesson: ILesson
}

const Lesson: React.FC<IProps> = ({ lesson }) => {
  const { documentOpen, setDocumentOpen } = useDocument()
  const [documentType, setDocumentType] = React.useState<'pdf' | 'doc' | 'link' | 'ppt'>('pdf')
  const openDocument = (type: 'pdf' | 'doc' | 'link' | 'ppt') => {
    setDocumentType(type)
    setDocumentOpen(true)
  }

  return (
    <>
      {documentOpen && (
        <EmbedWrapper>
          <CloseButton onClick={() => setDocumentOpen(false)}>Close</CloseButton>
          {lesson.pdfUrl && documentType === 'pdf' && (
            <Pdf data={lesson.pdfUrl} type="application/pdf">
              alt : <a href={lesson.pdfUrl}>{lesson.pdfUrl}</a>
            </Pdf>
          )}
          {lesson.pptUrl && documentType === 'ppt' && (
            <Doc src={`https://docs.google.com/gview?url=${lesson.pptUrl}&embedded=true`} />
          )}
          {lesson.docUrl && documentType === 'doc' && (
            <Doc src={`https://docs.google.com/gview?url=${lesson.docUrl}&embedded=true`} />
          )}
        </EmbedWrapper>
      )}
      <Wrapper>
        <LessonTitle>{lesson.title}</LessonTitle>
        {lesson.pdfUrl && (
          <CustomA as={'button'} onClick={() => openDocument('pdf')}>
            PDF
          </CustomA>
        )}
        {lesson.pptUrl && (
          <CustomA as={'button'} onClick={() => openDocument('ppt')}>
            PowerPoint
          </CustomA>
        )}
        {lesson.docUrl && (
          <CustomA as={'button'} onClick={() => openDocument('doc')}>
            Word Document
          </CustomA>
        )}
        {lesson.externalUrl && <A href={lesson.externalUrl}>External Website</A>}
      </Wrapper>
    </>
  )
}
export default Lesson
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
const CustomA = styled(A)`
  text-align: left;
`
