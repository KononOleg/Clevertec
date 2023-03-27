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
export type Library = Category & {
  books: Book[];
};

export type Category = {
  id: string;
  name: string;
  path: string;
};

export type Book = {
  id: string;
  issueYear?: string;
  rating?: number;
  title: string;
  authors?: string[];
  image?: Image;
  images: Image[];
  categories: string[];
  booking: Booking;
  delivery: Delivery;
  histories?: History[];
  comments: Comment[];
  description: string;
  publish?: string;
  pages?: string;
  cover?: string;
  weight?: string;
  format?: string;
  ISBN?: string;
  producer?: string;
};

export type Image = {
  url: string;
};

export type Booking = {
  id: string;
  order: boolean;
  dateOrder?: string;
  customerId?: string;
  customerFirstName?: string;
  customerLastName?: string;
};

export type Delivery = {
  id: string;
  handed: boolean;
  dateHandedFrom?: string;
  dateHandedTo?: string;
  recipientId?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
};

export type History = {
  id: string;
  userId: string;
};

export type Comment = {
  id: string;
  rating: number;
  text?: string;
  createdAt: string;
  user: Reviewer;
};

export type Reviewer = {
  commentUserId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

export type AxiosErrorDataType = {
  data: null;
  error: Error;
};

export type Error = {
  status: number;
  name: string;
  message: string;
  details: object[];
};

export type Success = {
  message: string;
};

export type User = {
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
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type CreateCommentRequest = {
  rating: number;
  text: string;
  book: string;
  user: string;
};

export type BookingBookRequest = {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
};

export type CreateCommentResponse = {
  id: string;
  attributes: CreateCommentAttributes;
};

export type UpdateAccountResponse = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type BookingBookResponse = {
  id: string;
  attributes: BookingBookAttributes;
};

export type CreateCommentAttributes = {
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type BookingBookAttributes = {
  order: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  dateOrder: string;
};

export type BookingModalParams = {
  bookId: string;
  order: boolean;
  bookingId: string;
  dateOrder: string;
};

export type ReviewModalParams = {
  book: Book;
  comment?: Comment;
};

export type Account = User & {
  role: Role;
  comments: AccountComment[];
  avatar: string;
  booking: UserBooking;
  delivery: UserDelivery;
  history: UserHistory;
};

export type AccountComment = {
  id: string;
  rating: number;
  text: string;
  bookId: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  type: string;
};

export type UserBooking = {
  id: string;
  order: boolean;
  dateOrder: string;
  book: Book;
};

export type UserDelivery = {
  id: string;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: Book;
};

export type UserHistory = {
  id: string;
  books: Book[];
};

export type AccountPayloadAction = {
  account: Account;
  success: Success;
};

export type SignInPayloadAction = {
  user: User;
  password: string;
};

export type UploadFileResponse = {
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
};

export type Thumbnail = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type Formats = {
  thumbnail: Thumbnail;
  large: Thumbnail;
  medium: Thumbnail;
  small: Thumbnail;
};
