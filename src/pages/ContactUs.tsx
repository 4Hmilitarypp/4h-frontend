import { Link, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { Heading, InputGroup, PageWrapper, SecondaryButton, SubHeading } from '../components/Elements'
import Flash from '../components/Flash'
import { useFlash } from '../hooks/hooks'
import { IApiError, IForm } from '../types'
import api from '../utils/api'
import { elevation } from '../utils/mixins'

const ContactUs: React.FC<RouteComponentProps> = () => {
  const { submitted, setSubmitted, error, setError } = useFlash({ initialSubmitted: false })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault()
    const { name, email, message } = e.currentTarget.elements
    const elements = Array.from(e.currentTarget.elements)
    const shouldContinue = !elements.some((el: Partial<HTMLInputElement>) => !!el.required && el.value === '')
    if (shouldContinue) {
      setSubmitted(true)
      api.emails
        .create({
          email: email.value,
          message: message.value,
          name: name.value,
        })
        .then(() => setSubmitted(true))
        .catch(({ response }: IApiError) => setError(response.data.message))
    } else {
      setError('All required fields not met.')
    }
  }

  const flashClosedClicked = () => setError(undefined)

  return (
    <CustomPageWrapper>
      <Flash
        successMessage={submitted && !error ? 'Email sent successfully' : undefined}
        submitted={submitted}
        error={error}
        closeClicked={flashClosedClicked}
      />
      <CustomHeading>Contact Us</CustomHeading>
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
          <StyledLink to="/find-a-liaison">your region's liaison</StyledLink>
        </CustomP>
        <LeftAndRight>
          <InputGroup>
            <label htmlFor="name">Your Name</label>
            <input type="name" id="name" placeholder="Jane Smith" required={true} />
          </InputGroup>
          <InputGroup>
            <label htmlFor="email">Your Email Address</label>
            <input type="email" id="email" placeholder="janesmith123@example.com" required={true} />
          </InputGroup>
        </LeftAndRight>
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
  padding: 0 2rem;
`
const CustomHeading = styled(Heading)`
  color: ${props => props.theme.secondary};
  text-align: center;
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
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
`
const Flag = styled.img`
  height: 20rem;
  padding-left: 10rem;
`
const CustomP = styled.p`
  font-size: 1.8rem;
  padding-bottom: 3.2rem;
`
const LeftAndRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const StyledLink = styled(Link)`
  color: ${props => props.theme.secondary};
  font-size: 1.8rem;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`
