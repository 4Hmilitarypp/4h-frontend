import { RouteComponentProps } from '@reach/router'
import Downshift from 'downshift'
import * as React from 'react'
import styled from 'styled-components/macro'
import { InputGroup } from '../components/Elements'
import Icon from '../components/Icon'
import useErrorHandler from '../hooks/useErrorHandler'
import { ICamp } from '../sharedTypes'
import api from '../utils/api'
import { elevation } from '../utils/mixins'

const PracticeArea: React.FC<RouteComponentProps> = () => {
  const [camps, setCamps] = React.useState<ICamp[]>([])
  const handleError = useErrorHandler()
  const sortCampsByDate = (campA: ICamp, campB: ICamp) => {
    if (!campA.dates.length) return 1
    if (!campB.dates.length) return -1
    return campA.dates[0].beginDate > campB.dates[0].beginDate ? 1 : -1
  }

  React.useEffect(() => {
    api.camps
      .get()
      .then(c => {
        const sorted = c.sort(sortCampsByDate)
        setCamps(sorted)
      })
      .catch(handleError)
  }, [])
  const getFilteredCamps = () => [
    { serviceBranch: 'Army' },
    { serviceBranch: 'Navy' },
    ...camps
      .sort((a, b) => (a.serviceBranch > b.serviceBranch ? 1 : -1))
      .reduce<ICamp[]>((arr, item) => {
        if (!arr.some(camp => camp.serviceBranch === item.serviceBranch)) arr.push(item)
        return arr
      }, []),
  ]

  return (
    <Downshift itemToString={item => (item ? item.serviceBranch : '')} initialInputValue="Army">
      {({ closeMenu, getRootProps, getInputProps, getLabelProps, isOpen, getMenuProps, openMenu, getItemProps }) => (
        <DownshiftContainer {...getRootProps()}>
          <FindInputGroup>
            <label {...getLabelProps()}>Filter Camps By Branch</label>
            <div style={{ position: 'relative' }}>
              <RequestInput {...getInputProps()} readOnly={true} onClick={() => (isOpen ? closeMenu() : openMenu())} />
              <ControllerButton
                onClick={() => (isOpen ? closeMenu() : openMenu())}
                data-testid="controller-button"
                type="button"
              >
                <Icon name="arrow" isOpen={isOpen} />
              </ControllerButton>
            </div>
          </FindInputGroup>
          {isOpen ? (
            <Menu {...getMenuProps()}>
              {getFilteredCamps().map((item, index) => (
                <Item
                  key="filler"
                  {...getItemProps({
                    item,
                    key: item.serviceBranch,
                  })}
                >
                  {item && item.serviceBranch}
                </Item>
              ))}
            </Menu>
          ) : null}
        </DownshiftContainer>
      )}
    </Downshift>
  )
}

const DownshiftContainer = styled.div`
  position: relative;
  max-width: 40rem;
  margin: 0 auto;
`
const FindInputGroup = styled(InputGroup)`
  max-width: 64rem;
  margin: 0 auto;
`
const RequestInput = styled.input`
  background: ${props => props.theme.primaryBackground};
  height: 3.7rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`
const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 4rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const Menu = styled.ul`
  ${elevation(3)};
  background: ${props => props.theme.primaryBackground};
  position: absolute;
  width: 100%;
  z-index: 10;
`
const Item = styled.li`
  padding: 0.4rem 1.5rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`
export default PracticeArea
