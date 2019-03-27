import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import BackButton from '../../../components/BackButton'
import { DynamicSection, Heading, P, PageWrapper, SubHeading } from '../../../components/Elements'
import useErrorHandler from '../../../hooks/useErrorHandler'
import { IResourceWithLessons } from '../../../sharedTypes'
import api from '../../../utils/api'
import { elevation, media } from '../../../utils/mixins'
import Lesson from './Lesson'

interface IProps extends RouteComponentProps {
  slug?: string
}

const Resource: React.FC<IProps> = ({ slug }) => {
  const [resource, setResource] = React.useState<IResourceWithLessons | undefined>(undefined)
  const handleError = useErrorHandler()

  React.useEffect(() => {
    api.resources
      .getBySlug(slug || '')
      .then(r => setResource(r))
      .catch(handleError)
  }, [])

  if (!resource) {
    return null
  }
  const { title, longDescription, featuredImage, lessons } = resource
  return (
    <PageWrapper data-testid="resource">
      <HeaderWrapper>
        <BackButton route={'/educators/resources'} title="Resources" />
        <Heading>{title}</Heading>
        <div style={{ width: 209 }} />
      </HeaderWrapper>
      <TitleSection>
        <P>{longDescription}</P>
        {featuredImage && <FeaturedImage src={featuredImage.url} alt={featuredImage.alt} />}
      </TitleSection>
      {lessons && (
        <Lessons>
          <CustomSubHeading>Lessons</CustomSubHeading>
          {lessons.map(l => (
            <Lesson key={l.title} lesson={l} />
          ))}
        </Lessons>
      )}
    </PageWrapper>
  )
}
export default Resource
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.2rem;
  ${media.tabletLand`
    flex-direction: column;
    padding: 0;
  `}
`
const TitleSection = styled(DynamicSection)`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  align-items: center;
  ${media.tabletLand`
    flex-direction: column;
  `}
`
const FeaturedImage = styled.img`
  margin-left: 4rem;
  height: 30rem;
  object-fit: cover;
`
const Lessons = styled.div`
  max-width: 90rem;
  margin: 4.8rem auto 0;
  ${elevation(3)};
  padding: 0 3.2rem 3.2rem;
  ${media.tabletLand`
    padding: 0 0 3.2rem;
    margin: 4.8rem -2rem 0;
  `}
`
const CustomSubHeading = styled(SubHeading)`
  color: ${props => props.theme.primary};
  ${media.tabletLand`
    font-size: 2rem;
  `}
`
