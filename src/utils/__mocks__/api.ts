const mock = {
  emails: undefined,
  liaisons: undefined,
  research: undefined,
  reset: undefined,
  resources: undefined,
}
function reset() {
  Object.assign(mock, {
    emails: Object.assign(mock.emails || {}, {
      checkIfSpam: jest.fn(async () => false),
      contactUs: jest.fn(async () => ({})),
    }),
    liaisons: Object.assign(mock.liaisons || {}, {
      get: jest.fn(async () => []),
    }),
    partners: Object.assign(mock.liaisons || {}, {
      get: jest.fn(async () => []),
      getBySlug: jest.fn(async () => []),
    }),
    research: Object.assign(mock.research || {}, {
      get: jest.fn(async () => []),
    }),
    reset,
    resources: Object.assign(mock.resources || {}, {
      get: jest.fn(async () => []),
      getBySlug: jest.fn(async () => ({})),
    }),
    webinars: Object.assign(mock.resources || {}, {
      get: jest.fn(async () => []),
    }),
  })
}
reset()

export default mock
