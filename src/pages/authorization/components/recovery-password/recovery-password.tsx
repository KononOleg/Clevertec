import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../../../constants';
import { regex } from '../../../../constants/regex';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetSlice } from '../../../../store/reducers/auth-slice';
import { recoveryPassword } from '../../../../store/thunks/auth-thunks';
import { ErrorModal } from '../error-modal';
import { ErrorTextPassword } from '../error-text';
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
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    watch,
    reset,
    trigger,
    clearErrors,
    setError,
    getValues,
  } = useForm<IFormInputs>({ mode: 'all' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isSuccessfulRecoveryPassword } = useAppSelector((state) => state.authSlice);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const watchPassword = watch('password');

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
        <div className='authorization'>
          <h4>Восстановление пароля</h4>
          <form className='form' onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
            <div className='fields'>
              <div className='input-container'>
                <PasswordInput
                  label='Новый пароль'
                  isError={!focusedPassword && errors.password}
                  IsValid={errors.password}
                  register={{
                    ...register('password', {
                      required: 'Поле не может быть пустым',
                      pattern: regex.password,
                    }),
                  }}
                  onBlur={() => setFocusedPassword(false)}
                  onFocus={() => setFocusedPassword(true)}
                  onChange={() => {
                    if (touchedFields.passwordConfirmation) trigger('passwordConfirmation');
                  }}
                  error={focusedPassword ? undefined : errors.password}
                  shouldShowCheckmark={true}
                />
                {(errors.password?.type !== 'required' || focusedPassword) && (
                  <p
                    className={`error info_large ${!focusedPassword && errors.password ? 'color_error' : ''}`}
                    data-test-id='hint'
                  >
                    <ErrorTextPassword text={watchPassword} />
                  </p>
                )}
              </div>

              <PasswordInput
                label='Повторите пароль'
                isError={errors.passwordConfirmation}
                onFocus={() => {
                  if (errors.passwordConfirmation?.type !== 'required') clearErrors('passwordConfirmation');
                }}
                onBlur={() => {
                  if (!getValues('passwordConfirmation'))
                    setError('passwordConfirmation', { message: 'Поле не может быть пустым', type: 'required' });
                  else if (getValues('passwordConfirmation') !== watchPassword)
                    setError('passwordConfirmation', { message: 'Пароли не совпадают' });
                }}
                onChange={() => {
                  if (!getValues('passwordConfirmation'))
                    setError('passwordConfirmation', { message: 'Поле не может быть пустым', type: 'required' });
                }}
                register={{
                  ...register('passwordConfirmation'),
                }}
                error={errors.passwordConfirmation}
              />
            </div>

            <button className='button' type='submit' disabled={!isValid}>
              Сохранить изменения
            </button>
          </form>

          <p className='body_large'>После сохранения войдите в библиотеку, используя новый пароль</p>
        </div>
      )}
    </Fragment>
  );
};
