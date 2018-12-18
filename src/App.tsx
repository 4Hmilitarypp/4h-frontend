import { Router } from '@reach/router'
import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import Footer from './Footer'
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
  black: 'hsl(150, 20%, 20%)',
  buttonBackground: '#278657',
  gray: 'hsl(150, 10%, 29%)',
  green: '#0ac775',
  grey: 'hsl(150, 10%, 29%);',
  inputGray: 'hsl(150,39%,96%)',
  inputGrey: 'hsl(150,39%,96%)',
  lightGray: 'hsl(150, 20%, 40%)',
  lightGrey: 'hsl(150, 20%, 40%',
  offWhite: 'hsl(150, 40%, 96%)',
  primary: 'hsl(150, 50%, 40%)',
  primaryText: '#0e8147',
  secondary: '#5a2a82',
  warning: '#bb0000',
  white: '#fff',
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
          <Router primary={false}>
            <Footer path="/*" />
          </Router>
        </div>
      </ThemeProvider>
    )
  }
}

export default App

const GlobalStyle = createGlobalStyle`
  body {
    background: ${theme.white};
    font-family: Rubik, Arial, Helvetica, Verdana, sans-serif;
  }
  input,
  textarea, button {
    font-family: Rubik, Arial, Helvetica, Verdana, sans-serif;
  }
`
