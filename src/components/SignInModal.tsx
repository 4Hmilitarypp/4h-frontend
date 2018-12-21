import { navigate } from '@reach/router'
import * as React from 'react'
import styled from 'styled-components/macro'
import { FormInputEvent, IApiError, IForm } from '../types'
import api from '../utils/api'
import { Button, InputGroup } from './Elements'
import Modal from './Modal'

interface IProps {
  initialOpen?: boolean
}

const formatError = (err: IApiError) => err.response.data.message

const SignInModal: React.FC<IProps> = ({ children, initialOpen = false }) => {
  const [on, setOn] = React.useState<boolean>(initialOpen)
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [password, setPassword] = React.useState<string>('')

  React.useEffect(
    () => {
      const timeout = setTimeout(() => setError(undefined), 3500)
      return () => {
        clearTimeout(timeout)
      }
    },
    [error]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> & IForm) => {
    e.preventDefault()
    const { email: submittedEmail, password: submittedPassword } = e.currentTarget.elements
    const elements = Array.from(e.currentTarget.elements)
    const shouldContinue = !elements.some((el: Partial<HTMLInputElement>) => !!el.required && el.value === '')
    if (shouldContinue) {
      api.auth
        .login({
          email: submittedEmail.value,
          password: submittedPassword.value,
        })
        .then(() => {
          setPassword('')
          setOn(false)
          navigate('/liaisons')
        })
        .catch((err: IApiError) => {
          setPassword('')
          setError(formatError(err))
        })
    } else {
      setError('All required fields not met.')
    }
  }

  const handlePasswordChange = (e: FormInputEvent) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  return (
    <>
      <div onClick={() => setOn(true)}>{children}</div>
      <Modal on={on} setOn={setOn}>
        <Header>
          <Heading>Enter your email and password</Heading>
        </Header>
        <Form onSubmit={handleSubmit}>
          {error && <Error>{error}</Error>}
          <InputGroup>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required={true} placeholder="brianna.smith@example.com" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required={true}
              value={password}
              onChange={handlePasswordChange}
              placeholder="password"
            />
          </InputGroup>
          <MyButton type="submit">Sign In</MyButton>
        </Form>
      </Modal>
    </>
  )
}

export default SignInModal

const Header = styled.div`
  background: ${props => props.theme.primaryGrey};
  padding: 0.7rem 2rem;
`
const Heading = styled.h2`
  text-align: center;
  color: ${props => props.theme.white};
  font-size: 2.2rem;
`
const Form = styled.form`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`
const Error = styled.h4`
  color: ${props => props.theme.warning};
  text-align: center;
  margin: -1rem;
`
const MyButton = styled(Button)`
  padding: 1.2rem 2.5rem;
  margin-top: 1.2rem;
  align-self: center;
`
