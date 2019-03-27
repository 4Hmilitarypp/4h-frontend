import { RouteComponentProps } from '@reach/router'
// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { DynamicSection, Heading, PageWrapper } from '../../../components/Elements'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { IResearch } from '../../../sharedTypes'
import api from '../../../utils/api'
import { media } from '../../../utils/mixins'
import Research from './Research'

const Researches: React.FC<RouteComponentProps> = () => {
  const [researches, setResearches] = React.useState<IResearch[]>([])
  const handleError = useErrorHandler()

  React.useEffect(() => {
    api.research
      .get()
      .then(r => setResearches(r))
      .catch(handleError)
  }, [])

  return (
    <PageWrapper>
      <Heading>Research</Heading>
      {researches.length > 0 && (
        <ResearchList data-testid="research">
          <DynamicSection>
            {researches.map(research => (
              <Research key={research.title} research={research} />
            ))}
          </DynamicSection>
        </ResearchList>
      )}
    </PageWrapper>
  )
}
export default Researches
const ResearchList = styled.div`
  padding-top: 3.2rem;
  ${media.tabletLand`
    padding-top: 1.6rem;
  `}
`
