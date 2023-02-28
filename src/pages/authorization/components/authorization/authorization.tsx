import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as ArmSVG } from '../../../../assets/icon-arm.svg';
import { PATH } from '../../../../constants';
import { TextInput } from '../text-input';

interface IFormInputs {
  login: string;
  password: string;
}

export const Authorization: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h4>Вход в личный кабинет</h4>
      <div className='fields'>
        <TextInput label='Логин'>
          <input
            className={`input ${errors.login ? 'input_error' : ''}`}
            placeholder=' '
            {...register('login', { required: true })}
          />
          {errors.login && <span className='error'>Поле не может быть пустым</span>}
        </TextInput>
        <TextInput label='Пароль'>
          <input
            className={`input ${errors.password ? 'input_error' : ''}`}
            type='password'
            placeholder=' '
            {...register('password', { required: true })}
          />
          {errors.password && <span className='error'>Поле не может быть пустым</span>}
        </TextInput>
      </div>

      <Link to={PATH.forgotPass} className='info_large'>
        Забыли логин или пароль?
      </Link>
      <input className='button' type='submit' value='Вход' />
      <div className='registration'>
        <p className='body_large'>Нет учётной записи?</p>
      </div>
    </form>
  );
};
