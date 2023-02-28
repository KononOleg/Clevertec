import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as ArmSVG } from '../../../../assets/icon-arm.svg';
import { PATH } from '../../../../constants';

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
      <input
        className={`input ${errors.login ? 'input_error' : ''}`}
        placeholder='Логин'
        {...register('login', { required: true })}
      />
      {errors.login && <span className='error'>Поле не может быть пустым</span>}
      <input
        className={`input ${errors.password ? 'input_error' : ''}`}
        placeholder='Пароль'
        {...register('password', { required: true })}
      />
      {errors.password && <span className='error'>Поле не может быть пустым</span>}
      <Link to={PATH.forgotPass}>Забыли логин или пароль?</Link>
      <input className='button' type='submit' value='Вход' />
      <div className='registration'>
        <p className='body_large'>Нет учётной записи?</p>
      </div>
    </form>
  );
};
