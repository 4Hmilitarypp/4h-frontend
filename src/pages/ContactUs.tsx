import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { IForm } from '../clientTypes'
import { Heading, InputGroup, Link, PageWrapper, SecondaryButton, SubHeading } from '../components/Elements'
import FlashContext from '../contexts/FlashContext'
import useErrorHandler from '../hooks/useErrorHandler'
import api from '../utils/api'
import { elevation } from '../utils/mixins'

const loadCaptcha = () => {
  const captchaScript = document.createElement('script')
  captchaScript.src = 'https://www.google.com/recaptcha/api.js?render=6LczLYsUAAAAAJ7UgMGSvCG-fCe9Q6seQrVIvLl9'
  captchaScript.type = 'text/javascript'
  document.body.appendChild(captchaScript)
}

const checkIfSpam = async () => {
  const token = await (window as any).grecaptcha.execute('6LczLYsUAAAAAJ7UgMGSvCG-fCe9Q6seQrVIvLl9', {
    action: 'contactUs',
  })
  return api.emails.checkIfSpam(token)
}

const ContactUs: React.FC<RouteComponentProps> = () => {
  const flashContext = React.useContext(FlashContext)
  const handleError = useErrorHandler()

  React.useEffect(() => loadCaptcha(), [])
  React.useEffect(() => window.scrollTo(0, 0), [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault()
    const { name, email, message } = e.currentTarget.elements

    try {
      const isSpam = await checkIfSpam()
      if (isSpam) {
        return flashContext.set({ message: 'you failed to pass the captcha test, please try again', isError: true })
      }
    } catch (err) {
      return handleError(err)
    }

    api.emails
      .contactUs({
        email: email.value,
        message: message.value,
        name: name.value,
      })
      .then(() => flashContext.set({ message: 'Your message was sent successfully, and you should hear back soon!' }))
      .catch(handleError)
  }

  return (
    <CustomPageWrapper>
      <Heading>Contact Us</Heading>
      <Content>
        <ContactInfo>
          <p>
            <strong>Phone Number:</strong> 785-532-1484
          </p>
          <p>
            <strong>Fax:</strong> 785-532-5505
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
        <InputGroup>
          <label htmlFor="message">Your Message</label>
          <Textarea id="message" cols={30} rows={10} placeholder="I just had a question about..." required={true} />
        </InputGroup>
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
  flex-wrap: wrap;
`
const ContactInfo = styled.div``
const Location = styled.div`
  padding: 1.2rem 0;
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
`
