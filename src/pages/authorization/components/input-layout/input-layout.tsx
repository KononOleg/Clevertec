import { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

import './input-layout.scss';

interface IProps {
  children: ReactNode;
  label: string;
  error: FieldError | undefined;
}

export const InputLayout: FC<IProps> = ({ children, label, error }) => (
  <div className='input-container'>
    {children}
    <label className='input-label'>{label}</label>
    {error && (
      <span className='error color_error info_large' data-test-id='hint'>
        {error.message}
      </span>
    )}
  </div>
);
