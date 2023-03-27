import { FC, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import CheckmarkPNG from '../../../../assets/icon-checkmark.png';
import EyeClosePNG from '../../../../assets/icon-eye-close.png';
import EyeOpenPNG from '../../../../assets/icon-eye-open.png';
import { InputLayout } from '../input-layout';

import './password-input.scss';

type Props = {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  isError: FieldError | boolean | undefined;
  IsValid?: FieldError | boolean | undefined;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: () => void;
  shouldShowCheckmark?: boolean;
  watchPassword?: string;
};

export const PasswordInput: FC<Props> = ({
  label,
  register,
  error,
  isError,
  IsValid,
  onBlur,
  onFocus,
  shouldShowCheckmark,
  watchPassword,
}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [password, setPassword] = useState(watchPassword || '');

  return (
    <InputLayout label={label} error={error}>
      <input
        className={`input ${isError ? 'input_error' : ''}`}
        type={isPasswordShow ? 'text' : 'password'}
        placeholder=' '
        onFocus={onFocus}
        {...register}
        onChange={(e) => {
          setPassword(e.target.value);
          register.onChange(e);
        }}
        onBlur={(e) => {
          register.onBlur(e);
          if (onBlur) onBlur();
        }}
      />
      {password && !IsValid && shouldShowCheckmark && (
        <img className='checkmark' src={CheckmarkPNG} alt='checkmark' data-test-id='checkmark' />
      )}

      {password && (
        <button className='show-password' type='button' onClick={() => setIsPasswordShow(!isPasswordShow)}>
          <img
            src={isPasswordShow ? EyeOpenPNG : EyeClosePNG}
            alt='eye'
            data-test-id={`${isPasswordShow ? 'eye-opened' : 'eye-closed'}`}
          />
        </button>
      )}
    </InputLayout>
  );
};
