import { FC, Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { HttpStatusCode, PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { signIn } from '../../../../store/thunks/auth-thunks';
import { InputLayout } from '../input-layout';

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

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authSlice);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    dispatch(signIn({ login: data.login, password: data.password }));

  useEffect(() => {
    if (error?.status === HttpStatusCode.BAD_REQUEST) setIsAuthError(true);
  }, [error]);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h4>Вход в личный кабинет</h4>
      <div className='fields'>
        <InputLayout label='Логин'>
          <input
            className={`input ${errors.login || isAuthError ? 'input_error' : ''}`}
            placeholder=' '
            {...register('login', { required: true })}
          />
          {errors.login && <span className='error info_large'>Поле не может быть пустым</span>}
        </InputLayout>
        <InputLayout label='Пароль'>
          <input
            className={`input ${errors.password || isAuthError ? 'input_error' : ''}`}
            type='password'
            placeholder=' '
            {...register('password', { required: true })}
          />
          {errors.password && <span className='error info_large'>Поле не может быть пустым</span>}
        </InputLayout>
      </div>
      <div className='forgot-password'>
        {isAuthError ? (
          <Fragment>
            <span className='error info_large'>Неверный логин или пароль!</span>
            <Link to={PATH.forgotPass} className='info_large'>
              Восстановить?
            </Link>
          </Fragment>
        ) : (
          <Link to={PATH.forgotPass} className='info_large'>
            Забыли логин или пароль?
          </Link>
        )}
      </div>

      <input className='button' type='submit' value='Вход' />
      <div className='registration'>
        <p className='body_large'>Нет учётной записи?</p>

        <Link to={PATH.registration}>
          <TextButton text='Регистрация' />
        </Link>
      </div>
    </form>
  );
};
