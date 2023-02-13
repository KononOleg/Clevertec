import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BookImage } from '../../components/book-image';
import { Button } from '../../components/button';
import { Rating } from '../../components/rating';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBook } from '../../store/thunks/library-thunks';
import { IBook } from '../../types';

import { AboutBook } from './components/about-book';
import { Detailed } from './components/detailed';
import { Reviews } from './components/reviews/reviews';
import { BookSwiper } from './components/swiper';

import './book-page.scss';

export const BookPage: FC = () => {
  const { category, bookId } = useParams();

  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.librarySlice);

  const { title, issueYear, images, booking, authors, delivery, rating, comments } = book as IBook;

  useEffect(() => {
    dispatch(getBook({ bookId: bookId as string }));
  }, [bookId, dispatch]);

  return (
    <section className='book-page'>
      <div className='navigation-map'>
        <p>
          {`${category}`}
          <span>/</span> {`${title}`}
        </p>
        <div className='background' />
      </div>
      <div className='info'>
        <div className='content'>
          {images.length > 1 ? <BookSwiper images={images} /> : <BookImage image={images[0]} />}

          <div>
            <h3>{title}</h3>
            <h5 className='author'>{`${authors?.join(',')}, ${issueYear}`}</h5>
            <Button booking={booking} delivery={delivery} />
            <div className='about-book_up'>
              <AboutBook />
            </div>
          </div>
        </div>
        <div className='about-book_down'>
          <AboutBook />
        </div>
      </div>

      <div className='rating'>
        <h5 className='title'>Рейтинг</h5>
        <div className='content'>
          <Rating rating={rating || 0} />
          {rating ? <h5>{rating}</h5> : <p className='body_small'>ещё нет оценок</p>}
        </div>
      </div>
      <Detailed />
      <Reviews reviews={comments} />
    </section>
  );
};
