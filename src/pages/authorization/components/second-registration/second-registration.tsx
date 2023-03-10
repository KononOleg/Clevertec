import { FC, Fragment } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { IRegistrationInputs } from '../registration/registration';
import { TextInput } from '../text-input';

interface IProps {
  register: UseFormRegister<IRegistrationInputs>;
  errors: FieldErrors<IRegistrationInputs>;
  nextStepHandler: () => void;
  isValid: boolean;
}

export const SecondRegistration: FC<IProps> = ({ register, errors, nextStepHandler, isValid }) => (
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
