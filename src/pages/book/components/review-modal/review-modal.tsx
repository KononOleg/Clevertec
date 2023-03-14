import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Modal } from '../../../../components/modal';
import { Rating } from '../../../../components/rating';
import { TextAreaInput } from '../textarea-input';

import './review-modal.scss';

interface IFormInputs {
  comment: string;
}

export const ReviewModal: FC = () => {
  const { register, handleSubmit } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = () => {};

  const [rating, setRating] = useState<number>(0);

  return (
    <Modal closeModal={() => {}}>
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
