import { FC, useState } from 'react';
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
  alwaysShowMask?: boolean;
}

export const TextInput: FC<IProps> = ({
  label,
  register,
  error,
  isError,
  onFocus,
  onBlur,
  mask,
  maskChar,
  alwaysShowMask,
}) => {
  const [, setIsFocus] = useState<boolean>(false);

  return (
    <InputLayout label={label} error={error}>
      {mask ? (
        <InputMask
          className={`input ${isError ? 'input_error' : ''}`}
          type='text'
          mask={mask}
          maskChar={maskChar}
          alwaysShowMask={alwaysShowMask}
          placeholder=' '
          {...register}
        />
      ) : (
        <input
          className={`input ${isError ? 'input_error' : ''}`}
          type='text'
          placeholder=' '
          onFocus={() => {
            setIsFocus(true);
            if (onFocus) onFocus();
          }}
          {...register}
          onBlur={(e) => {
            register.onBlur(e);
            setIsFocus(false);
            if (onBlur) onBlur();
          }}
        />
      )}
    </InputLayout>
  );
};
