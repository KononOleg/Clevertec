import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetPassword } from '../../../../store/thunks/auth-thunks';
import { ErrorModal } from '../error-modal';
import { TextInput } from '../text-input';

import './forgot-password.scss';

interface IFormInputs {
  email: string;
}

export const ForgotPassword: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInputs>();

  const dispatch = useAppDispatch();
  const { isSuccessfulResetPassword, error } = useAppSelector((state) => state.authSlice);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => dispatch(resetPassword(data.email));

  useEffect(() => {
    if (error) setError('email', { message: error.message });
  }, [error, setError]);

  return (
    <div className='forgot-password'>
      {isSuccessfulResetPassword ? (
        <ErrorModal
          title='Письмо выслано'
          text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        />
      ) : (
        <form className='form ' onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
          <Link to={PATH.auth} className='forgot-password_top'>
            <TextButton text='Вход в личный кабинет' />
          </Link>
          <div className='forgot-password__wrapper'>
            <h4>Восстановление</h4>
            <div className='fields'>
              <TextInput
                label='Email'
                isError={errors.email}
                register={{
                  ...register('email', {
                    required: 'Поле не может быть пустым',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                      message: 'Введите корректный e-mail',
                    },
                  }),
                }}
                error={errors.email}
              />
            </div>

            <p className={`info_large ${errors.email ? 'form_error' : ''}`}>
              На это email будет отправлено письмо с инструкциями по восстановлению пароля
            </p>

            <input className='button' type='submit' value='Восстановить' />
            <div className='registration'>
              <p className='body_large'>Нет учётной записи?</p>

              <Link to={PATH.registration}>
                <TextButton text='Регистрация' />
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
