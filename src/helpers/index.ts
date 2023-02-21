import { IBook } from '../types';

export const sortBooks = (books: IBook[]) =>
  [...books].sort((a, b) => {
    if (a.rating !== undefined && b.rating !== undefined) {
      return a.rating > b.rating ? -1 : 1;
    }

    return 0;
  });
