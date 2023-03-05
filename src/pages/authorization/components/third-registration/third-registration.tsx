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
      <div className='input-container'>
        <TextInput
          label='Номер телефона'
          mask='+375 (99) 999-99-99'
          isError={errors.phone}
          register={{
            ...register('phone', {
              required: true,
              pattern:
                /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
            }),
          }}
          error={errors.phone}
        />
        <p className={`error info_large ${errors.phone ? 'color_error' : ''}`} data-test-id='hint'>
          В формате +375 (xx) xxx-xx-xx
        </p>
      </div>
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
