import { FC, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BookImage } from '../../components/book-image';
import { Button } from '../../components/button';
import { Rating } from '../../components/rating';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBook } from '../../store/thunks/library-thunks';

import { AboutBook } from './components/about-book';
import { Detailed } from './components/detailed';
import { Reviews } from './components/reviews/reviews';
import { BookSwiper } from './components/swiper';

import './book-page.scss';

export const BookPage: FC = () => {
  const { bookId } = useParams();

  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.librarySlice);

  useEffect(() => {
    dispatch(getBook({ bookId: bookId as string }));
  }, [bookId, dispatch]);

  return (
    <section className='book-page'>
      {book && (
        <Fragment>
          <div className='navigation-map'>
            <p>
              {`${book.categories[0]}`}
              <span>/</span> {`${book.title}`}
            </p>
            <div className='background' />
          </div>
          <div className='info'>
            <div className='content'>
              {book.images.length > 1 ? <BookSwiper images={book.images} /> : <BookImage image={book.images[0]} />}

              <div>
                <h3>{book.title}</h3>
                <h5 className='author'>{`${book.authors?.join(',')}, ${book.issueYear}`}</h5>
                <Button booking={book.booking} delivery={book.delivery} />
                <div className='about-book_up'>
                  <AboutBook description={book.description} />
                </div>
              </div>
            </div>
            <div className='about-book_down'>
              <AboutBook description={book.description} />
            </div>
          </div>
          <div className='rating'>
            <h5 className='title'>Рейтинг</h5>
            <div className='content'>
              <Rating rating={book.rating || 0} />
              {book.rating ? <h5>{book.rating}</h5> : <p className='body_small'>ещё нет оценок</p>}
            </div>
          </div>
          <Detailed book={book} category={book.categories[0]} />
          <Reviews reviews={book.comments} />
        </Fragment>
      )}
    </section>
  );
};
