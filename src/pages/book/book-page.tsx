import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { BookImage } from '../../components/book-image';
import { Button } from '../../components/button';
import { Rating } from '../../components/rating';
import { books } from '../../constants/books';
import { library } from '../../constants/library';

import { AboutBook } from './components/about-book';
import { Detailed } from './components/detailed';
import { Reviews } from './components/reviews/reviews';
import { BookSwiper } from './components/swiper';

import './book-page.scss';

export const BookPage: FC = () => {
  const { category, bookId } = useParams();
  const book = books.find((b) => b.id === bookId) as any;
  const genry = library.find((c) => c.category === category)?.genre;

  return (
    <section className='book-page'>
      <div className='navigation-map'>
        <p>
          {`${genry}`}
          <span>/</span> {`${book.title}`}
        </p>
        <div className='background' />
      </div>
      <div className='info'>
        <div className='content'>
          {book.images.length > 1 ? <BookSwiper images={book.images} /> : <BookImage images={book.images} />}

          <div>
            <h3>{book.title}</h3>
            <h5 className='author'>{`${book.author}, ${book.year}`}</h5>
            <Button book={book.book} dateTaken={book.dateTaken} />
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
          <Rating rating={book.rating} />
          {book.rating ? <h5>{book.rating}</h5> : <p className='body_small'>ещё нет оценок</p>}
        </div>
      </div>
      <Detailed />
      <Reviews reviews={book.reviews} />
    </section>
  );
};
