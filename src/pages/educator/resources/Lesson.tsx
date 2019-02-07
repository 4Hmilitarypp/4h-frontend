import * as React from 'react'
import styled from 'styled-components/macro'
import { A } from '../../../components/Elements'
import EmbedDocument from '../../../components/EmbedDocument'
import { ILesson, LessonLinkType } from '../../../sharedTypes'

interface IProps {
  lesson: ILesson
}

const Lesson: React.FC<IProps> = ({ lesson }) => {
  const [documentOpen, setDocumentOpen] = React.useState(false)
  const [openUrl, setOpenUrl] = React.useState<string | undefined>(undefined)

  const handleOpenChange = (type?: LessonLinkType, url?: string) => {
    setDocumentOpen(type ? true : false)
    if (type !== undefined) {
      setOpenUrl(url)
    }
  }
  return (
    <>
      <EmbedDocument url={openUrl || ''} title={lesson.title} open={documentOpen} setOpen={setDocumentOpen} />
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
