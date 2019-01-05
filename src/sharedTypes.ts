export interface ILiaison {
  _id?: string
  abbreviation?: string | null
  email?: string | null
  image: string
  name?: string | null
  phoneNumber?: string | null
  region: string
}

export interface IPartnerSection {
  featuredImages: IImage[]
  shortDescription: string
  slug: string
  title: string
}

export interface IImage {
  alt?: string
  url: string
}

export interface ILink {
  linkText: string
  title: string
  url: string
}

export interface IReport {
  image: string
  title: string
  url: string
}

export interface IPartner extends IPartnerSection {
  annualReports?: IReport[]
  images?: IImage[]
  longDescription: string
  videoReports?: IReport[]
}

export interface IWebinar {
  _id?: string
  category: string
  description: string
  title: string
  url: string
}

export interface IResearch {
  _id?: string
  description: string
  title: string
  type: 'doc' | 'pdf' | 'link'
  url: string
}

export interface ICurriculumResource {
  _id?: string
  description: string
  featuredImage?: IImage
  slug: string
  title: string
}

export interface ICurriculumResourceWithLessons extends ICurriculumResource {
  lessons?: ILesson[]
}

export interface ILesson {
  _id?: string
  category?: string
  docUrl?: string
  externalUrl?: string
  pdfUrl?: string
  pptUrl?: string
  title: string
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
