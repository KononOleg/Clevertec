import { FC, Fragment, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { ErrorTextPassword, ErrorTextUserName } from '../error-text';
import { PasswordInput } from '../password-input';
import { IRegistrationInputs } from '../registration/registration';
import { TextInput } from '../text-input';

interface IProps {
  register: UseFormRegister<IRegistrationInputs>;
  errors: FieldErrors<IRegistrationInputs>;
  nextStepHandler: () => void;
  isValid: boolean;
  watch: UseFormWatch<IRegistrationInputs>;
}

export const FirstRegistration: FC<IProps> = ({ register, errors, nextStepHandler, isValid, watch }) => {
  const [focusedUserName, setFocusedUserName] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);

  const watchUserName = watch('username');
  const watchPassword = watch('password');

  return (
    <Fragment>
      <div className='fields'>
        <div className='input-container'>
          <TextInput
            label='Придумайте логин для входа'
            isError={!focusedUserName && errors.username}
            register={{
              ...register('username', {
                required: 'Поле не может быть пустым',
                pattern: /^[a-zA-Z\d]/,
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
        <div className='input-container'>
          <PasswordInput
            label='Пароль'
            isError={!focusedPassword && errors.password}
            register={{
              ...register('password', {
                required: 'Поле не может быть пустым',
                pattern: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/,
              }),
            }}
            onBlur={() => setFocusedPassword(false)}
            onFocus={() => setFocusedPassword(true)}
            error={errors.password}
            shouldShowCheckmark={true}
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
      </div>

      <button className='button' type='button' disabled={!isValid} onClick={nextStepHandler}>
        Следующий шаг
      </button>
    </Fragment>
  );
};
