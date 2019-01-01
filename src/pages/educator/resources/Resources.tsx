import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { DynamicSection, Heading, PageWrapper } from '../../../components/Elements'
import { ICurriculumResource } from '../../../sharedTypes'
import api from '../../../utils/api'
import DisplayResource from './DisplayResource'

const Resources: React.FC<RouteComponentProps> = () => {
  const [curriculumResources, setCurriculumResources] = React.useState<ICurriculumResource[] | undefined>(undefined)
  React.useEffect(() => {
    api.curriculumResources
      .get()
      .then(r => setCurriculumResources(r))
      .catch(err => console.error(err))
  }, [])
  return (
    <PageWrapper>
      {curriculumResources ? (
        <>
          <Heading>Curriculum Resources</Heading>
          <DynamicSection>
            {curriculumResources.map(cr => (
              <DisplayResource curriculumResource={cr} />
            ))}
          </DynamicSection>
        </>
      ) : (
        <Heading>Loading</Heading>
      )}
    </PageWrapper>
  )
}
export default Resources
