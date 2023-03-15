import moment, { Moment } from 'moment';

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

export const buildCalender = (value: Moment) => {
  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');

  const calenderMatrix = [];

  while (startDay.isBefore(endDay, 'day')) {
    calenderMatrix.push(
      Array(7)
        .fill(0)
        .map(() => startDay.add(1, 'day').clone())
    );
  }

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
  if (value.clone().add(1, 'day').day() === 6) return value.clone().add(3, 'day');

  return value.clone().add(1, 'day');
};

export const isHoliday = (index: number) => index === 5 || index === 6;
