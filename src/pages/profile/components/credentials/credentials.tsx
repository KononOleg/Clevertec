import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { regex } from '../../../../constants/regex';
import { useAppDispatch } from '../../../../hooks/redux';
import { updateAccount } from '../../../../store/thunks/account-thunks';
import { IAccount } from '../../../../types';
import { ErrorTextPassword, ErrorTextUserName } from '../../../authorization/components/error-text';
import { PasswordInput } from '../../../authorization/components/password-input';
import { TextInput } from '../../../authorization/components/text-input';

import './credentials.scss';

interface IProps {
  account: IAccount;
}

interface IFormInputs {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const Сredentials: FC<IProps> = ({ account }) => {
  const dispatch = useAppDispatch();
  const { lastName, firstName, username, phone, email } = account;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    defaultValues: {
      lastName,
      firstName,
      phone,
      login: username,
      email,
      password: ' ',
    },
    mode: 'all',
  });

  const [isDisabledInputs, setIsDisabledInputs] = useState<boolean>(true);
  const [focusedUserName, setFocusedUserName] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const watchUserName = watch('login');
  const watchPassword = watch('password');

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
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
                  required: 'Поле не может быть пустым',
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
                  required: 'Поле не может быть пустым',
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
            register={{ ...register('firstName', { required: 'Поле не может быть пустым' }) }}
            error={errors.firstName}
          />
          <TextInput
            label='Фамилия'
            isError={errors.lastName}
            register={{ ...register('lastName', { required: 'Поле не может быть пустым' }) }}
            error={errors.lastName}
          />
          <div className='input-container'>
            <TextInput
              label='Номер телефона'
              mask='+375 (99) 999-99-99'
              maskChar='x'
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
                В формате +375 (xx) xxx-xx-xx
              </p>
            )}
          </div>

          <TextInput
            label='E-mail'
            isError={errors.email}
            register={{
              ...register('email', {
                required: 'Поле не может быть пустым',
                pattern: {
                  value: regex.email,
                  message: 'Введите корректный e-mail',
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
