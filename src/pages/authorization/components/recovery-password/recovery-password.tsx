import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { inputErrors, PATH } from '../../../../constants';
import { regex } from '../../../../constants/regex';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetSlice } from '../../../../store/reducers/auth-slice';
import { authSelector } from '../../../../store/selectors/auth-selector';
import { recoveryPassword } from '../../../../store/thunks/auth-thunks';
import { ErrorModal } from '../error-modal';
import { ErrorTextPassword } from '../error-text';
import { PasswordInput } from '../password-input';

type FormInputs = {
  password: string;
  passwordConfirmation: string;
};

type Props = {
  code: string;
};

export const RecoveryPassword: FC<Props> = ({ code }) => {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    watch,
    reset,
    trigger,
  } = useForm<FormInputs>({ mode: 'all' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isSuccessfulRecoveryPassword } = useAppSelector(authSelector);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedPasswordConfirmation, setFocusedPasswordConfirmation] = useState(false);

  const watchPassword = watch('password');

  const isPasswordConfirmationError = !focusedPasswordConfirmation && !!errors.passwordConfirmation?.message;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
                      required: inputErrors.required,
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
                isError={isPasswordConfirmationError ? errors.passwordConfirmation : undefined}
                onFocus={() => {
                  setFocusedPasswordConfirmation(true);
                }}
                onBlur={() => setFocusedPasswordConfirmation(false)}
                register={{
                  ...register('passwordConfirmation', {
                    validate: { match: (value) => value === watchPassword || inputErrors.matchPassword },
                    required: inputErrors.required,
                  }),
                }}
                error={isPasswordConfirmationError ? errors.passwordConfirmation : undefined}
              />
            </div>

            <button className='button' type='submit' disabled={!!errors.password || isPasswordConfirmationError}>
              Сохранить изменения
            </button>
          </form>

          <p className='body_large'>После сохранения войдите в библиотеку, используя новый пароль</p>
        </div>
      )}
    </Fragment>
  );
};
