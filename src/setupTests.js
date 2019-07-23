import '@testing-library/react/cleanup-after-each'

beforeAll(() => {
  window.scrollTo = () => {}
})
