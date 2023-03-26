import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../hooks/redux';
import { TextAreaInput } from '../../../../pages/book/components/textarea-input';
import { setReviewModalParams } from '../../../../store/reducers/library-slice';
import { updateComment } from '../../../../store/thunks/library-thunks';
import { Comment } from '../../../../types';
import { Modal } from '../../../modal';
import { Rating } from '../../../rating';

type FormInputs = {
  comment: string;
};

type Props = {
  bookId: string;
  userId: string;
  comment: Comment;
};

export const UpdateReview: FC<Props> = ({ bookId, userId, comment }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormInputs>({ defaultValues: { comment: comment.text } });

  const [rating, setRating] = useState<number>(comment.rating);

  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    dispatch(
      updateComment({
        data: {
          rating,
          text: data.comment,
          book: bookId,
          user: userId,
        },
        commentId: comment.id,
      })
    );

  const closeModalHandler = () => dispatch(setReviewModalParams(null));

  return (
    <Modal title='Хотите изменить оценку?' testId='modal-rate-book' closeModal={closeModalHandler}>
      <p className='subtitle_large'>Ваша оценка</p>
      <Rating rating={rating} setRating={setRating} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextAreaInput label='Оставить отзыв' register={{ ...register('comment') }} />
        <button className='button' type='submit' data-test-id='button-comment'>
          Оценить
        </button>
      </form>
    </Modal>
  );
};
