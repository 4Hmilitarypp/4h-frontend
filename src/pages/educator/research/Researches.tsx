import { RouteComponentProps } from '@reach/router'
// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { DynamicSection, Heading, PageWrapper } from '../../../components/Elements'
import { IResearch } from '../../../sharedTypes'
import api from '../../../utils/api'
import Research from './Research'

const Researches: React.FC<RouteComponentProps> = () => {
  const [researches, setResearches] = React.useState<IResearch[] | undefined>(undefined)

  React.useEffect(() => {
    api.research
      .get()
      .then(r => setResearches(r))
      .catch(err => console.error(err))
  }, [])

  return researches ? (
    <PageWrapper>
      <Heading>Research</Heading>
      <ResearchList>
        <DynamicSection>
          {researches.map(research => (
            <Research key={research.title} research={research} />
          ))}
        </DynamicSection>
      </ResearchList>
    </PageWrapper>
  ) : (
    <h1>Loading...</h1>
  )
}
export default Researches
const ResearchList = styled.div`
  padding-top: 3.2rem;
`
