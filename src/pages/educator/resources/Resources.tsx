import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { DynamicSection, Heading, PageWrapper } from '../../../components/Elements'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { IResource } from '../../../sharedTypes'
import api from '../../../utils/api'
import DisplayResource from './DisplayResource'

const Resources: React.FC<RouteComponentProps> = () => {
  const [resources, setResources] = React.useState<IResource[]>([])
  const handleError = useErrorHandler()
  React.useEffect(() => {
    api.resources
      .get()
      .then(r => setResources(r))
      .catch(handleError)
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
