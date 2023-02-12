export interface IBooks {
  id: string;
  genre: string;
  category: string;
  length: number;
}

export enum TermsContentView {
  Terms,
  Contract,
}

export interface IBook {
  id: string;
  images: IImage[];
  author: string;
  title: string;
  rating: number;
  year: number;
  book: boolean;
  dateTaken: string;
  category: string;
  reviews: IReview[];
}

export interface IReview {
  id: string;
  name: string;
  review: string;
  date: string;
  rating: number;
}

export interface IImage {
  id: string;
  image: string;
}
