export enum TermsContentView {
  Terms,
  Contract,
}

export enum AuthorizationContentView {
  Auth,
  Registration,
  ForgotPass,
}

export enum RegistrationStep {
  FirstStep = 1,
  SecondStep,
  ThirdStep,
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
  user: IReviewer;
}

export interface IReviewer {
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

export interface ISuccess {
  message: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthResponse {
  jwt: string;
  user: IUser;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CreateCommentRequest {
  rating: number;
  text: string;
  book: string;
  user: string;
}

export interface BookingBookRequest {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
}

export interface CreateCommentResponse {
  id: string;
  attributes: CreateCommentAttributes;
}

export interface UpdateAccountResponse {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface BookingBookResponse {
  id: string;
  attributes: BookingBookAttributes;
}

export interface CreateCommentAttributes {
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BookingBookAttributes {
  order: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  dateOrder: string;
}

export interface BookingModalParams {
  bookId: string;
  order: boolean;
  bookingId: string;
  dateOrder: string;
}

export interface ReviewModalParams {
  book: IBook;
  comment?: IComment;
}

export interface IAccount extends IUser {
  role: IRole;
  comments: IAccountComment[];
  avatar: string;
  booking: IUserBooking;
  delivery: IUserDelivery;
  history: IUserHistory;
}

export interface IAccountComment {
  id: string;
  rating: number;
  text: string;
  bookId: string;
}

export interface IRole {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface IUserBooking {
  id: string;
  order: boolean;
  dateOrder: string;
  book: IBook;
}

export interface IUserDelivery {
  id: string;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: IBook;
}

export interface IUserHistory {
  id: string;
  books: IBook[];
}

export interface AccountPayloadAction {
  account: IAccount;
  success: ISuccess;
}

export interface SignInPayloadAction {
  user: IUser;
  password: string;
}

export interface UploadFileResponse {
  id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  large: Thumbnail;
  medium: Thumbnail;
  small: Thumbnail;
}
