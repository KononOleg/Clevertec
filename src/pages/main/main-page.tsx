import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Navigation } from '../../components/navigation';
import { PATH } from '../../constants';
import { filterBooks, sortBooks } from '../../helpers';
import { useAppSelector } from '../../hooks/redux';
import { IBook } from '../../types';

import { BookCard } from './components/book-card';
import { NavigationList } from './components/navigation-list';

import './main-page.scss';

export const MainPage: FC = () => {
  const { category } = useParams();
  const [books, setBooks] = useState<IBook[]>([]);
  const [isTileView, setTileView] = useState<boolean>(true);
  const { library, isPending, isDescendingOrder, filterText } = useAppSelector((state) => state.librarySlice);

  const filteredBooks = useMemo(() => filterBooks(books, filterText), [books, filterText]);
  const sortedBooks = useMemo(() => sortBooks(filteredBooks, isDescendingOrder), [filteredBooks, isDescendingOrder]);

  useEffect(() => {
    if (category === PATH.all) {
      const concatBooks: IBook[] = [];

      library.forEach((currentLibrary) => concatBooks.push(...currentLibrary.books));
      setBooks(Array.from(new Set(concatBooks)));
    } else {
      const foundCategory = library.find((currentCategory) => currentCategory.path === category);

      if (foundCategory) setBooks(foundCategory.books);
    }
  }, [category, library]);

  const setTileViewHandler = (tileView: boolean) => setTileView(tileView);

  return (
    <Fragment>
      <Navigation />
      <section className='main-page'>
        <NavigationList isTileView={isTileView} setTileViewHandler={setTileViewHandler} />
        {!isPending && (
          <div className={isTileView ? 'books_vertical' : 'books_horizontal'}>
            {sortedBooks.length ? (
              sortedBooks.map((book: IBook) => <BookCard book={book} key={book.id} isTileView={isTileView} />)
            ) : filterText ? (
              <h3 className='message'>По запросу ничего не найдено</h3>
            ) : (
              <h3 className='message'>В этой категории книг ещё нет</h3>
            )}
          </div>
        )}
      </section>
    </Fragment>
  );
};
