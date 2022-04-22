export interface IApiError {
  response: { data: { message: string }; status: number; statusText: string };
}

export interface ILiaison {
  _id: string;
  abbreviation?: string | null;
  email?: string | null;
  image: string;
  name?: string | null;
  phoneNumber?: string | null;
  stateOrRegion: string;
  countryCode: string;
}

export interface ILatestNews {
  title: string; // modifiable
  body: string; // modifiable
  shortDescription: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  postedDate: string; // display in human-readable format
  author: string; // User // modifiable
  slug: string; // slugified version of the title
  createdAt: string;
  updatedBy: string;
  updatedAt: string; // display in human-readable format
  createdBy: string;
  resourceUrl: string;
}

export interface IPartnerSection {
  _id: string;
  featuredImage1: IImage;
  featuredImage2?: IImage;
  shortDescription: string;
  slug: string;
  title: string;
}

export interface IImage {
  alt?: string;
  url: string;
}

export interface ILink {
  linkText: string;
  title: string;
  url: string;
}

export interface IReport {
  image: IImage;
  title: string;
  url: string;
}

export interface IPartner extends IPartnerSection {
  reports: IReport[];
  longDescription: string;
}

export interface IWebinar {
  _id: string;
  category: string;
  description: string;
  title: string;
  url: string;
}

export type ResearchType = 'doc' | 'pdf' | 'external';

export interface IResearch {
  _id: string;
  description: string;
  title: string;
  type: ResearchType;
  url: string;
}

export interface IResource {
  _id: string;
  featuredImage?: IImage;
  longDescription: string;
  shortDescription: string;
  slug: string;
  title: string;
}

export interface IResourceWithLessons extends IResource {
  lessons?: ILesson[];
}

export type LessonLinkType = 'ppt' | 'pdf' | 'doc' | 'external';

export interface ILessonLink {
  url: string;
  type: LessonLinkType;
}

export interface ILesson {
  _id: string;
  category?: string;
  links: ILessonLink[];
  title: string;
}

export interface ICampDate {
  _id: string;
  beginDate: Date;
  endDate: Date;
}

export interface ICampContact {
  email?: string;
  name: string;
  phoneNumber?: string;
  url?: string;
  urlText?: string;
}

export interface ICamp {
  _id: string;
  ageRange: string;
  city: string;
  contact: ICampContact;
  dates: ICampDate[];
  description: string;
  descriptionTitle: string;
  featuredImage?: IImage;
  flyerUrl?: string;
  serviceBranch: 'Air Force' | 'Navy' | 'Army';
  state: string;
  title: string;
  type: 'Residential' | 'Day';
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
