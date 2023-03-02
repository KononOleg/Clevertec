import { FC, Fragment } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { IRegistrationInputs } from '../registration/registration';
import { TextInput } from '../text-input';

interface IProps {
  register: UseFormRegister<IRegistrationInputs>;
  errors: FieldErrors<IRegistrationInputs>;
}

export const ThirdRegistration: FC<IProps> = ({ register, errors }) => (
  <Fragment>
    <div className='fields'>
      <TextInput
        label='Номер телефона'
        isError={errors.phone}
        register={{ ...register('phone', { required: 'Поле не может быть пустым' }) }}
        error={errors.phone}
      />
      <TextInput
        label='E-mail'
        isError={errors.email}
        register={{
          ...register('email', {
            required: 'Поле не может быть пустым',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
              message: 'Введите корректный e-mail',
            },
          }),
        }}
        error={errors.email}
      />
    </div>
    <input className='button' type='submit' value='Зарегистрироваться' />
  </Fragment>
);
