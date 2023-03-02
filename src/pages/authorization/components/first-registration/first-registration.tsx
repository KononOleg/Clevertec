import { FC, Fragment } from 'react';
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
  const onSubmitHandler = () => {
    if (isValid) nextStepHandler();
  };

  return (
    <Fragment>
      <div className='fields'>
        <TextInput
          label='Придумайте логин для входа'
          isError={errors.login}
          register={{ ...register('login', { required: 'Поле не может быть пустым' }) }}
          error={errors.login}
        />
        <PasswordInput
          label='Пароль'
          isError={errors.password}
          register={{ ...register('password', { required: 'Поле не может быть пустым' }) }}
          error={errors.password}
        />
      </div>
      <input className='button' type='submit' value='Следующий шаг' onClick={onSubmitHandler} />
    </Fragment>
  );
};
