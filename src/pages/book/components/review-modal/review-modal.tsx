import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Modal } from '../../../../components/modal';
import { Rating } from '../../../../components/rating';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setIsReviewModalActive } from '../../../../store/reducers/library-slice';
import { authSelector } from '../../../../store/selectors/auth-selector';
import { createComment } from '../../../../store/thunks/library-thunks';
import { TextAreaInput } from '../textarea-input';

import './review-modal.scss';

interface IFormInputs {
  comment: string;
}

interface IProps {
  book: string;
}

export const ReviewModal: FC<IProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { register, handleSubmit } = useForm<IFormInputs>();

  const [rating, setRating] = useState<number>(0);

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    dispatch(createComment({ rating, text: data.comment, book, user: user?.id as string }));

  const closeModalHandler = () => dispatch(setIsReviewModalActive(false));

  return (
    <Modal title='Оцените книгу' closeModal={closeModalHandler}>
      <p className='subtitle_large'>Ваша оценка</p>
      <Rating rating={rating} setRating={setRating} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextAreaInput label='Оставить отзыв' register={{ ...register('comment') }} />
        <button className='button' type='submit'>
          Оценить
        </button>
      </form>
    </Modal>
  );
};
