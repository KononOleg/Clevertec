import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../hooks/redux';
import { TextAreaInput } from '../../../../pages/book/components/textarea-input';
import { setReviewModalParams } from '../../../../store/reducers/library-slice';
import { updateComment } from '../../../../store/thunks/library-thunks';
import { IComment } from '../../../../types';
import { Modal } from '../../../modal';
import { Rating } from '../../../rating';

interface IFormInputs {
  comment: string;
}

interface IProps {
  bookId: string;
  userId: string;
  comment: IComment;
}

export const UpdateReview: FC<IProps> = ({ bookId, userId, comment }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormInputs>({ defaultValues: { comment: comment.text } });

  const [rating, setRating] = useState<number>(comment.rating);

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
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
