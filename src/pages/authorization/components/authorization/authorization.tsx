import { FC, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { HttpStatusCode, PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetSlice } from '../../../../store/reducers/auth-slice';
import { signIn } from '../../../../store/thunks/auth-thunks';
import { ErrorModal } from '../error-modal';
import { PasswordInput } from '../password-input';
import { TextInput } from '../text-input';

interface IFormInputs {
  identifier: string;
  password: string;
}

export const Authorization: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ mode: 'all' });

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authSlice);

  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
    dispatch(signIn({ login: data.identifier, password: data.password }));

  const isAuthError = error?.status === HttpStatusCode.BAD_REQUEST ? true : false;

  return (
    <div>
      {error && !isAuthError ? (
        <ErrorModal
          title='Вход не выполнен'
          text='Что-то пошло не так. Попробуйте ещё раз'
          buttonText='повторить'
          onClickHandler={() => dispatch(resetSlice())}
        />
      ) : (
        <div className='authorization'>
          <h4>Вход в личный кабинет</h4>
          <form className='form' onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
            <div className='fields'>
              <TextInput
                label='Логин'
                isError={errors.identifier || isAuthError}
                register={{ ...register('identifier', { required: 'Поле не может быть пустым' }) }}
                error={errors.identifier}
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
                  <span className=' info_large color_error' data-test-id='hint'>
                    Неверный логин или пароль!
                  </span>
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

            <button className='button' type='submit'>
              Вход
            </button>
          </form>

          <div className='registration'>
            <p className='body_large'>Нет учётной записи?</p>

            <Link to={PATH.registration}>
              <TextButton text='Регистрация' />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
