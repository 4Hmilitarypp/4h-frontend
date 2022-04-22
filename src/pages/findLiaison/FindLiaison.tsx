import { RouteComponentProps } from '@reach/router';
import Downshift from 'downshift';
import { map, sortBy } from 'lodash';
import { matchSorter } from 'match-sorter';
import * as React from 'react';
import styled from 'styled-components/macro';
import { theme } from '../../App';
import {
  InputGroup,
  P,
  PageWrapper,
  Section,
  SubHeading,
} from '../../components/Elements';
import Icon from '../../components/Icon';
import useErrorHandler from '../../hooks/useErrorHandler';
import { ILiaison } from '../../sharedTypes';
import api from '../../utils/api';
import { elevation, media } from '../../utils/mixins';

export const filterLiaisons = (
  liaisons: ILiaison[],
  query: string | null,
): ILiaison[] => {
  if (!query) return liaisons;
  const result = matchSorter(liaisons, query, {
    keys: [
      'stateOrRegion',
      { minRanking: matchSorter.rankings.EQUAL, key: 'abbreviation' },
    ],
  });
  return result;
};

const FindLiaison: React.FC<RouteComponentProps> = () => {
  const handleError = useErrorHandler();
  const [liaisons, setLiaisons] = React.useState<ILiaison[] | undefined>(
    undefined,
  );
  const [selectedLiaison, setSelectedLiaison] = React.useState<
    ILiaison | undefined
  >(undefined);
  const findRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    api.liaisons
      .get()
      .then(data => {
        const filtered = data.filter(liaison => liaison.countryCode !== 'US');
        const sorted = sortBy(filtered, ['stateOrRegion']);
        setLiaisons(sorted as any);
      })
      .catch(handleError);
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <ConstrainedSection>
        <SubHeading>What Is A Liaison?</SubHeading>
        <P>
          4-H military liaisons are the official point of contact for all 4-H
          military programs. A liaison serves as a professional connection
          between various military branches and the 4-H organization.
        </P>
        <P>
          Liaisons coordinate support to 4-H clubs on and off military
          installations that serve military youth. They also educate university
          staff and citizens about the unique challenges faced by military
          children.
        </P>
      </ConstrainedSection>
      <SubHeading ref={findRef as any}>Find A Liaison</SubHeading>
      {liaisons && (
        <Downshift
          itemToString={(item: ILiaison | null) => item?.stateOrRegion || ''}
          onChange={selection => setSelectedLiaison(selection || undefined)}
          // Have to do this because downshift was complaining about not controlling the state the whole time
          selectedItem={selectedLiaison || ({} as any)}
        >
          {({
            getLabelProps,
            getInputProps,
            isOpen,
            getItemProps,
            inputValue,
            highlightedIndex,
            getMenuProps,
            clearSelection,
            openMenu,
            closeMenu,
          }) => (
            <div>
              <FindInputGroup>
                <label {...getLabelProps({ name: 'stateOrRegion' })}>
                  Enter a region
                </label>
                <div style={{ position: 'relative' }}>
                  <FindInput
                    className="input"
                    {...getInputProps()}
                    placeholder="Puerto Rico"
                  />
                  <ControllerButton
                    onClick={() => {
                      if (!isOpen) openMenu();
                      else closeMenu();
                      if (selectedLiaison) {
                        clearSelection();
                        openMenu();
                      }
                    }}
                    data-testid="controller-button"
                  >
                    <Icon name="arrow" isOpen={isOpen} />
                  </ControllerButton>
                </div>
              </FindInputGroup>
              {isOpen ? (
                <Menu
                  {...getMenuProps({
                    style: { height: 250, overflowY: 'scroll' },
                  })}
                >
                  {map(
                    filterLiaisons(liaisons, inputValue),
                    (liaison, index) => {
                      return (
                        <Item
                          key={liaison.stateOrRegion.toLowerCase()}
                          {...getItemProps({
                            index,
                            item: liaison,
                            style: {
                              background:
                                index === highlightedIndex ? theme.primary : '',
                            },
                          })}
                        >
                          {liaison.stateOrRegion}
                        </Item>
                      );
                    },
                  )}
                </Menu>
              ) : null}
            </div>
          )}
        </Downshift>
      )}
      {selectedLiaison && (
        <Liaison>
          <ResultContent>
            <Text>
              <Name>{selectedLiaison.name}</Name>
              <StyledLink href={`mailto:${selectedLiaison.email}`}>
                {selectedLiaison.email}
              </StyledLink>
              <StyledLink href={`tel:${selectedLiaison.phoneNumber}`}>
                {selectedLiaison.phoneNumber}
              </StyledLink>
            </Text>
            <SchoolLogo
              src={selectedLiaison.image}
              alt={`${selectedLiaison.stateOrRegion} land grant university logo`}
            />
          </ResultContent>
        </Liaison>
      )}
    </PageWrapper>
  );
};
export default FindLiaison;

const ConstrainedSection = styled(Section)`
  max-width: 64rem;
`;
const Menu = styled.ul`
  ${elevation(3)};
  padding: 1.5rem 0;
  max-width: 64rem;
  margin: 0 auto;
  background: ${props => props.theme.primaryGrey};
`;
const FindInputGroup = styled(InputGroup)`
  max-width: 64rem;
  margin: 0 auto;
`;
const FindInput = styled.input`
  &.input {
    background: ${props => props.theme.primaryBackground};
  }
`;
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
`;
const Item = styled.li`
  padding: 0.4rem 1.5rem;
  border-radius: 5px;
  color: ${props => props.theme.white};
  &:hover {
    cursor: pointer;
  }
`;
const Liaison = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;
const ResultContent = styled.div`
  padding-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.phone`
     flex-direction: column;
  `}
`;
const Text = styled.div`
  display: inline-block;
  line-height: 1.8;
`;
const Name = styled.h4`
  font-size: 2.4rem;
  color: ${props => props.theme.primaryGrey};
`;
const StyledLink = styled.a`
  display: block;
  color: ${props => props.theme.primaryBlack};
  text-decoration: underline;
`;
const SchoolLogo = styled.img`
  height: 20rem;
  max-width: 40rem;
  padding-left: 6rem;
  object-fit: contain;
  ${media.tabletPort`
    max-width: 50%;
  `}
  ${media.phone`
     padding-left: 0rem;
     max-width: 85%;
  `}
`;
