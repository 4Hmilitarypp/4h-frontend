// @ts-ignore
import Parser from 'html-react-parser';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Button, SubHeading } from '../../../components/Elements';
import useTrimDescription from '../../../hooks/useTrimDescription';
import { IWebinar } from '../../../sharedTypes';
import { elevation, media } from '../../../utils/mixins';

interface IProps {
  webinar: IWebinar;
}

const Webinar: React.FC<IProps> = ({ webinar }) => {
  const { title, url, description } = webinar;
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const { trimDescription, showExpand, setTrimDescription } =
    useTrimDescription(descriptionRef, webinar.description);

  const handleExpandClicked = () => {
    setTrimDescription(!trimDescription);
  };

  return (
    <WebinarWrapper>
      <WebinarTitle>
        <MySubHeading as="h3">{title}</MySubHeading>
        <ViewButton as="a" className="override" href={url} target="_blank">
          View
        </ViewButton>
      </WebinarTitle>
      <Description
        ref={descriptionRef}
        className={trimDescription ? 'trim' : ''}
      >
        {Parser(description)}
      </Description>
      {showExpand && (
        <>
          <Ellipses>{trimDescription ? '. . .' : ''}</Ellipses>
          <Expand onClick={handleExpandClicked}>
            {trimDescription ? 'expand' : 'collapse'}
          </Expand>
        </>
      )}
    </WebinarWrapper>
  );
};
export default Webinar;

const WebinarWrapper = styled.div`
  background: ${props => props.theme.primaryBackground};
  padding: 2rem 3.2rem;
  ${elevation(3)};
  &:not(:last-child) {
    margin-bottom: 3.2rem;
  }
  ${media.phone`
    margin: 0 -2.4rem 3.2rem;
  `}
  ${media.tabletPort`
    padding: 2rem 2.4rem;
  `}
`;
const WebinarTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 2.4rem;
`;
const MySubHeading = styled(SubHeading)`
  padding: 0;
  text-align: left;
  ${media.tabletLand`
    font-size: 2rem;
    padding: 0;
  `}
`;
const ViewButton = styled(Button)`
  white-space: nowrap;
  margin: 0 -1.2rem 0 2rem;
  padding: 0.4rem 1.2rem;
  color: ${props => props.theme.white} !important;
  &:hover {
    opacity: 1 !important;
    transform: none !important;
    background: #327654 !important;
  }
`;
const Description = styled.div`
  overflow: hidden;
  position: relative;
  &.trim {
    max-height: 17rem;
  }
`;
const Ellipses = styled.span`
  display: block;
  color: ${props => props.theme.primaryGrey};
  text-align: center;
  font-size: 3.2rem;
  line-height: 0.4;
  padding-top: 0.4rem;
`;
const Expand = styled.button`
  background: none;
  border: none;
  display: block;
  color: ${props => props.theme.primaryLink};
  font-weight: 500;
  margin: 1.6rem auto 0;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
