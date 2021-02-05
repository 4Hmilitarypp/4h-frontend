import Parser from 'html-react-parser'
import { Link, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import useErrorHandler from '../../hooks/useErrorHandler'
import { ILatestNews } from '../../sharedTypes'
import api from '../../utils/api'
import { elevation, media } from '../../utils/mixins'
import { DynamicSection, InputGroup } from '../../components/Elements'
import useTrimDescription from '../../hooks/useTrimDescription'

interface ILatestNewsProps extends RouteComponentProps {
  article: ILatestNews
  index: number
}

const LatestNews: React.FC<RouteComponentProps> = () => {
  const [filterText, setFilterText] = React.useState<string>('')
  const [news, setNews] = React.useState<ILatestNews[]>([])
  const handleError = useErrorHandler()

  const filterNews = () =>
    news
      ? news
          .filter(
            article =>
              !filterText ||
              article.title.toLowerCase().includes(filterText) ||
              article.shortDescription.toLowerCase().includes(filterText)
          )
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      : []

  React.useEffect(() => {
    api.latestNews
      .get()
      .then(p => {
        setNews(p)
      })
      .catch(handleError)
  }, [])
  return (
    <MainContent>
      <HeaderSection>
        <MainHeading>4-H Military News</MainHeading>
        <SubHeading>
          Keep up with the latest news regarding the 4-H Military Partnership, its events, and its members.
        </SubHeading>
        <SearchLabel>Search for an article</SearchLabel>
        <SearchBar>
          <input value={filterText} onChange={e => setFilterText(e.currentTarget.value.toLowerCase())} />
        </SearchBar>
      </HeaderSection>
      <ContentSection>
        {news ? (
          filterNews().map((article, index) => <LatestNewsItem key={article.title} article={article} index={index} />)
        ) : (
          <h2>Loading...</h2>
        )}
      </ContentSection>
    </MainContent>
  )
}

const LatestNewsItem: React.FC<ILatestNewsProps> = ({ article, index }) => {
  const descriptionRef = React.useRef<HTMLDivElement>(null)
  console.log(descriptionRef)
  const { trimDescription, showExpand, setTrimDescription } = useTrimDescription(
    descriptionRef,
    article.shortDescription
  )

  const handleExpandClicked = () => {
    setTrimDescription(!trimDescription)
  }
  return (
    <BlogArticle>
      <BlogHeading>{article.title}</BlogHeading>
      <LearnMore to={article.slug}>View</LearnMore>
      <BlogSubHeading>Written by: {article.author}</BlogSubHeading>
      <BlogSubHeading>Written on: {new Date(article.createdAt).toDateString()}</BlogSubHeading>
      <BlogBody>
        <FeaturedImage src={article.featuredImage.url} alt={article.featuredImage.alt} />
        <div>
          <Description>{Parser(article.shortDescription)}</Description>
          {showExpand && (
            <>
              <Ellipses>{trimDescription ? '. . .' : ''}</Ellipses>
              <Expand onClick={handleExpandClicked}>{trimDescription ? 'expand' : 'collapse'}</Expand>
            </>
          )}
        </div>
      </BlogBody>
    </BlogArticle>
    /*
    <BlogArticle>
      <BlogHeading>{article.BlogHeading}</BlogHeading>
      <LearnMore to={article.slug}>View</LearnMore>
      <BlogSubHeading>Written by: {article.author}</BlogSubHeading>
      <BlogSubHeading>Written on: {new Date(article.createdAt).toDateString()}</BlogSubHeading>
      <BlogSubHeading>Last Updated: {new Date(article.updatedAt).toDateString()}</BlogSubHeading>
      <BlogContent>
        <FeaturedImage
          src={article.featuredImage ? article.featuredImage.url : ''}
          alt={article.featuredImage ? article.featuredImage.alt : 'Article Featured Image'}
        />
        <BlogBody>
          <Text>
            <Description ref={descriptionRef} className={trimDescription ? 'trim' : ''}>
              {Parser(article.shortDescription)}
            </Description>
          </Text>
        </BlogBody>

      </BlogContent>
    </BlogArticle>
    */
  )
}

export default LatestNews

const LearnMore = styled(Link)`
  float: right;
  padding: 0.4rem 1.5rem;
  background: #0e8147;
  font-size: 1.8rem;
  border-radius: 5px;
  color: ${props => props.theme.white};
  font-weight: 500;
  &:hover {
    transform: none;
    opacity: 1;
    background: #339966;
  }
`
const BlogArticle = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
  background: ${props => props.theme.primaryBackground};
  padding: 10px 30px;
  ${elevation(3)};
`
const BlogHeading = styled.h1`
  color: ${props => props.theme.primaryBlack};
  font-size: 25px;
  clear: right;
`
const BlogSubHeading = styled.h4`
  margin: 0;
`
const Ellipses = styled.span`
  display: block;
  color: ${props => props.theme.primaryGrey};
  text-align: center;
  font-size: 3.2rem;
  line-height: 0.4;
  padding-top: 0.4rem;
`
const Expand = styled.button`
  background: none;
  border: none;
  display: block;
  color: ${props => props.theme.primaryLink};
  font-weight: 500;
  margin: 1.6rem auto 0;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
const FeaturedImage = styled.img`
  clear: right;
  height: 20rem;
  display: block;
  margin: 1.2rem;
  padding: 1.2rem;
  object-fit: contain;
  border-radius: 5px;
`
const BlogBody = styled.div`
  display: flex;
  ${media.tabletLand`
    flex-direction: column;
  `}
}
`

const MainContent = styled.div``
const MainHeading = styled.h1`
  margin: 0;
`
const HeaderSection = styled.div`
  border: 2px solid ${props => props.theme.white};
  background-color: #339966;
  margin-bottom: 30px;
  padding: 15px;
  text-align: center;
  color: ${props => props.theme.white};
  filter: drop-shadow(5px 5px 4px grey);
  border-radius: 5px;
`

const ContentSection = styled.div`
  display: grid;
`
const SearchLabel = styled.label`
  font-size: 1.8rem;
`
const SearchBar = styled(InputGroup)`
  max-width: 50rem;
  margin: 1.2rem auto;
  input {
    font-weight: 500;
  }
`
const SubHeading = styled.h3`
  margin: 0 0 25px 0;
`

const Description = styled(DynamicSection)`
  max-width: 70rem;
  padding-bottom: 2rem;
  padding-right: 3.2rem;
  padding-top: 2rem;
`
