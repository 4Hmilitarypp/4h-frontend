// @ts-ignore
import Parser from 'html-react-parser'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Button } from '../../../components/Elements'

interface IProps {
  categories: string[]
  categorySelected: (categories: string[]) => void
}

const FilterCategoriesDisplay: React.FC<IProps> = ({ categories, categorySelected }) => {
  const allCategoriesText = 'All Categories'
  const [selectedCategory, setSelectedCategory] = React.useState<string>(allCategoriesText)

  const handleCategoryClicked = (e: MouseEvent) => {
    if (e.currentTarget) {
      const category = (e.currentTarget as HTMLButtonElement).textContent || allCategoriesText
      setSelectedCategory(category)
      const filteredCategories = categories.filter(cat => (category === allCategoriesText ? true : category === cat))
      categorySelected(filteredCategories)
    }
  }
  return (
    <FilterWrapper>
      <CategoryButton onClick={handleCategoryClicked} className={selectedCategory === allCategoriesText && 'active'}>
        {allCategoriesText}
      </CategoryButton>
      {categories.map(category => (
        <CategoryButton
          onClick={handleCategoryClicked}
          className={selectedCategory === category && 'active'}
          key={category}
        >
          {category}
        </CategoryButton>
      ))}
    </FilterWrapper>
  )
}

export default FilterCategoriesDisplay

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const CategoryButton = styled(Button)`
  padding: 0.4rem 1.2rem;
  white-space: nowrap;
  &:not(.active) {
    color: hsla(150, 40%, 20%, 1);
    background: hsla(150, 35%, 75%, 1);
  }
  margin: 0 0.8rem 1.6rem;
`
