import { PATH } from '../constants';
import { IBook, ILibrary } from '../types';

export const sortBooks = (books: IBook[], isDescendingOrder: boolean) => {
  const booksWithoutRating = books.filter((book) => book.rating === null);
  const booksWithRating = books.filter((book) => book.rating !== null);

  booksWithRating.sort((a, b) => {
    if (a.rating !== undefined && b.rating !== undefined) {
      return a.rating > b.rating ? -1 : 1;
    }

    return 0;
  });

  return isDescendingOrder
    ? booksWithRating.concat(booksWithoutRating)
    : booksWithoutRating.concat(booksWithRating.reverse());
};

export const filterBooks = (books: IBook[], filterText: string) =>
  books.filter((book) => book.title.toLowerCase().includes(filterText.toLowerCase()));

export const filterCategory = (library: ILibrary[], category: string) => {
  if (category === PATH.all) {
    const concatBooks: IBook[] = [];

    library.forEach((currentLibrary) => concatBooks.push(...currentLibrary.books));

    return Array.from(new Set(concatBooks));
  }
  const foundCategory = library.find((currentCategory) => currentCategory.path === category);

  if (foundCategory) return foundCategory.books;

  return [];
};
