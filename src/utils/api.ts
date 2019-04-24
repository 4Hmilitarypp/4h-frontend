import * as axios from 'axios'
import { IContactUsEmail } from '../clientTypes'
import { ICamp, ILiaison, IPartner, IPartnerSection, IResearch, IResource, IWebinar } from '../sharedTypes'

let restApi: axios.AxiosInstance
const envBaseURL = process.env.REACT_APP_API_URL

const getData = (res: { data: object }) => res.data

const requests = {
  delete: (url: string): Promise<any> => restApi.delete(url).then(getData),
  get: (url: string): Promise<any> => restApi.get(url).then(getData),
  post: (url: string, body: object): Promise<any> => restApi.post(url, body).then(getData),
  put: (url: string, body: object): Promise<any> => restApi.put(url, body).then(getData),
}

const camps = {
  get: (): Promise<ICamp[]> => requests.get('/camps'),
}

const emails = {
  checkIfSpam: (token: string): Promise<boolean> => requests.post('/users/checkIfSpam', { token }),
  contactUs: (email: IContactUsEmail): Promise<{ email: IContactUsEmail }> =>
    requests.post('/emails/contact-us', email),
}

const liaisons = {
  get: (): Promise<{ liaisons: ILiaison[] }> => requests.get('/liaisons'),
}
const pageInfo = {
  get: (page: string): Promise<any> => requests.get(`/page-info/${page}`),
}
const partners = {
  get: (): Promise<IPartnerSection[]> => requests.get('/partners'),
  getBySlug: (slug: string): Promise<IPartner> => requests.get(`/partners/slug/${slug}`),
}

const research = {
  get: (): Promise<IResearch[]> => requests.get('/research'),
}
const resources = {
  get: (): Promise<IResource[]> => requests.get('/resources'),
  getById: (id: string): Promise<IResource> => requests.get(`/resources/${id}`),
  getBySlug: (slug: string): Promise<IResource> => requests.get(`/resources/slug/${slug}`),
}
const webinars = {
  get: (): Promise<IWebinar[]> => requests.get('/webinars'),
}

function init({ baseURL = envBaseURL || '/api', axiosOptions = { headers: {} } } = {}) {
  restApi = (axios as any).create({
    baseURL,
    ...axiosOptions,
    headers: {
      ...axiosOptions.headers,
    },
  })
}

const api = {
  camps,
  emails,
  init,
  liaisons,
  pageInfo,
  partners,
  research,
  resources,
  webinars,
}

export default api
