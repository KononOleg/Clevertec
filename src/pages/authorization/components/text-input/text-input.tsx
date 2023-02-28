import { FC, ReactNode } from 'react';

import './text-input.scss';

interface IProps {
  children: ReactNode;
  label: string;
}

export const TextInput: FC<IProps> = ({ children, label }) => (
  <div className='input-container'>
    {children}
    <label className='input-label'>{label}</label>
  </div>
);
