import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { inputErrors, phoneMask } from '../../../../constants';
import { regex } from '../../../../constants/regex';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { authSelector } from '../../../../store/selectors/auth-selector';
import { updateAccount } from '../../../../store/thunks/account-thunks';
import { Account } from '../../../../types';
import { ErrorTextPassword, ErrorTextUserName } from '../../../authorization/components/error-text';
import { PasswordInput } from '../../../authorization/components/password-input';
import { TextInput } from '../../../authorization/components/text-input';

import './credentials.scss';

type Props = {
  account: Account;
};

type FormInputs = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export const Сredentials: FC<Props> = ({ account }) => {
  const dispatch = useAppDispatch();
  const { password } = useAppSelector(authSelector);
  const { lastName, firstName, username, phone, email } = account;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      lastName,
      firstName,
      phone,
      login: username,
      email,
      password,
    },
    mode: 'all',
  });

  const [isDisabledInputs, setIsDisabledInputs] = useState(true);
  const [focusedUserName, setFocusedUserName] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);

  const watchUserName = watch('login');
  const watchPassword = watch('password');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(updateAccount({ user: { username: data.login, ...data }, userId: account.id }));
    setIsDisabledInputs(true);
  };

  return (
    <div className='credentials' data-test-id='profile-form'>
      <h4>Учётные данные</h4>
      <p className='body_large subtitle'>Здесь вы можете отредактировать информацию о себе</p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='fields' disabled={isDisabledInputs}>
          <div className='input-container'>
            <TextInput
              label='Логин'
              isError={!focusedUserName && errors.login}
              register={{
                ...register('login', {
                  required: inputErrors.required,
                  pattern: regex.username,
                }),
              }}
              onBlur={() => setFocusedUserName(false)}
              onFocus={() => setFocusedUserName(true)}
              error={errors.login}
            />
            {errors.login?.type !== 'required' && (
              <p
                className={`error info_large ${!focusedUserName && errors.login ? 'color_error' : ''}`}
                data-test-id='hint'
              >
                <ErrorTextUserName text={watchUserName} />
              </p>
            )}
          </div>
          <div className='input-container'>
            <PasswordInput
              label='Пароль'
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
              error={errors.password}
              shouldShowCheckmark={true}
              watchPassword={watchPassword}
            />
            {errors.password?.type !== 'required' && (
              <p
                className={`error info_large ${!focusedPassword && errors.password ? 'color_error' : ''}`}
                data-test-id='hint'
              >
                <ErrorTextPassword text={watchPassword} />
              </p>
            )}
          </div>
          <TextInput
            label='Имя'
            isError={errors.firstName}
            register={{ ...register('firstName', { required: inputErrors.required }) }}
            error={errors.firstName}
          />
          <TextInput
            label='Фамилия'
            isError={errors.lastName}
            register={{ ...register('lastName', { required: inputErrors.required }) }}
            error={errors.lastName}
          />
          <div className='input-container'>
            <TextInput
              label='Номер телефона'
              mask={phoneMask}
              isError={errors.phone}
              register={{
                ...register('phone', {
                  required: true,
                  pattern: regex.phone,
                }),
              }}
              error={errors.phone}
              alwaysShowMask={true}
            />
            {errors.phone && (
              <p
                className={`error info_large ${errors.phone ? 'color_error' : ''}`}
                data-test-id={errors.phone ? 'hint' : ''}
              >
                {inputErrors.phone}
              </p>
            )}
          </div>

          <TextInput
            label='E-mail'
            isError={errors.email}
            register={{
              ...register('email', {
                required: inputErrors.required,
                pattern: {
                  value: regex.email,
                  message: inputErrors.email,
                },
              }),
            }}
            error={errors.email}
          />
        </fieldset>

        <div className='buttons'>
          <button
            type='button'
            data-test-id='edit-button'
            className='button button_secondary'
            onClick={() => setIsDisabledInputs(!isDisabledInputs)}
          >
            Редактировать
          </button>

          <button type='submit' data-test-id='save-button' className='button' disabled={isDisabledInputs}>
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
};
