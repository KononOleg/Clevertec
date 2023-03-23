import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../hooks/redux';
import { TextAreaInput } from '../../../../pages/book/components/textarea-input';
import { setReviewModalParams } from '../../../../store/reducers/library-slice';
import { createComment } from '../../../../store/thunks/library-thunks';
import { Modal } from '../../../modal';
import { Rating } from '../../../rating';

interface IFormInputs {
  comment: string;
}

interface IProps {
  bookId: string;
  userId: string;
}

export const CreateReview: FC<IProps> = ({ bookId, userId }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormInputs>();

  const [rating, setRating] = useState<number>(0);

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    dispatch(
      createComment({
        rating,
        text: data.comment,
        book: bookId,
        user: userId,
      })
    );

  const closeModalHandler = () => dispatch(setReviewModalParams(null));

  return (
    <Modal title='Оцените книгу' testId='modal-rate-book' closeModal={closeModalHandler}>
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
