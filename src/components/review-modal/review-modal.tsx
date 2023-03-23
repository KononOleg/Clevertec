import { FC, Fragment } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { librarySelector } from '../../store/selectors/library-selector';
import { ReviewModalParams } from '../../types';

import { CreateReview } from './components/create-review';
import { UpdateReview } from './components/update-review';

import './review-modal.scss';

export const ReviewModal: FC = () => {
  const { reviewModalParams } = useAppSelector(librarySelector);
  const { account } = useAppSelector(accountSelector);

  const { book, comment } = reviewModalParams || ({} as ReviewModalParams);

  return (
    <Fragment>
      {!comment && <CreateReview bookId={book.id} userId={account?.id as string} />}
      {comment && <UpdateReview bookId={book.id} userId={account?.id as string} comment={comment} />}
    </Fragment>
  );
};
