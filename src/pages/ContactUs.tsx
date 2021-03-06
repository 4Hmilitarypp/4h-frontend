import { RouteComponentProps } from '@reach/router'
import Downshift from 'downshift'
import * as React from 'react'
import styled from 'styled-components/macro'
import { theme } from '../App'
import { IForm } from '../clientTypes'
import { Heading, InputGroup, Link, PageWrapper, SecondaryButton, SubHeading } from '../components/Elements'
import Icon from '../components/Icon'
import FlashContext from '../contexts/FlashContext'
import useErrorHandler from '../hooks/useErrorHandler'
import api from '../utils/api'
import { elevation, media } from '../utils/mixins'

const loadCaptcha = () => {
  const captchaScript = document.createElement('script')
  captchaScript.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_CAPTCHA_PUBLIC}`
  captchaScript.type = 'text/javascript'
  document.body.appendChild(captchaScript)
}

const checkIfSpam = async () => {
  const token = await (window as any).grecaptcha.execute(process.env.REACT_APP_CAPTCHA_PUBLIC, {
    action: 'contactUs',
  })
  return api.emails.checkIfSpam(token)
}

const ContactUs: React.FC<RouteComponentProps> = () => {
  const [selectedRequest, setSelectedRequest] = React.useState(undefined)
  const flashContext = React.useContext(FlashContext)
  const handleError = useErrorHandler()

  React.useEffect(() => loadCaptcha(), [])
  React.useEffect(() => window.scrollTo(0, 0), [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault()
    const { name, email, message } = e.currentTarget.elements

    if (process.env.NODE_ENV !== 'development') {
      try {
        const isSpam = await checkIfSpam()
        if (isSpam) {
          return flashContext.set({ message: 'you failed to pass the captcha test, please try again', isError: true })
        }
      } catch (err) {
        return handleError(err)
      }
    }

    api.emails
      .contactUs({
        category: selectedRequest,
        email: email.value,
        message: message.value,
        name: name.value,
      })
      .then(() => flashContext.set({ message: 'Your message was sent successfully, and you should hear back soon!' }))
      .catch(handleError)
  }

  const requestReasons = [
    { value: 'Request for Training' },
    { value: 'Request for Curriculum' },
    { value: 'Request for Presentation' },
    { value: 'Request for Connection with State Personnel' },
    { value: 'Request for other: describe' },
  ]

  return (
    <CustomPageWrapper>
      <Heading>Contact Us</Heading>
      <Content>
        <ContactInfo>
          <p>
            <strong>Phone Number:</strong> 785-532-1484
          </p>
          <p>
            <strong>Fax:</strong> 785-532-2036
          </p>
          <Location>
            <p>1810 Kerr Dr</p>
            <p>A203 Edwards Hall</p>
            <p>Manhattan, KS 66506</p>
          </Location>
          <p>
            <strong>Office hours:</strong> 8am-5pm
          </p>
        </ContactInfo>
        <Flag
          src="https://res.cloudinary.com/four-hmpp/image/upload/v1542786300/AmericanFlag.jpg"
          alt="American Flag"
        />
      </Content>
      <SubHeading>Send A Message</SubHeading>
      <ContactUsForm onSubmit={handleSubmit}>
        <CustomP>
          Feel free to contact us about any questions you have. You may also want to contact{' '}
          <CustomLink to="/find-a-liaison">your region's liaison</CustomLink>
        </CustomP>
        <NameAndEmail>
          <NameInputGroup>
            <label htmlFor="name">Your Name</label>
            <input type="name" id="name" placeholder="Jane Smith" required={true} />
          </NameInputGroup>
          <InputGroup>
            <label htmlFor="email">Your Email Address</label>
            <input type="email" id="email" placeholder="janesmith123@example.com" required={true} />
          </InputGroup>
        </NameAndEmail>
        <Downshift
          onChange={selection => setSelectedRequest(selection ? selection.value : '')}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            clearSelection,
            closeMenu,
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            isOpen,
            openMenu,
          }) => (
            <div>
              <FindInputGroup>
                <label {...getLabelProps()}>Select A Request Category</label>
                <div style={{ position: 'relative' }}>
                  <RequestInput {...getInputProps()} readOnly={true} />
                  <ControllerButton
                    onClick={() => {
                      if (!isOpen) {
                        openMenu()
                      } else {
                        closeMenu()
                      }
                      if (selectedRequest) {
                        clearSelection()
                        openMenu()
                      }
                    }}
                    data-testid="controller-button"
                    type="button"
                  >
                    <Icon name="arrow" isOpen={isOpen} />
                  </ControllerButton>
                </div>
              </FindInputGroup>
              {isOpen ? (
                <Menu {...getMenuProps()}>
                  {requestReasons.map((item, index) => (
                    // tslint:disable-next-line
                    <Item
                      {...getItemProps({
                        item,
                        key: item.value,
                        style: {
                          background: index === highlightedIndex ? theme.secondary : '',
                          color: index === highlightedIndex ? theme.white : theme.secondaryGrey,
                        },
                      })}
                    >
                      {item && item.value}
                    </Item>
                  ))}
                </Menu>
              ) : null}
            </div>
          )}
        </Downshift>
        <MessageGroup>
          <label htmlFor="message">Your Message</label>
          <Textarea id="message" cols={30} rows={10} required={true} placeholder="Have a question? Ask Us Here!" />
        </MessageGroup>
        <SecondaryButton type="submit" style={{ alignSelf: 'center' }}>
          Send Message
        </SecondaryButton>
      </ContactUsForm>
    </CustomPageWrapper>
  )
}
export default ContactUs

const CustomPageWrapper = styled(PageWrapper)`
  padding: 0 2rem 3.2rem;
`
const Textarea = styled.textarea`
  ${elevation(3)};
  border-radius: 5px;
  width: 100%;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0 4rem;
  align-items: center;
  ${media.tabletPort`
    flex-direction: column;
    padding-top: 0rem;
  `}
`
const ContactInfo = styled.div``
const Location = styled.div`
  padding: 1.2rem 0;
`
const FindInputGroup = styled(InputGroup)`
  margin: 0 auto;
`
const RequestInput = styled.input`
  background: ${props => props.theme.secondaryBackground};
  height: 3.7rem;
  border-radius: 5px;
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
  background: ${props => props.theme.secondaryBackground};
`
const Item = styled.li`
  padding: 0.4rem 1.5rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`
const ContactUsForm = styled.form`
  max-width: 70.7rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  input,
  textarea {
    background: ${props => props.theme.secondaryBackground} !important;
  }
`
const Flag = styled.img`
  height: 20rem;
  padding-left: 10rem;
  ${media.tabletPort`
    padding: 2.4rem 0 0;
  `}
`
const CustomP = styled.p`
  font-size: 1.8rem;
  padding-bottom: 3.2rem;
`
const CustomLink = styled(Link)`
  font-size: 1.8rem;
  color: ${props => props.theme.secondary};
`
const NameAndEmail = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const NameInputGroup = styled(InputGroup)`
  margin-right: 3.2rem;
  ${media.tabletPort`
    margin-right: 0;
  `}
`
const MessageGroup = styled(InputGroup)`
  margin-top: 1.6rem;
`
