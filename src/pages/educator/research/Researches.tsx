import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { DynamicSection, Heading, InputGroup, PageWrapper } from '../../../components/Elements'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { IResearch } from '../../../sharedTypes'
import api from '../../../utils/api'
import { media } from '../../../utils/mixins'
import Research from './Research'

const Researches: React.FC<RouteComponentProps> = () => {
  const [researches, setResearches] = React.useState<IResearch[]>([])
  const [filterText, setFilterText] = React.useState<string>('')

  const handleError = useErrorHandler()

  const filterResearches = () =>
    researches.filter(
      research =>
        !filterText ||
        research.title.toLowerCase().includes(filterText) ||
        research.description.toLowerCase().includes(filterText)
    )

  React.useEffect(() => {
    api.research
      .get()
      .then(r => setResearches(r))
      .catch(handleError)
  }, [handleError])

  return (
    <PageWrapper>
      <Heading>Research</Heading>
      <CustomInputGroup>
        <label>Search for a resource</label>
        <input value={filterText} onChange={e => setFilterText(e.currentTarget.value.toLowerCase())} />
      </CustomInputGroup>
      {researches.length > 0 && (
        <ResearchList data-testid="research">
          <DynamicSection>
            {filterResearches().map(research => (
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

const CustomInputGroup = styled(InputGroup)`
  max-width: 60rem;
  margin: 0 auto;
  padding-bottom: 4.8rem;
`
