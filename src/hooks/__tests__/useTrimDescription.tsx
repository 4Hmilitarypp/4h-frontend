import faker from '@faker-js/faker';
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import useTrimDescription from '../useTrimDescription';

interface IProps {
  description: string;
}

const Comp: React.FC<IProps> = ({ description }) => {
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const { trimDescription, showExpand, setTrimDescription } =
    useTrimDescription(descriptionRef, description);
  return (
    <div>
      <div ref={descriptionRef}>{description}</div>
      {showExpand && (
        <button onClick={() => setTrimDescription(!trimDescription)}>
          {trimDescription ? 'expand' : 'collapse'}
        </button>
      )}
    </div>
  );
};

const setup = (propOverrides?: IProps) => {
  const props = Object.assign(
    {
      description: faker.lorem.words(10),
    },
    propOverrides,
  );

  const utils = render(<Comp {...props} />);
  return {
    ...utils,
  };
};

it('should not have an expand button if there are not very much text', () => {
  const { queryByText } = setup();
  // flushEffects() // flush effects to allow the heigh comparison to be done
  expect(queryByText(/expand/i)).toBeNull();
});
it('should have an expand button if there is a lot of text.', () => {
  const description = faker.lorem.words(1500);
  const { getByText } = setup({ description });
  // flushEffects() // flush effects to allow the heigh comparison to be done
  expect(getByText(/expand/i)).toBeTruthy();
});
it('should change expand to collapse when expand is clicked and then change back.', () => {
  const description = faker.lorem.words(1500);
  const { getByText, queryByText } = setup({ description });
  // flushEffects() // flush effects to allow the heigh comparison to be done
  const expand = getByText(/expand/i);
  fireEvent.click(expand);
  const collapse = getByText(/collapse/i);
  expect(queryByText(/expand/i)).toBeNull();
  fireEvent.click(collapse);
  expect(getByText(/expand/i)).toBeDefined();
});
