import { RouteComponentProps } from '@reach/router'
import Downshift from 'downshift'
import * as React from 'react'
import styled from 'styled-components/macro'
import Calendar from '../../components/calendarComponent/Calendar'
import { InputGroup, P, PageWrapper, Section, SubHeading } from '../../components/Elements'
import Icon from '../../components/Icon'
import { elevation } from '../../utils/mixins'

const CalendarPage: React.FC<RouteComponentProps> = () => {
  const getStates = () => [{ state: 'All' }]

  return (
    <PageWrapper>
      <ConstrainedSection>
        <SubHeading>Calendars</SubHeading>
        <P>
          4-H Military Partnerships provide a variety of camps, events, and opportunities for military-connected youth
          all across the country. No matter your location, 4-H is dedicated to creating a supportive and positive
          environment for individual growth and life-long success.
        </P>
        <P>Select your state below for a calendar of important dates and upcoming events near you!</P>
      </ConstrainedSection>
      <SubHeading>Important Dates</SubHeading>
      <Downshift>
        {({ getInputProps, getLabelProps, getRootProps, getMenuProps, getItemProps, isOpen }) => (
          <DownshiftContainer {...getRootProps()}>
            <FindInputGroup>
              <label {...getLabelProps({ name: 'region' })}>Enter a state or US Province</label>
              <div style={{ position: 'relative' }}>
                <FindInput className="input" {...getInputProps()} placeholder="All" />
                <ControllerButton>
                  <Icon name="arrow" isOpen={isOpen} />
                </ControllerButton>
              </div>
            </FindInputGroup>
            {isOpen ? (
              <Menu {...getMenuProps()}>
                {getStates().map((item, index) => (
                  <Item
                    key="filler"
                    {...getItemProps({
                      item,
                      key: item.state,
                    })}
                  >
                    {item && item.state}
                  </Item>
                ))}
              </Menu>
            ) : null}
          </DownshiftContainer>
        )}
      </Downshift>
      <Calendar />
    </PageWrapper>
  )
}
export default CalendarPage

const ConstrainedSection = styled(Section)`
  max-width: 64rem;
`
const FindInput = styled.input`
  &.input {
    background: ${props => props.theme.primaryBackground};
  }
`
const FindInputGroup = styled(InputGroup)`
  max-width: 64rem;
  margin: 0 auto;
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
const DownshiftContainer = styled.div`
  position: relative;
  max-width: 40rem;
  margin: 0 auto;
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
