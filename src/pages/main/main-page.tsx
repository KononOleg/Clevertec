import { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Navigation } from '../../components/navigation';
import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { IBook } from '../../types';

import { BookCard } from './components/book-card';
import { NavigationList } from './components/navigation-list';

import './main-page.scss';

export const MainPage: FC = () => {
  const { category } = useParams();
  const [books, setBooks] = useState<IBook[]>([]);
  const [isTileView, setTileView] = useState<boolean>(true);
  const { library } = useAppSelector((state) => state.librarySlice);

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
        <div className={isTileView ? 'books_vertical' : 'books_horizontal'}>
          {books.map((book: IBook) => (
            <BookCard book={book} key={book.id} isTileView={isTileView} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};