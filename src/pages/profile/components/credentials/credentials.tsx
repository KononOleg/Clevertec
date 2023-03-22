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
  password: string;
}

interface IFormInputs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const Сredentials: FC<IProps> = ({ account, password }) => {
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
      username,
      email,
      password,
    },
    mode: 'all',
  });

  const [isDisabledInputs, setIsDisabledInputs] = useState<boolean>(true);
  const [focusedUserName, setFocusedUserName] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const watchUserName = watch('username');
  const watchPassword = watch('password');

  const onSubmit: SubmitHandler<IFormInputs> = (data) => dispatch(updateAccount({ user: data, userId: account.id }));

  return (
    <div className='credentials'>
      <h4>Учётные данные</h4>
      <p className='body_large subtitle'>Здесь вы можете отредактировать информацию о себе</p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='fields' disabled={isDisabledInputs}>
          <div className='side'>
            <div className='input-container'>
              <TextInput
                label='Логин'
                isError={!focusedUserName && errors.username}
                register={{
                  ...register('username', {
                    required: 'Поле не может быть пустым',
                    pattern: regex.username,
                  }),
                }}
                onBlur={() => setFocusedUserName(false)}
                onFocus={() => setFocusedUserName(true)}
                error={focusedUserName ? undefined : errors.username}
              />
              {(errors.username?.type !== 'required' || focusedUserName) && (
                <p
                  className={`error info_large ${!focusedUserName && errors.username ? 'color_error' : ''}`}
                  data-test-id='hint'
                >
                  <ErrorTextUserName text={watchUserName} />
                </p>
              )}
            </div>
            <TextInput
              label='Имя'
              isError={errors.firstName}
              register={{ ...register('firstName') }}
              error={errors.firstName}
            />
            <div className='input-container'>
              <TextInput
                label='Номер телефона'
                mask='+375 (99) 999-99-99'
                maskChar='x'
                isError={errors.phone}
                register={{
                  ...register('phone', {
                    pattern: regex.phone,
                  }),
                }}
                error={errors.phone}
              />
              {errors.phone?.type !== 'required' && (
                <p className={`error info_large ${errors.phone ? 'color_error' : ''}`} data-test-id='hint'>
                  В формате +375 (xx) xxx-xx-xx
                </p>
              )}
            </div>
          </div>

          <div className='side'>
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
            <TextInput
              label='Фамилия'
              isError={errors.lastName}
              register={{ ...register('lastName', { required: 'Поле не может быть пустым' }) }}
              error={errors.lastName}
            />
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
          </div>
        </fieldset>

        <div className='buttons'>
          <button type='button' className='button button_secondary' onClick={() => setIsDisabledInputs(false)}>
            Редактировать
          </button>

          <button type='submit' className='button' disabled={isDisabledInputs}>
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
};
