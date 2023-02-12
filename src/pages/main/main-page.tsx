import { FC, Fragment, useState } from 'react';

import { Navigation } from '../../components/navigation';
import { books } from '../../constants/books';

import { BookCard } from './components/book-card';
import { NavigationList } from './components/navigation-list';

import './main-page.scss';

export const MainPage: FC = () => {
  const [isTileView, setTileView] = useState<boolean>(true);

  const setTileViewHandler = (tileView: boolean) => setTileView(tileView);

  return (
    <Fragment>
      <Navigation />
      <section className='main-page'>
        <NavigationList isTileView={isTileView} setTileViewHandler={setTileViewHandler} />
        <div className={isTileView ? 'books_vertical' : 'books_horizontal'}>
          {books.map((book: any) => (
            <BookCard book={book} key={book.id} isTileView={isTileView} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};
