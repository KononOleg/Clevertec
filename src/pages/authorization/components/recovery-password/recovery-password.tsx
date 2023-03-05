import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetSlice } from '../../../../store/reducers/auth-slice';
import { recoveryPassword } from '../../../../store/thunks/auth-thunks';
import { ErrorModal } from '../error-modal';
import { PasswordInput } from '../password-input';

import './recovery-password.scss';

interface IFormInputs {
  password: string;
  passwordConfirmation: string;
}

interface IProps {
  code: string;
}

export const RecoveryPassword: FC<IProps> = ({ code }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm<IFormInputs>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isSuccessfulRecoveryPassword } = useAppSelector((state) => state.authSlice);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      recoveryPassword({
        code,
        ...data,
      })
    );
  };

  const resetSliceHandler = useCallback(() => {
    reset();
    dispatch(resetSlice());
  }, [dispatch, reset]);

  useEffect(() => {
    resetSliceHandler();
  }, [resetSliceHandler]);

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title='Данные не сохранились'
          text='Что-то пошло не так. Попробуйте ещё раз'
          buttonText='Повторить'
          onClickHandler={resetSliceHandler}
        />
      )}

      {isSuccessfulRecoveryPassword && (
        <ErrorModal
          title='Новые данные сохранены'
          text='Зайдите в личный кабинет, используя свои логин и новый пароль'
          buttonText='вход'
          onClickHandler={() => navigate(PATH.auth)}
        />
      )}
      {!isSuccessfulRecoveryPassword && !error && (
        <form className='form' onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
          <h4>Восстановление пароля</h4>
          <div className='fields'>
            <div className='input-container'>
              <PasswordInput
                label='Новый пароль'
                isError={!focusedPassword && errors.password}
                register={{
                  ...register('password', {
                    required: true,
                    minLength: 8,
                    validate: {
                      passwordUpperLetter: (value: string) => /(?=.*[A-Z])/.test(value),
                      passwordMinOneNum: (value: string) => /(?=.*[0-9])/.test(value),
                    },
                  }),
                }}
                onBlur={() => setFocusedPassword(false)}
                onFocus={() => setFocusedPassword(true)}
                error={errors.password}
                shouldShowCheckmark={true}
              />
              <p
                className={`error info_large ${!focusedPassword && errors.password ? 'color_error' : ''}`}
                data-test-id='hint'
              >
                Пароль{' '}
                <span
                  className={
                    errors.password?.type === 'minLength' || errors.password?.type === 'required' ? 'color_error' : ''
                  }
                >
                  не менее 8 символов
                </span>
                {' с '}
                <span
                  className={
                    errors.password?.type === 'passwordUpperLetter' || errors.password?.type === 'required'
                      ? 'color_error'
                      : ''
                  }
                >
                  заглавной буквы
                </span>{' '}
                и{' '}
                <span
                  className={
                    errors.password?.type === 'passwordMinOneNum' || errors.password?.type === 'required'
                      ? 'color_error'
                      : ''
                  }
                >
                  цифрой
                </span>
              </p>
            </div>

            <PasswordInput
              label='Повторите пароль'
              isError={errors.passwordConfirmation}
              register={{
                ...register('passwordConfirmation', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return 'Пароли не совпадают';
                    }

                    return true;
                  },
                }),
              }}
              error={errors.passwordConfirmation}
            />
          </div>

          <input className='button' disabled={!isValid} type='submit' value='Сохранить изменения' />

          <p className='body_large'>После сохранения войдите в библиотеку, используя новый пароль</p>
        </form>
      )}
    </Fragment>
  );
};
