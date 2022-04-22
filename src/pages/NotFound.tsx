import { RouteComponentProps } from '@reach/router';
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Button,
  Heading,
  Link,
  PageWrapper,
  Section,
} from '../components/Elements';
import { media } from '../utils/mixins';

const NotFound: React.FC<RouteComponentProps> = ({ uri }) => {
  const [eventId] = React.useState<string | undefined>(
    Sentry.captureEvent({ message: `client-client-404:${uri}` }),
  );
  return (
    <PageWrapper>
      <Section>
        <NotFoundHeading>
          Sorry, we weren't able to find your page
        </NotFoundHeading>
        <CustomP>
          After the website upgrade the urls to our resources changed. Most of
          the old information is on this new website if you look around.
        </CustomP>
        <CustomP>
          If you have trouble finding anything, please feel free to{' '}
          <CustomLink to="/contact-us">Contact Us</CustomLink>
        </CustomP>
        <CustomP>
          If you think this a page that should exist, please report feedback
        </CustomP>
        <CustomButton
          onClick={() =>
            Sentry.showReportDialog({
              eventId,
              labelComments: 'Which resource were you looking for?',
              subtitle2:
                "If you'd like to help, tell use which resource you think should be at this route",
              title: "You found a route that doesn't exist",
            })
          }
        >
          Report Feedback
        </CustomButton>
      </Section>
    </PageWrapper>
  );
};
export default NotFound;

const NotFoundHeading = styled(Heading)`
  font-family: Rubik;
  font-weight: 500;
`;
const CustomP = styled.p`
  font-size: 2rem;
  padding-bottom: 2rem;
  ${media.tabletPort`
    font-size: 1.8rem;
  `}
`;
const CustomLink = styled(Link)`
  font-size: 2rem;
  ${media.tabletPort`
    font-size: 1.8rem;
  `}
`;
const CustomButton = styled(Button)`
  margin: 0 auto;
  display: block;
  font-family: Rubik;
`;
