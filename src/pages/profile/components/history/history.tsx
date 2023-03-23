import { FC } from 'react';

import { IComment, IUserHistory } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './history.scss';

interface IProps {
  history: IUserHistory;
  comments: IComment[];
}

export const History: FC<IProps> = ({ history, comments }) => {
  const { books } = history;

  const isUserComment = (id: string) => (comments.find((comment) => comment.id === id) ? false : true);

  return (
    <div className='history'>
      <h4>История</h4>
      <p className='body_large subtitle'>Список прочитанных книг</p>

      {books ? (
        <div className='cards'>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isTileView={true}
              isHistory={true}
              isUserComment={isUserComment(book.id)}
            />
          ))}
        </div>
      ) : (
        <div className='empty empty_blue'>
          <h3>Вы не читали книг из нашей библиотеки </h3>
        </div>
      )}
    </div>
  );
};
