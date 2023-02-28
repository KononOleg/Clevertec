export enum TermsContentView {
  Terms,
  Contract,
}

export enum AuthorizationContentView {
  Auth,
  Registration,
  ForgotPass,
}

export interface ILibrary extends ICategory {
  books: IBook[];
}

export interface ICategory {
  id: string;
  name: string;
  path: string;
}

export interface IBook {
  id: string;
  issueYear?: string;
  rating?: number;
  title: string;
  authors?: string[];
  image?: IImage;
  images: IImage[];
  categories: string[];
  booking: IBooking;
  delivery: IDelivery;
  histories?: IHistory[];
  comments: IComment[];
  description: string;
  publish?: string;
  pages?: string;
  cover?: string;
  weight?: string;
  format?: string;
  ISBN?: string;
  producer?: string;
}

export interface IImage {
  url: string;
}

export interface IBooking {
  id: string;
  order: boolean;
  dateOrder?: string;
  customerId?: string;
  customerFirstName?: string;
  customerLastName?: string;
}

export interface IDelivery {
  id: string;
  handed: boolean;
  dateHandedFrom?: string;
  dateHandedTo?: string;
  recipientId?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
}

export interface IHistory {
  id: string;
  userId: string;
}

export interface IComment {
  id: string;
  rating: number;
  text?: string;
  createdAt: string;
  user: IUser;
}

export interface IUser {
  commentUserId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface AxiosErrorDataType {
  data: null;
  error: IError;
}

export interface IError {
  status: number;
  name: string;
  message: string;
  details: object[];
}
