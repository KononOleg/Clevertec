import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { librarySelector } from '../../../../store/selectors/library-selector';
import { getAccount } from '../../../../store/thunks/account-thunks';
import { IComment, IUserHistory } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './history.scss';

interface IProps {
  history: IUserHistory;
  comments: IComment[];
}

export const History: FC<IProps> = ({ history, comments }) => {
  const { books } = history;

  const dispatch = useAppDispatch();
  const { success } = useAppSelector(librarySelector);

  const searchComment = (id: string) => comments.find((comment) => comment.id === id);

  useEffect(() => {
    if (success) dispatch(getAccount());
  }, [dispatch, success]);

  return (
    <div className='history'>
      <h4>История</h4>
      <p className='body_large subtitle'>Список прочитанных книг</p>

      {books ? (
        <div className='cards'>
          {books.map((book) => (
            <BookCard key={book.id} book={book} isTileView={true} isHistory={true} comment={searchComment(book.id)} />
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
