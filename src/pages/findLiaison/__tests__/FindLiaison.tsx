import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
// import api from '../../utils/api'
import { ILiaison } from '../../../sharedTypes';
import generate from '../../../utils/generate';
import FindLiaison, { filterLiaisons } from '../FindLiaison';
jest.mock('../../../utils/api');

interface IProps {
  value: string;
}

const setup = (propOverrides?: IProps) => {
  const props = Object.assign({}, propOverrides);

  const utils = render(<FindLiaison {...props} />);
  // flushEffects() // Flush Effect to run "didMount"
  const input = utils.getByLabelText(/Enter a state or US Province/i);
  return {
    input,
    props,
    ...utils,
  };
};

describe('integration', () => {
  it('happy path', () => {
    const { input, getByText } = setup();
    const kansasLiaison = [
      generate.liaison({ stateOrRegion: 'Puerto Rico', countryCode: 'PR' }),
    ].find(l => l.stateOrRegion === 'Puerto Rico') as ILiaison;
    fireEvent.change(input, { target: { value: 'PR' } });
    const kansasItem = getByText(kansasLiaison.stateOrRegion);
    fireEvent.click(kansasItem);
    expect(getByText(kansasLiaison.name as string)).toBeDefined();
  });
});

describe('controller button', () => {
  it('should open menu if button is clicked and menu is closed and vice versa', () => {
    const { getByTestId, queryByText } = setup();
    const controllerButton = getByTestId('controller-button');
    expect(queryByText(/colorado/i)).toBeNull();

    fireEvent.click(controllerButton);
    expect(queryByText(/colorado/i)).toBeDefined();
    fireEvent.click(controllerButton);
    expect(queryByText(/colorado/i)).toBeNull();
  });
  it('should clear the selection and open the menu if the button is clicked and there is an item selected', () => {
    const { getByTestId, getByText, getByLabelText, queryByText } = setup();
    const controllerButton = getByTestId('controller-button');
    const input = getByLabelText(
      /Enter a state or US Province/i,
    ) as HTMLInputElement;

    fireEvent.click(controllerButton);
    expect(queryByText(/california/i)).toBeDefined();
    fireEvent.click(getByText(/colorado/i));
    expect(queryByText(/california/i)).toBeNull();
    expect(input.value).toMatch(/colorado/i);
    fireEvent.click(controllerButton);
    expect(input.value).toBe('');
    expect(queryByText(/california/i)).toBeDefined();
  });
});

describe('filterLiaisons', () => {
  it('should return matching state names', () => {
    const fakeLiaisons = [];
    const kansasLiaison = generate.liaison({ stateOrRegion: 'Kansas' });
    const newMexicoLiaison = generate.liaison({ stateOrRegion: 'New Mexico' });
    fakeLiaisons.push(kansasLiaison, newMexicoLiaison);

    let result = filterLiaisons(fakeLiaisons, 'Kansas');
    expect(result).toEqual([kansasLiaison]);
    result = filterLiaisons(fakeLiaisons, 'New Mexico');
    expect(result).toEqual([newMexicoLiaison]);
  });

  it('should return more than one if query is matching', () => {
    const fakeLiaisons = [];
    const missouriLiaison = generate.liaison({ stateOrRegion: 'Missouri' });
    const mississippiLiaison = generate.liaison({
      stateOrRegion: 'Mississippi',
    });
    const kentuckyLiaison = generate.liaison({ stateOrRegion: 'Kentucky' });
    fakeLiaisons.push(missouriLiaison, mississippiLiaison, kentuckyLiaison);

    let result = filterLiaisons(fakeLiaisons, 'M');
    expect(result).toEqual([missouriLiaison, mississippiLiaison]);

    result = filterLiaisons(fakeLiaisons, 'Mi');
    expect(result).toEqual([missouriLiaison, mississippiLiaison]);
  });

  it('should match abbreviation', () => {
    const fakeLiaisons = [];
    const kansasLiaison = generate.liaison({
      stateOrRegion: 'Kansas',
      abbreviation: 'KS',
    });
    const missouriLiaison = generate.liaison({
      stateOrRegion: 'Missouri',
      abbreviation: 'MO',
    });
    const iowaLiaison = generate.liaison({
      stateOrRegion: 'Iowa',
      abbreviation: 'IA',
    });
    fakeLiaisons.push(kansasLiaison, missouriLiaison, iowaLiaison);
    let result = filterLiaisons(fakeLiaisons, 'KS');
    expect(result).toEqual([kansasLiaison]);
    result = filterLiaisons(fakeLiaisons, 'MO');
    expect(result).toEqual([missouriLiaison]);
    result = filterLiaisons(fakeLiaisons, 'IA');
    expect(result).toEqual([iowaLiaison]);
  });

  it('should not care about case', () => {
    const fakeLiaisons = [];
    const kansasLiaison = generate.liaison({ stateOrRegion: 'Kansas' });
    const missouriLiaison = generate.liaison({ stateOrRegion: 'Missouri' });
    fakeLiaisons.push(kansasLiaison, missouriLiaison);
    const result = filterLiaisons(fakeLiaisons, 'kS');
    expect(result).toEqual([kansasLiaison]);
  });

  it('should sort first by abbreviation', () => {
    const fakeLiaisons = [];
    const californiaLiaison = generate.liaison({
      stateOrRegion: 'California',
      abbreviation: 'CA',
    });
    const georgiaLiaison = generate.liaison({
      stateOrRegion: 'Georgia',
      abbreviation: 'GA',
    });
    const iowaLiaison = generate.liaison({
      stateOrRegion: 'Iowa',
      abbreviation: 'IA',
    });
    fakeLiaisons.push(californiaLiaison, georgiaLiaison, iowaLiaison);
    const result = filterLiaisons(fakeLiaisons, 'IA');
    expect(result[0]).toEqual(iowaLiaison);
  });
});
