import { FC, Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { librarySelector } from '../../store/selectors/library-selector';
import { getBook } from '../../store/thunks/library-thunks';
import { ReviewModalParams } from '../../types';

import { CreateReview } from './components/create-review';
import { UpdateReview } from './components/update-review';

import './review-modal.scss';

export const ReviewModal: FC = () => {
  const dispatch = useAppDispatch();
  const { reviewModalParams } = useAppSelector(librarySelector);
  const { account } = useAppSelector(accountSelector);

  const { book, comment } = reviewModalParams || ({} as ReviewModalParams);

  useEffect(() => {
    dispatch(getBook({ bookId: book.id }));
  }, [book.id, dispatch]);

  return (
    <Fragment>
      {!comment && <CreateReview bookId={book.id} userId={account?.id as string} />}
      {comment && <UpdateReview bookId={book.id} userId={account?.id as string} comment={comment} />}
    </Fragment>
  );
};
