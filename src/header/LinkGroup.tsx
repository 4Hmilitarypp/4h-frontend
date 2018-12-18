import { Link } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { IBackgroundCoords, Omit } from '../types'

interface IProps {
  manageBackground: {
    setCoords: (coords: Omit<IBackgroundCoords, 'open'>) => void
    setOpen: (open: boolean) => void
    navRef: React.RefObject<HTMLDivElement>
  }
  title: string
  to: string
}

const UnstyledLinkGroup: React.FC<IProps> = ({ children, manageBackground, title, to, ...rest }) => {
  const divRef = React.useRef<HTMLDivElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const handleClick = () => {
    manageBackground.setOpen(false)
    hideDropdownAndBackground()
  }

  const handleBlur = (e: any) => {
    const { currentTarget, target, relatedTarget }: { [key: string]: HTMLElement } = e
    if (!relatedTarget) {
      hideDropdownAndBackground()
      return
    }
    if (
      relatedTarget.parentNode !== currentTarget.parentNode &&
      relatedTarget.parentNode !== target.nextElementSibling &&
      relatedTarget.parentNode !== target.parentNode
    ) {
      hideDropdownAndBackground()
      return
    }
    if (dropdownRef.current) {
      dropdownRef.current.focus()
    }
  }

  const showDropDownAndBackground = (e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => {
    const divNode = divRef.current
    const dropdownNode = dropdownRef.current
    if (divNode) {
      divNode.classList.add('trigger-enter')
      setTimeout(
        () => divNode.classList.contains('trigger-enter') && divNode.classList.add('trigger-enter-active'),
        150
      )
      manageBackground.setOpen(true)
    }
    if (dropdownNode && manageBackground.navRef.current) {
      const dropdownCoords = dropdownNode.getBoundingClientRect()
      const navCoords = manageBackground.navRef.current.getBoundingClientRect()
      const coords = {
        height: dropdownCoords.height,
        left: dropdownCoords.left,
        top: dropdownCoords.top - navCoords.top,
        width: dropdownCoords.width,
      }

      manageBackground.setCoords(coords)
    }
  }
  const hideDropdownAndBackground = () => {
    if (divRef.current) {
      divRef.current.classList.remove('trigger-enter', 'trigger-enter-active')
    }
    manageBackground.setOpen(false)
  }
  return (
    <div
      {...rest}
      ref={divRef}
      onFocus={showDropDownAndBackground}
      onBlur={handleBlur}
      onClick={handleClick}
      onMouseEnter={showDropDownAndBackground}
      onMouseLeave={hideDropdownAndBackground}
    >
      <DropdownTitle to={to} tabIndex={0}>
        {title}
      </DropdownTitle>
      <Dropdown ref={dropdownRef as any}>{children}</Dropdown>
    </div>
  )
}

const DropdownTitle = styled(Link)`
  color: ${(props: any) => props.theme.secondary};
  font-size: 1.8rem;
  margin: 2rem 0.5rem;
  padding: 0 0.5rem;
  font-weight: 500;
  &:hover {
    cursor: default;
  }
`
const Dropdown = styled.div`
  opacity: 0;
  position: absolute;
  overflow: hidden;
  padding: 1rem 1.5rem;
  transform: translateY(6rem);
  border-radius: 2px;
  transition: all 0.5s;
  color: ${props => props.theme.gray};
  will-change: opacity;
  display: none;
  p {
    white-space: nowrap;
  }
`
const LinkGroup = styled(UnstyledLinkGroup)`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 11;
  &.trigger-enter {
    ${Dropdown} {
      display: block;
    }
  }
  &.trigger-enter-active {
    ${Dropdown} {
      opacity: 1;
    }
  }
  &:hover {
    ${DropdownTitle} {
      opacity: 0.8;
    }
  }
`

export default LinkGroup
