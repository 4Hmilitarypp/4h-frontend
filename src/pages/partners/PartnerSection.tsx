import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components/macro';
import { IPartnerSection } from '../../sharedTypes';
import { media } from '../../utils/mixins';

interface IProps extends RouteComponentProps {
  partner: IPartnerSection;
  index: number;
}

const PartnerSection: React.FC<IProps> = ({ partner, index }) => {
  return (
    <PartnerWrapper index={index}>
      <Content index={index}>
        <Text>
          <Title>{partner.title}</Title>
          <Description>{partner.shortDescription}</Description>
          <LearnMore to={partner._id}>Learn More</LearnMore>
        </Text>
        <FeaturedImage
          src={partner.featuredImage1.url}
          alt={partner.featuredImage1.alt || `${partner.title} Logo`}
        />
        {partner.featuredImage2 && (
          <FeaturedImage
            src={partner.featuredImage2.url}
            alt={partner.featuredImage2.alt || `${partner.title} Logo`}
          />
        )}
      </Content>
    </PartnerWrapper>
  );
};
export default PartnerSection;

const PartnerWrapper: any = styled.section`
  padding: 3.2rem;
  background: ${(props: any) =>
    props.index % 2 === 1
      ? props.theme.white
      : props.theme.secondaryBackground};
  ${media.tabletLand`
    padding: 3.2rem 0;
  `}
`;
const Title = styled.h2`
  color: ${props => props.theme.secondary};
  padding-bottom: 1.2rem;
`;
const FeaturedImage = styled.img`
  height: 20rem;
  display: block;
  margin: 1.2rem;
  padding: 1.2rem;
  object-fit: contain;
  background: ${props => props.theme.white};
  border-radius: 5px;
  ${media.tabletLand`
    margin-top: 2.4rem;
  `}
`;
const Description = styled.p`
  max-width: 70rem;
  padding-bottom: 2rem;
`;
const LearnMore = styled(Link)`
  padding: 0.4rem 1.5rem;
  border: 3px solid ${props => props.theme.secondary};
  font-size: 1.8rem;
  border-radius: 5px;
  color: ${props => props.theme.secondary};
  font-weight: 500;
  &:hover {
    color: ${props => props.theme.white};
    border: none;
    background: ${props => props.theme.secondary};
    padding: 0.7rem 1.8rem;
  }
`;
const Content: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props: any) =>
    props.index % 2 === 1 ? 'row-reverse' : 'row'};
  max-width: 140rem;
  margin: 0 auto;
  ${media.tabletLand`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `}
`;
const Text = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
