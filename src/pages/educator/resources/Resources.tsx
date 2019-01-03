import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { DynamicSection, Heading, PageWrapper } from '../../../components/Elements'
import { IResource } from '../../../sharedTypes'
import api from '../../../utils/api'
import DisplayResource from './DisplayResource'

const Resources: React.FC<RouteComponentProps> = () => {
  const [resources, setResources] = React.useState<IResource[] | undefined>(undefined)
  React.useEffect(() => {
    api.resources
      .get()
      .then(r => setResources(r))
      .catch(err => console.error(err))
  }, [])
  return (
    <PageWrapper>
      {resources ? (
        <>
          <Heading>Resources</Heading>
          <DynamicSection>
            {resources.map(cr => (
              <DisplayResource resource={cr} key={cr.slug} />
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
