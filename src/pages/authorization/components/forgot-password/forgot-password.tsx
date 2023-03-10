import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { PATH } from '../../../../constants';
import { regex } from '../../../../constants/regex';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { authSelector } from '../../../../store/selectors/auth-selector';
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
  } = useForm<IFormInputs>({ mode: 'all' });

  const dispatch = useAppDispatch();
  const { isSuccessfulResetPassword, error } = useAppSelector(authSelector);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => dispatch(resetPassword(data.email));

  return (
    <div className='forgot-password '>
      {isSuccessfulResetPassword ? (
        <ErrorModal
          title='Письмо выслано'
          text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        />
      ) : (
        <div className='authorization '>
          <Link to={PATH.auth} className='forgot-password_top'>
            <TextButton text='Вход в личный кабинет' />
          </Link>
          <div className='forgot-password__wrapper'>
            <h4>Восстановление пароля</h4>
            <form className='form ' onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
              <div className='fields'>
                <div className='input-container'>
                  <TextInput
                    label='Email'
                    isError={errors.email}
                    error={errors.email}
                    register={{
                      ...register('email', {
                        required: 'Поле не может быть пустым',

                        pattern: {
                          value: regex.email,
                          message: 'Введите корректный e-mail',
                        },
                      }),
                    }}
                  />
                </div>
                {error && (
                  <p className='error info_large color_error' data-test-id='hint'>
                    {error?.message}
                  </p>
                )}
              </div>

              <p className={`info_large ${errors.email ? 'form_error' : ''}`}>
                На это email будет отправлено письмо с инструкциями по восстановлению пароля
              </p>

              <button className='button' type='submit'>
                Восстановить
              </button>
            </form>

            <div className='registration'>
              <p className='body_large'>Нет учётной записи?</p>

              <Link to={PATH.registration}>
                <TextButton text='Регистрация' />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
