import { Redirect, Router } from '@reach/router'
import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import FlashContext, { useFlash } from './contexts/FlashContext'
import Flash from './Flash'
import Header from './header/Header'
import About from './pages/About'
import About4HClub from './pages/About4HClub'
import ContactUs from './pages/ContactUs'
import Educator from './pages/educator/Educator'
import Events from './pages/events/Events'
import FindLiaison from './pages/findLiaison/FindLiaison'
import GetInvolved4HClub from './pages/GetInvolved4HClub'
import Home from './pages/Home'
import Icons from './pages/Icons'
import JobApplication from './pages/JobApplication'
import NotFound from './pages/NotFound'
import Partner from './pages/partner/Partner'
import Partners from './pages/partners/Partners'
import Photos from './pages/Photos'
import PurpleUp from './pages/PurpleUp'

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
  .grecaptcha-badge {
    visibility: hidden !important;
    opacity: 0 !important;
  }
`

const App: React.FC = () => {
  const { flashState, resetFlashState, setFlashState } = useFlash()
  return (
    <ThemeProvider theme={theme}>
      <div data-testid="app">
        <GlobalStyle />
        <FlashContext.Provider value={{ ...flashState, reset: resetFlashState, set: setFlashState }}>
          <Flash />
          <Router>
            <Header path="/*" />
          </Router>
          <Router primary={false}>
            <Home path="/" />
            <About path="/about" />
            <Partners path="/partners" />
            <Partner path="/partners/:slug" />
            <Events path="/events/*" />
            <Photos path="/photos" />
            <About4HClub path="/4-h-club" />
            <GetInvolved4HClub path="/4-h-club/get-involved" />
            <Educator path="/resources/*" />
            <FindLiaison path="/find-a-liaison" />
            <ContactUs path="contact-us" />
            <Icons path="/icons" />
            <JobApplication path="/job-application" />
            <PurpleUp path="purple-up" />

            <Redirect
              from="/educator-staff/resources/curriculum/adult_babysitting/CYSitter%20facilitator%20guide%2008%20complete%20CYSitter%20164%20pg.pdf"
              to="/resources/educator-resources/Adult-Babysitting"
              noThrow={true}
            />
            <Redirect
              from="/educator-staff/resources/curriculum/youth_babysitting/BabysittingStudentGuide.pdf"
              to="/resources/educator-resources/Youth-Babysitting"
              noThrow={true}
            />
            <Redirect
              from="/educator-staff/resources/curriculum/youth_babysitter.html"
              to="/resources/educator-resources/Youth-Babysitting"
              noThrow={true}
            />
            <Redirect
              from="/educator-staff/resources/curriculum/character_ed.html"
              to="/resources/educator-resources/Character-Education"
              noThrow={true}
            />
            <Redirect
              from="/educator-staff/resources/curriculum/4h_101.html"
              to="/resources/educator-resources/4-H-101:-The-Basics-of-Starting-a-4-H-Club"
              noThrow={true}
            />
            <Redirect
              from="/educator-staff/recorded_webinars/mancini_o_neal_webinar_resources/Bowen%20Martin%20Mancini%202013%20resilience%20of%20military%20families%20theoreical%20perspectives.pdf"
              to="/resources/webinars/mancini-resources"
              noThrow={true}
            />
            <Redirect from="/military-family/af-cyp/index.html" to="/partners/air-force" noThrow={true} />
            <Redirect from="/educator-staff/navy-cyp/index.html" to="/partners/navy" noThrow={true} />
            <Redirect from="/4h_military_partnerships/index.html" to="/" noThrow={true} />
            <Redirect from="/military-liaisons/cyf-camps/ang4hcamps.html" to="/events" noThrow={true} />
            <Redirect from="/military-family/reserves/reserves.html" to="/partners/air-force-reserves" noThrow={true} />
            <Redirect from="/military-family/4h-clubs/index.html" to="/4-h-club" noThrow={true} />
            <Redirect from="/educator-staff/dod_usda/index.html" to="/partners/dod-usda" noThrow={true} />
            <Redirect
              from="/educator-staff/recorded_webinars/mancini_o_neal_webinar_resources/Bowen%20Martin%20Mancini%202013%20resilience%20of%20military%20families%20theoreical%20perspectives.pdf"
              to="/resources/webinars/mancini-resources"
              noThrow={true}
            />
            <Redirect
              from="/educator-staff/recorded_webinars/mancini_o_neal_webinar_resources/Mancini%20Bowen%202013%20Families%20and%20Communities.pdf"
              to="/resources/webinars/mancini-resources"
              noThrow={true}
            />
            <Redirect from="/military-liaisons/resources/purple_up.html" to="/purple-up" noThrow={true} />

            <Redirect from="/educator-staff/resources/curriculum/*" to="/resources/resources" noThrow={true} />
            <Redirect from="/educator-staff/recorded_webinars/*" to="/resources/webinars" noThrow={true} />
            <Redirect from="/military-liaisons/recorded_webinars/*" to="/resources/webinars" noThrow={true} />

            <NotFound default={true} />
          </Router>
        </FlashContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
