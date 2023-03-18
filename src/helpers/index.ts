import moment, { Moment } from 'moment';

import { PATH } from '../constants';
import { IBook, ICategory, IComment, ILibrary } from '../types';

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

export const createLibrary = (categories: ICategory[], books: IBook[]) => {
  const library: ILibrary[] = categories.map((category) => ({ ...category, books: [] }));

  books.forEach((book) => {
    book.categories.forEach((category) => {
      const categoryIndex = library.findIndex((currentCategory) => currentCategory.name === category);

      library[categoryIndex].books.push(book);
    });
  });

  return library;
};

export const sortComments = (comments: IComment[]) =>
  [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const buildCalender = (value: Moment) => {
  const startDay = value.clone().startOf('month').startOf('isoWeek').subtract(1, 'day');
  const endDay = value.clone().endOf('month');

  const calenderMatrix = [];

  do {
    calenderMatrix.push(
      Array(7)
        .fill(0)
        .map(() => startDay.add(1, 'day').clone())
    );
  } while (startDay.isBefore(endDay, 'day'));

  return calenderMatrix;
};

export const getPrevMonth = (value: Moment) => {
  if (value.month() > 0) return value.clone().subtract(1, 'month');

  return moment().endOf('year');
};

export const getNextMonth = (value: Moment) => {
  if (value.month() < 11) return value.clone().add(1, 'month');

  return moment().startOf('year');
};

export const isToday = (value: Moment) => moment(value).isSame(moment(), 'day');

export const compareDates = (firstValue: Moment, secondValue: Moment) => moment(firstValue).isSame(secondValue, 'day');

export const getSecondBookDate = (value: Moment) => {
  if (value.clone().day() === 5) return value.clone().add(3, 'day');
  if (value.clone().day() === 6) return value.clone().add(2, 'day');

  return value.clone().add(1, 'day');
};

export const isHoliday = (value: Moment) => value.day() === 6 || value.day() === 0;

export const setMonth = (index: number) => moment().set('month', index);

export const isOneMonth = (firstValue: Moment, secondValue: Moment) =>
  firstValue.format('M') === secondValue.format('M');

export const getNumberMonth = (value: Moment) => (value.format('M') as unknown as number) - 1;
