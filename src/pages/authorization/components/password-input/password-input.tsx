import { FC, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import EyeClosePNG from '../../../../assets/icon-eye-close.png';
import EyeOpenPNG from '../../../../assets/icon-eye-open.png';
import { InputLayout } from '../input-layout';

import './password-input.scss';

interface IProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  isError: FieldError | boolean | undefined;
}

export const PasswordInput: FC<IProps> = ({ label, register, error, isError }) => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');

  return (
    <InputLayout label={label} error={error}>
      <input
        className={`input ${isError ? 'input_error' : ''}`}
        type={isPasswordShow ? 'text' : 'password'}
        placeholder=' '
        {...register}
        onChange={(e) => setPassword(e.target.value)}
      />
      {password && (
        <button className='button_password' type='button' onClick={() => setIsPasswordShow(!isPasswordShow)}>
          <img src={isPasswordShow ? EyeOpenPNG : EyeClosePNG} alt='eye' />
        </button>
      )}
    </InputLayout>
  );
};
