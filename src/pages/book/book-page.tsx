import { FC, Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BookImage } from '../../components/book-image';
import { Button } from '../../components/button';
import { Rating } from '../../components/rating';
import { PATH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBook } from '../../store/thunks/library-thunks';

import { AboutBook } from './components/about-book';
import { Detailed } from './components/detailed';
import { Reviews } from './components/reviews/reviews';
import { BookSwiper } from './components/swiper';

import './book-page.scss';

export const BookPage: FC = () => {
  const { category, bookId } = useParams();

  const dispatch = useAppDispatch();
  const { book, library } = useAppSelector((state) => state.librarySlice);
  const categoryName =
    category === PATH.all ? 'Все книги' : library.find((currentCategory) => currentCategory.path === category)?.name;

  useEffect(() => {
    dispatch(getBook({ bookId: bookId as string }));
  }, [bookId, dispatch]);

  return (
    <section className='book-page'>
      <div className='navigation-map'>
        <p>
          <span>
            <Link to={`${PATH.books}/${category}`} data-test-id='breadcrumbs-link'>
              {`${categoryName || category}`}
            </Link>
          </span>
          <span className='separator'>/</span> <span data-test-id='book-name'>{`${book?.title || ''}`}</span>
        </p>
        <div className='background' />
      </div>
      {book && (
        <Fragment>
          <div className='info'>
            <div className='content'>
              {book.images?.length > 1 ? <BookSwiper images={book.images} /> : <BookImage image={book.images?.[0]} />}

              <div>
                <h3 data-test-id='book-title'>{book.title}</h3>
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
