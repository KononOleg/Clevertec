import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { filterBooks, filterCategory, sortBooks } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { librarySelector } from '../../store/selectors/library-selector';
import { getLibrary } from '../../store/thunks/library-thunks';
import { IBook } from '../../types';

import { BookCard } from './components/book-card';
import { NavigationList } from './components/navigation-list';

import './main-page.scss';

export const MainPage: FC = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const [isTileView, setTileView] = useState<boolean>(true);
  const { library, isPending, isDescendingOrder, filterText } = useAppSelector(librarySelector);

  const filteredCategory = useMemo(() => filterCategory(library, category as string), [library, category]);
  const filteredBooks = useMemo(() => filterBooks(filteredCategory, filterText), [filteredCategory, filterText]);
  const sortedBooks = useMemo(() => sortBooks(filteredBooks, isDescendingOrder), [filteredBooks, isDescendingOrder]);

  const setTileViewHandler = (tileView: boolean) => setTileView(tileView);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    dispatch(getLibrary());
  }, [dispatch]);

  return (
    <section className='main-page'>
      <NavigationList isTileView={isTileView} setTileViewHandler={setTileViewHandler} />
      {!isPending && (
        <div className={isTileView ? 'books_vertical' : 'books_horizontal'}>
          {sortedBooks.length ? (
            sortedBooks.map((book: IBook) => <BookCard book={book} key={book.id} isTileView={isTileView} />)
          ) : filterText ? (
            <h3 className='message' data-test-id='search-result-not-found'>
              По запросу ничего не найдено
            </h3>
          ) : (
            <h3 className='message' data-test-id='empty-category'>
              В этой категории книг ещё нет
            </h3>
          )}
        </div>
      )}
    </section>
  );
};
