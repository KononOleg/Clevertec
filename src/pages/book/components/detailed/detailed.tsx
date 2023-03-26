import { FC, Fragment } from 'react';

import { Book } from '../../../../types';

import './detailed.scss';

type Props = {
  book: Book;
  category: string;
};

export const Detailed: FC<Props> = ({ book, category }) => (
  <div className='detailed'>
    <h5 className='title'>Подробная информация</h5>
    <div className='content'>
      <div className='table'>
        {book.publish && (
          <Fragment>
            <p className='subtitle_large'>Издательство</p>
            <p className='body_large'>{book.publish}</p>
          </Fragment>
        )}

        {book.issueYear && (
          <Fragment>
            <p className='subtitle_large'>Год издания</p>
            <p className='body_large'>{book.issueYear}</p>
          </Fragment>
        )}

        {book.pages && (
          <Fragment>
            <p className='subtitle_large'>Страниц</p>
            <p className='body_large'>{book.pages}</p>
          </Fragment>
        )}

        {book.cover && (
          <Fragment>
            <p className='subtitle_large'>Переплёт</p>
            <p className='body_large'>{book.cover}</p>
          </Fragment>
        )}

        {book.format && (
          <Fragment>
            <p className='subtitle_large'>Формат</p>
            <p className='body_large'>{book.format}</p>
          </Fragment>
        )}
      </div>
      <div className='table'>
        {category && (
          <Fragment>
            <p className='subtitle_large'>Жанр</p>
            <p className='body_large'>{category}</p>
          </Fragment>
        )}

        {book.weight && (
          <Fragment>
            <p className='subtitle_large'>Вес</p>
            <p className='body_large'>{book.weight}</p>
          </Fragment>
        )}

        {book.ISBN && (
          <Fragment>
            <p className='subtitle_large'>ISBN</p>
            <p className='body_large'>{book.ISBN}</p>
          </Fragment>
        )}

        {book.producer && (
          <Fragment>
            <p className='subtitle_large'>Изготовитель</p>
            <p className='body_large'>{book.producer}</p>
          </Fragment>
        )}
      </div>
    </div>
  </div>
);
