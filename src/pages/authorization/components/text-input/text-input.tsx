import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { InputLayout } from '../input-layout';

import './text-input.scss';

interface IProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  isError: FieldError | boolean | undefined;
  onBlur?: () => void;
  onFocus?: () => void;
  mask?: string;
  maskChar?: string;
}

export const TextInput: FC<IProps> = ({ label, register, error, isError, onFocus, onBlur, mask, maskChar }) => (
  <InputLayout label={label} error={error}>
    {mask ? (
      <InputMask
        className={`input ${isError ? 'input_error' : ''}`}
        type='text'
        mask={mask}
        maskChar={maskChar}
        placeholder=' '
        onFocus={onFocus}
        {...register}
        onBlur={(e) => {
          register.onBlur(e);
          if (onBlur) onBlur();
        }}
      />
    ) : (
      <input
        className={`input ${isError ? 'input_error' : ''}`}
        type='text'
        placeholder=' '
        onFocus={onFocus}
        {...register}
        onBlur={(e) => {
          register.onBlur(e);
          if (onBlur) onBlur();
        }}
      />
    )}
  </InputLayout>
);
