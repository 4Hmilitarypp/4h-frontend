import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { DynamicSection, Heading, PageWrapper } from '../../../components/Elements'
import { IResource } from '../../../sharedTypes'
import api from '../../../utils/api'
import DisplayResource from './DisplayResource'

const Resources: React.FC<RouteComponentProps> = () => {
  const [resources, setResources] = React.useState<IResource[]>([])
  React.useEffect(() => {
    api.resources
      .get()
      .then(r => setResources(r))
      .catch(err => console.error(err))
  }, [])
  return (
    <PageWrapper>
      <Heading>Resources</Heading>
      {resources.length > 0 && (
        <DynamicSection data-testid="resources">
          {resources.map(cr => (
            <DisplayResource resource={cr} key={cr.slug} />
          ))}
        </DynamicSection>
      )}
    </PageWrapper>
  )
}
export default Resources
