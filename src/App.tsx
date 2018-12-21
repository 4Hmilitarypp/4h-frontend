import { Router } from '@reach/router'
import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import Header from './header/Header'
import About from './pages/About'
import About4HClub from './pages/About4HClub'
import ContactUs from './pages/ContactUs'
import Educator from './pages/educator/Educator'
import EducatorHome from './pages/educator/EducatorHome'
import Research from './pages/educator/Research'
import Resources from './pages/educator/Resources'
import Webinars from './pages/educator/webinars/Webinars'
import Events from './pages/Events'
import FindLiaison from './pages/findLiaison/FindLiaison'
import GetInvolved4HClub from './pages/GetInvolved4HClub'
import Home from './pages/Home'
import Icons from './pages/Icons'
import NotFound from './pages/NotFound'
import Partner from './pages/Partner'
import Partners from './pages/partners/Partners'
import Photos from './pages/Photos'

export const theme = {
  lightGrey: 'hsl(150, 20%, 40%)',
  offWhite: 'hsl(150, 40%, 96%)',
  primary: 'hsl(150, 50%, 40%)',
  primaryBackground: 'hsl(150,39%,96%)',
  primaryBlack: 'hsl(150, 20%, 20%)',
  primaryDark: 'hsl(150, 39%, 27%)',
  primaryGrey: 'hsl(150, 6%, 31%)',
  primaryLight: 'hsl(149, 32%, 85%)',
  primaryLink: 'hsl(150, 80%, 28%)',
  secondary: 'hsl(266, 55%, 35%)',
  secondaryBackground: 'hsl(268, 48%, 95%)',
  secondaryBlack: 'hsl(266, 20%, 20%)',
  secondaryGrey: 'hsl(266, 6%, 31%)',
  secondaryLight: 'hsl(266, 32%, 85%)',
  secondaryMiddle: 'hsl(266, 33%, 55%)',
  success: 'hsl(154, 90%, 41%)',
  warning: 'hsl(0, 100%, 37%)',
  white: 'hsl(0, 0%, 100%)',
}

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div data-testid="app">
          <GlobalStyle />
          <Router>
            <Header path="/*" />
          </Router>
          <Router primary={false}>
            <Home path="/" />
            <About path="/about" />
            <Partners path="/partners" />
            <Partner path="/partners/:slug" />
            <Events path="/events" />
            <Photos path="/photos" />
            <About4HClub path="/4-h-club" />
            <GetInvolved4HClub path="/4-h-club/get-involved" />
            <Educator path="/educators">
              <EducatorHome path="/" />
              <Webinars path="/webinars" />
              <Research path="/research" />
              <Resources path="/resources" />
            </Educator>
            <FindLiaison path="/find-a-liaison" />
            <ContactUs path="contact-us" />
            <Icons path="/icons" />
            <NotFound default={true} />
          </Router>
        </div>
      </ThemeProvider>
    )
  }
}

export default App

const GlobalStyle = createGlobalStyle`
  body,
  input,
  textarea,
  button {
    background: ${theme.white};
    font-family: Rubik, Arial, Helvetica, Verdana, sans-serif;
    color: ${theme.primaryGrey};
  }
  b {
    font-weight: 500;
  }
`
