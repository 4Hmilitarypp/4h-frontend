import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  DynamicSection,
  Heading,
  InputGroup,
  PageWrapper,
} from '../../../components/Elements';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { IResource } from '../../../sharedTypes';
import api from '../../../utils/api';
import DisplayResource from './DisplayResource';

const techDiscoveryResource = {
  _id: 'tech-discovery-curriculum',
  longDescription: '',
  shortDescription:
    'The Tech Discovery Curriculum is designed for 5th-12th grade military connected youth from all branches of service. It is focused on developing life skills and increased resiliency supporting military connected families during times of deployment and reintegration back into normal life.',
  slug: 'tech-discovery',
  title: 'Tech Discovery Curriculum',
};

const Resources: React.FC<RouteComponentProps> = () => {
  const [resources, setResources] = React.useState<IResource[]>([]);
  const [filterText, setFilterText] = React.useState<string>('');

  const handleError = useErrorHandler();
  React.useEffect(() => {
    api.resources
      .get()
      .then(r => setResources(r))
      .catch(handleError);
  }, []);

  const filterResources = () =>
    [...resources, techDiscoveryResource].filter(
      resource =>
        !filterText ||
        resource.title.toLowerCase().includes(filterText) ||
        resource.longDescription.toLowerCase().includes(filterText),
    );

  return (
    <PageWrapper>
      <Heading>Resources</Heading>
      <CustomInputGroup>
        <label>Search for a resource</label>
        <input
          value={filterText}
          onChange={e => setFilterText(e.currentTarget.value.toLowerCase())}
        />
      </CustomInputGroup>

      {resources.length > 0 && (
        <DynamicSection data-testid="resources">
          {filterResources().map(cr => (
            <DisplayResource resource={cr} key={cr.slug} />
          ))}
        </DynamicSection>
      )}
    </PageWrapper>
  );
};
export default Resources;

const CustomInputGroup = styled(InputGroup)`
  max-width: 60rem;
  margin: 0 auto;
  padding-bottom: 4.8rem;
`;
