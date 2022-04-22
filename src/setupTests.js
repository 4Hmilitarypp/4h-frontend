import 'react-testing-library/cleanup-after-each';

beforeAll(() => {
  window.scrollTo = () => {};
});
