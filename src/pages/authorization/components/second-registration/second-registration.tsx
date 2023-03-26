import { FC, Fragment } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { RegistrationInputs } from '../registration/registration';
import { TextInput } from '../text-input';

type Props = {
  register: UseFormRegister<RegistrationInputs>;
  errors: FieldErrors<RegistrationInputs>;
  nextStepHandler: () => void;
  isValid: boolean;
};

export const SecondRegistration: FC<Props> = ({ register, errors, nextStepHandler, isValid }) => (
  <Fragment>
    <div className='fields'>
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
    </div>
    <button className='button' type='button' disabled={!isValid} onClick={nextStepHandler}>
      Последний шаг
    </button>
  </Fragment>
);
