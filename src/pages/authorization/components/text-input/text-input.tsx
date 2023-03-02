import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { InputLayout } from '../input-layout';

import './text-input.scss';

interface IProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  isError: FieldError | boolean | undefined;
}

export const TextInput: FC<IProps> = ({ label, register, error, isError }) => (
  <InputLayout label={label} error={error}>
    <input className={`input ${isError ? 'input_error' : ''}`} type='text' placeholder=' ' {...register} />
  </InputLayout>
);
