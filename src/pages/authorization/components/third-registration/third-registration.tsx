import { FC, Fragment } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { phoneMask } from '../../../../constants';
import { regex } from '../../../../constants/regex';
import { RegistrationInputs } from '../registration/registration';
import { TextInput } from '../text-input';

type Props = {
  register: UseFormRegister<RegistrationInputs>;
  errors: FieldErrors<RegistrationInputs>;
  isValid: boolean;
};

export const ThirdRegistration: FC<Props> = ({ register, errors, isValid }) => (
  <Fragment>
    <div className='fields'>
      <div className='input-container'>
        <TextInput
          label='Номер телефона'
          mask={phoneMask}
          isError={errors.phone}
          register={{
            ...register('phone', {
              required: 'Поле не может быть пустым',
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

    <button className='button' type='submit' disabled={!isValid}>
      Зарегистрироваться
    </button>
  </Fragment>
);
