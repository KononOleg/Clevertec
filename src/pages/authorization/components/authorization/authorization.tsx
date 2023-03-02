import { FC, Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { HttpStatusCode, PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { signIn } from '../../../../store/thunks/auth-thunks';
import { ErrorModal } from '../error-modal';
import { PasswordInput } from '../password-input';
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

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authSlice);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isFatalError, setIsFatalError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    dispatch(signIn({ login: data.login, password: data.password }));

  useEffect(() => {
    if (error) {
      if (error?.status === HttpStatusCode.BAD_REQUEST) setIsAuthError(true);
      else setIsFatalError(true);
    }
  }, [error]);

  return (
    <div>
      {isFatalError ? (
        <ErrorModal
          title='Вход не выполнен'
          text='Что-то пошло не так. Попробуйте ещё раз'
          buttonText='повторить'
          onClickHandler={() => setIsFatalError(false)}
        />
      ) : (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <h4>Вход в личный кабинет</h4>
          <div className='fields'>
            <TextInput
              label='Логин'
              isError={errors.login || isAuthError}
              register={{ ...register('login', { required: 'Поле не может быть пустым' }) }}
              error={errors.login}
            />
            <PasswordInput
              label='Пароль'
              isError={errors.password || isAuthError}
              register={{ ...register('password', { required: 'Поле не может быть пустым' }) }}
              error={errors.password}
            />
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
      )}
    </div>
  );
};
