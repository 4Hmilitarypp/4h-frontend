import * as axios from 'axios'
import { IContactUsEmail } from '../clientTypes'
import { ILiaison, IPartner, IPartnerSection, IResearch, IResource } from '../sharedTypes'

let restApi: axios.AxiosInstance
const envBaseURL = process.env.REACT_APP_API_URL

const getData = (res: { data: object }) => res.data

const requests = {
  delete: (url: string): Promise<any> => restApi.delete(url).then(getData),
  get: (url: string): Promise<any> => restApi.get(url).then(getData),
  post: (url: string, body: object): Promise<any> => restApi.post(url, body).then(getData),
  put: (url: string, body: object): Promise<any> => restApi.put(url, body).then(getData),
}

const liaisons = {
  get: (): Promise<{ liaisons: ILiaison[] }> => requests.get('/liaisons'),
}
const emails = {
  checkIfSpam: (token: string): Promise<boolean> => requests.post('/users/checkIfSpam', { token }),
  contactUs: (email: IContactUsEmail): Promise<{ email: IContactUsEmail }> =>
    requests.post('/emails/contact-us', email),
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
  emails,
  init,
  liaisons,
  partners,
  research,
  resources,
}

export default api
