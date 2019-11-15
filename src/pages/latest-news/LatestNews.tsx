import { Link, RouteComponentProps } from '@reach/router'
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import useErrorHandler from '../../hooks/useErrorHandler'
import { ILatestNews } from '../../sharedTypes'
import api from '../../utils/api'
import { elevation } from '../../utils/mixins'
import { InputGroup } from '../../components/Elements'

interface IProps extends RouteComponentProps {
  article: ILatestNews
  index: number
}

const LatestNews: React.FC<RouteComponentProps> = () => {
  const [filterText, setFilterText] = React.useState<string>('')
  const [news, setNews] = React.useState<ILatestNews[]>()
  const handleError = useErrorHandler()

  const filterArticles = () =>
    news
      ? news.filter(
          article =>
            !filterText ||
            article.title.toLowerCase().includes(filterText) ||
            article.shortDescription.toLowerCase().includes(filterText)
        )
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
          Keep up with the latest news regarding the 4-H Military Partnerships, its events, and its members.
        </SubHeading>
        <SearchLabel>Search for an article</SearchLabel>
        <SearchBar>
          <input value={filterText} onChange={e => setFilterText(e.currentTarget.value.toLowerCase())} />
        </SearchBar>
      </HeaderSection>
      <ContentSection>
        {news ? (
          filterArticles().map((article, index) => (
            <LatestNewsItem key={article.title} article={article} index={index} />
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </ContentSection>
    </MainContent>
  )
}

const LatestNewsItem: React.FC<IProps> = ({ article, index }) => {
  const trimDescription = (description: string) => {
    if (description.length > 740) {
      return description.slice(0, 737) + '...'
    }
    return description
  }
  return (
    <BlogArticle>
      <BlogHeading>{article.title}</BlogHeading>
      <LearnMore to={article.slug}>View</LearnMore>
      <BlogSubHeading>Written by: {article.author}</BlogSubHeading>
      <BlogSubHeading>Written on: {new Date(article.createdAt).toDateString()}</BlogSubHeading>
      <BlogSubHeading>Last Updated: {new Date(article.updatedAt).toDateString()}</BlogSubHeading>
      <BlogContent>
        <FeaturedImage
          src={article.featuredImage ? article.featuredImage.url : ''}
          alt={article.featuredImage ? article.featuredImage.alt : 'Article Featured Image'}
        />
        <BlogBody>{Parser(trimDescription(article.shortDescription))}</BlogBody>
      </BlogContent>
    </BlogArticle>
  )
}

export default LatestNews

const MainContent = styled.div``
const MainHeading = styled.h1`
  margin: 0;
`
const HeaderSection = styled.div`
  border: 2px solid ${props => props.theme.white};
  background-color: #339966;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  padding: 15px;
  text-align: center;
  color: ${props => props.theme.white};
  filter: drop-shadow(5px 5px 4px grey);
  border-radius: 5px;
`
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
const BlogHeading = styled.h1`
  color: ${props => props.theme.primaryBlack};
  font-size: 25px;
  clear: right;
`
const BlogArticle = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
  background: ${props => props.theme.primaryBackground};
  padding: 10px 30px;
  filter: drop-shadow(5px 5px 4px grey);
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
const BlogSubHeading = styled.h4`
  margin: 0;
`
const BlogContent = styled.div`
  margin: 2rem 0 1.2rem;
  display: flex;
`
const BlogBody = styled.p`
  color: ${props => props.theme.secondaryGrey};
  padding: 0 2.4rem;
`
const FeaturedImage = styled.img`
  height: 20rem;
  display: block;
  object-fit: fill;
  border-radius: 5px;
  ${elevation(4)}
`
