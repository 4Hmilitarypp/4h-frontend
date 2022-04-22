import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  DynamicSection,
  Heading,
  PageWrapper,
  SubHeading,
} from '../../../components/Elements';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { IWebinar } from '../../../sharedTypes';
import api from '../../../utils/api';
import { media } from '../../../utils/mixins';
import FilterCategoriesDisplay from './FilterCategoriesDisplay';
import Webinar from './Webinar';

const Webinars: React.FC<RouteComponentProps> = () => {
  const [webinars, setWebinars] = React.useState<IWebinar[] | undefined>(
    undefined,
  );
  const [categories, setCategories] = React.useState<string[] | undefined>(
    undefined,
  );
  const [filteredCategories, setFilteredCategories] = React.useState<string[]>(
    [],
  );
  const handleError = useErrorHandler();

  React.useEffect(() => {
    api.webinars
      .get()
      .then(w => {
        setWebinars(w);
        const cats = w.reduce((arr: string[], webinar) => {
          if (!arr.includes(webinar.category)) {
            arr.push(webinar.category);
          }
          return arr;
        }, []);
        setCategories(cats);
        setFilteredCategories(cats);
      })
      .catch(handleError);
  }, []);

  const handleCategorySelected = (cats: string[]) =>
    setFilteredCategories(cats);

  return webinars && categories ? (
    <PageWrapper>
      <Heading>Webinars</Heading>
      <FilterCategoriesDisplay
        categories={categories}
        categorySelected={handleCategorySelected}
      />
      <WebinarList>
        {filteredCategories.map(category => (
          <DynamicSection key={category}>
            <CategoryHeading>{category}</CategoryHeading>
            {webinars
              .filter(webinar => webinar.category === category)
              .map(webinar => (
                <Webinar key={webinar.title} webinar={webinar} />
              ))}
          </DynamicSection>
        ))}
      </WebinarList>
    </PageWrapper>
  ) : (
    <h1>Loading...</h1>
  );
};
export default Webinars;
const CategoryHeading = styled(SubHeading)`
  color: ${props => props.theme.primaryGrey};
  padding-bottom: 2rem;
`;
const WebinarList = styled.div`
  padding-top: 3.2rem;
  ${media.tabletLand`
    padding-top: 1.6rem;
  `}
`;
