import { FC, Fragment, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { PasswordInput } from '../password-input';
import { IRegistrationInputs } from '../registration/registration';
import { TextInput } from '../text-input';

interface IProps {
  register: UseFormRegister<IRegistrationInputs>;
  errors: FieldErrors<IRegistrationInputs>;
  nextStepHandler: () => void;
  isValid: boolean;
}

export const FirstRegistration: FC<IProps> = ({ register, errors, nextStepHandler, isValid }) => {
  const [focusedLogin, setFocusedLogin] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const onSubmitHandler = () => {
    if (isValid) nextStepHandler();
  };

  return (
    <Fragment>
      <div className='fields'>
        <div className='input-container'>
          <TextInput
            label='Придумайте логин для входа'
            isError={!focusedLogin && errors.login}
            register={{
              ...register('login', {
                required: true,
                validate: {
                  loginLetter: (value: string) => /(?=.*[a-zA-Z]).{1,}/.test(value),
                  loginNumber: (value: string) => /(?=.*\d).{1,}/.test(value),
                },
              }),
            }}
            onBlur={() => setFocusedLogin(false)}
            onFocus={() => setFocusedLogin(true)}
            error={errors.login}
          />

          <p className={`error info_large ${!focusedLogin && errors.login ? 'color_error' : ''}`}>
            Используйте для логина{' '}
            <span
              className={errors.login?.type === 'loginLetter' || errors.login?.type === 'required' ? 'color_error' : ''}
            >
              латинский алфавит
            </span>{' '}
            и{' '}
            <span
              className={errors.login?.type === 'loginNumber' || errors.login?.type === 'required' ? 'color_error' : ''}
            >
              цифры
            </span>
          </p>
        </div>
        <div className='input-container'>
          <PasswordInput
            label='Пароль'
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
          />
          <p className={`error info_large ${!focusedPassword && errors.password ? 'color_error' : ''}`}>
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
      </div>
      <input className='button' type='submit' value='Следующий шаг' onClick={onSubmitHandler} />
    </Fragment>
  );
};
