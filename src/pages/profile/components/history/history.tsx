import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { librarySelector } from '../../../../store/selectors/library-selector';
import { getAccount } from '../../../../store/thunks/account-thunks';
import { AccountComment, UserHistory } from '../../../../types';
import { HistorySlide } from '../history-slide';

import './history.scss';

type Props = {
  history: UserHistory;
  comments: AccountComment[];
};

export const History: FC<Props> = ({ history, comments }) => {
  const { books } = history;
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(librarySelector);

  useEffect(() => {
    if (success) dispatch(getAccount());
  }, [dispatch, success]);

  return (
    <div className='history' data-test-id='history'>
      <h4>История</h4>
      <p className='body_large subtitle'>Список прочитанных книг</p>

      {books ? (
        <HistorySlide books={books} comments={comments} />
      ) : (
        <div className='empty empty_blue' data-test-id='empty-blue-card'>
          <h3>{'Вы не читали книг\nиз нашей библиотеки'} </h3>
        </div>
      )}
    </div>
  );
};
