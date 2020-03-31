// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import BackButton from '../../components/BackButton'
import { Button, DynamicSection, Heading, PageWrapper } from '../../components/Elements'
import useErrorHandler from '../../hooks/useErrorHandler'
import { ILatestNews } from '../../sharedTypes'
import api from '../../utils/api'
import { elevation, media } from '../../utils/mixins'
import { RouteComponentProps } from '@reach/router'
import EmbedDocument from '../../components/EmbedDocument'

interface IArticleProps extends RouteComponentProps {
  slug?: string
}

function LatestNewsArticle({ slug }: IArticleProps) {
  const [article, setArticle] = React.useState<ILatestNews>()
  const [clickedResource, setClickedResource] = React.useState<string | false | undefined>()
  const handleError = useErrorHandler()

  React.useEffect(() => {
    api.latestNews
      .getBySlug(slug || '')
      .then(p => setArticle(p))
      .catch(handleError)
  }, [])

  return (
    <CustomPageWrapper>
      <EmbedDocument
        url={clickedResource || ''}
        title="Additional Resource"
        open={!!clickedResource}
        setOpen={setClickedResource}
      />
      {article ? (
        <PartnerWrapper>
          <HeaderWrapper>
            <BackButton route={'/latest-news'} title="Latest News" />
            <CustomHeading>{article.title}</CustomHeading>
            <div style={{ width: 209 }} />
          </HeaderWrapper>
          <Hero>
            <HeroImages>
              <FeaturedImage src={article.featuredImage.url} alt={article.featuredImage.alt} />
            </HeroImages>
            <Description>{Parser(article.body)}</Description>
            {article.resourceUrl && (
              <ResourceButton onClick={() => setClickedResource(article.resourceUrl)}>
                Additional Resources
              </ResourceButton>
            )}
          </Hero>
          <BlogSubHeading>Written By: {article.author}</BlogSubHeading>
          <BlogSubHeading>Created At: {new Date(article.createdAt).toDateString()}</BlogSubHeading>
          <BlogSubHeading>Last Updated: {new Date(article.updatedAt).toDateString()}</BlogSubHeading>
        </PartnerWrapper>
      ) : null}
    </CustomPageWrapper>
  )
}

export default LatestNewsArticle

const ResourceButton = styled(Button)`
  margin-top: 5px;
`
const CustomPageWrapper = styled(PageWrapper)`
  ${media.tabletLand`
    padding: 0;
  `}
`
const PartnerWrapper = styled.div`
  border: 2px solid #0e8147;
  ${elevation(6)};
  margin: 2rem;
  padding-bottom: 2rem;
  ${media.tabletLand`
    margin: 2rem 0;
  `}
`
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.2rem;
  ${media.tabletLand`
    flex-direction: column;
    padding: 2rem 0 0;
  `}
`
const SubHeading = styled.h5`
  margin: 10px 0 5px 25px;
`
const BlogSubHeading = styled(SubHeading)`
  padding: 5px;
`
const CustomHeading = styled(Heading)`
  ${media.tabletLand`
    padding: 1.2rem 0;
  `}
`
const Hero = styled.section`
  display: block;
  justify-content: center;
  padding: 0 4rem;
  align-items: center;
  ${media.tabletLand`
    flex-direction: column;
    padding: 0;
  `}
`
const HeroImages = styled.div`
  display: flex;
  justify-content: center;
  ${media.tabletLand` 
    padding-top: 3.2rem;
  `}
`
const FeaturedImage = styled.img`
  height: 20rem;
  width: 100%;
  display: block;
  margin: 0 auto;
  object-fit: contain;
`
const Description = styled(DynamicSection)`
  padding-right: 3.2rem;
  padding-top: 2rem;
  ${media.tabletLand`
    padding: 2rem 2.4rem 0;
    margin: 0;
    max-width: 100%;
    word-wrap: break-word;
  `}
`
