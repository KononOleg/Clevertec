import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Modal } from '../../../../components/modal';
import { Rating } from '../../../../components/rating';
import { TextInput } from '../../../authorization/components/text-input';

import './review-modal.scss';

interface IFormInputs {
  comment: string;
}

export const ReviewModal: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = () => {};

  return (
    <Modal closeModal={() => {}}>
      <p className='subtitle_large'>Ваша оценка</p>
      <Rating rating={4} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label='Оставить отзыв'
          isError={errors.comment}
          register={{ ...register('comment') }}
          error={errors.comment}
        />
        <button className='button' type='submit'>
          Оценить
        </button>
      </form>
    </Modal>
  );
};
