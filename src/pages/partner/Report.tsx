import * as React from 'react'
import styled from 'styled-components/macro'
import { EmbedWrapper, Pdf } from '../../components/Elements'
import { IReport } from '../../types'
import { elevation, transition } from '../../utils/mixins'

interface IProps {
  report: IReport
}

const Report: React.FC<IProps> = ({ report }) => {
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
  return (
    <ReportItem key={report.url}>
      {pdfOpen && (
        <EmbedWrapper>
          <CloseButton onClick={() => setPdfOpenHelper(false)}>Close</CloseButton>
          <Pdf data={report.url} type="application/pdf">
            alt : <a href={report.url}>{report.url}</a>
          </Pdf>
        </EmbedWrapper>
      )}
      <ReportCard onClick={() => setPdfOpenHelper(true)}>
        <ReportCover src={report.image} alt={`${report.title} cover`} />
        <ReportTitle>{report.title}</ReportTitle>
      </ReportCard>
    </ReportItem>
  )
}
export default Report

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
const ReportTitle = styled.span`
  color: ${props => props.theme.primaryLink};
  font-weight: 500;
  font-size: 1.8rem;
  padding-top: 2rem;
`
const ReportItem = styled.li`
  margin: 3.2rem 2rem;
`
const ReportCard = styled.div`
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
  ${transition({ name: 'easeOutCubic', time: 0.3 })};
  &:hover {
    transform: rotate(1deg) translateX(-10px) translateY(-10px);
    ${transition({ name: 'easeInCubic' })};
    cursor: pointer;
  }
`
const ReportCover: any = styled.div`
  height: 33.2rem;
  width: 25rem;
  background-image: url(${(props: any) => props.src.replace("'", '')});
  background-size: cover;
  box-shadow: inset 0 0 4px 2px rgba(0, 0, 0, 0.2);
`
