const mock = {
  emails: undefined,
  liaisons: undefined,
  research: undefined,
  reset: undefined,
  resources: undefined,
};
function reset() {
  Object.assign(mock, {
    emails: Object.assign(mock.emails || {}, {
      checkIfSpam: jest.fn(() => Promise.resolve(false)),
      contactUs: jest.fn(() => Promise.resolve({})),
    }),
    liaisons: Object.assign(mock.liaisons || {}, {
      get: jest.fn(() => Promise.resolve([])),
    }),
    partners: Object.assign(mock.liaisons || {}, {
      get: jest.fn(() => Promise.resolve([])),
      getBySlug: jest.fn(() => Promise.resolve([])),
    }),
    research: Object.assign(mock.research || {}, {
      get: jest.fn(() => Promise.resolve([])),
    }),
    reset,
    resources: Object.assign(mock.resources || {}, {
      get: jest.fn(() => Promise.resolve([])),
      getBySlug: jest.fn(() => Promise.resolve({})),
    }),
  });
}
reset();

export default mock;
