import { navigate as reachNavigate, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { DynamicSection, Heading, P, PageWrapper, SubHeading } from '../../../components/Elements'
import Icon from '../../../components/Icon'
import { ICurriculumResourceWithLessons } from '../../../sharedTypes'
import api from '../../../utils/api'
import { elevation } from '../../../utils/mixins'
import Lesson from './Lesson'

interface IProps extends RouteComponentProps {
  slug?: string
  navigate?: any
}

const Resource: React.FC<IProps> = ({ slug, navigate }) => {
  Resource.defaultProps = {
    navigate: navigate || reachNavigate,
  }

  const [curriculumResource, setCurriculumResource] = React.useState<ICurriculumResourceWithLessons | undefined>(
    undefined
  )
  React.useEffect(() => {
    api.curriculumResources
      .getBySlug(slug || '')
      .then(r => setCurriculumResource(r))
      .catch(err => console.error(err))
  }, [])

  const { title, description, featuredImage, lessons } = curriculumResource
    ? curriculumResource
    : ({} as ICurriculumResourceWithLessons)

  return curriculumResource ? (
    <PageWrapper>
      <HeaderWrapper>
        <BackButton onClick={() => navigate('../')}>
          <BackIcon name="back" circleColor="#339966" arrowColor="#fff" />
          <BackText>Back To Resources</BackText>
        </BackButton>
        <Heading>{title}</Heading>
        <div style={{ width: 209 }} />
      </HeaderWrapper>
      <TitleSection>
        <P>{description}</P>
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
  ) : (
    <Heading>Not Found</Heading>
  )
}
export default Resource
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.2rem;
`
const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 5px;
  display: flex;
  transition: transform 0.2s ease-in;
  padding: 0 1.2rem;
  margin: 1.2rem 0;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`
const BackIcon = styled(Icon)`
  height: 3.2rem;
  width: 3.2rem;
`
const BackText = styled.span`
  color: ${props => props.theme.primary};
  font-size: 1.8rem;
  font-weight: 600;
  margin-left: 1.2rem;
`
const TitleSection = styled(DynamicSection)`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  align-items: center;
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
`
const CustomSubHeading = styled(SubHeading)`
  color: ${props => props.theme.primary};
`
