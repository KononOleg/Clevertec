import { FC, ReactNode } from 'react';

import './input-layout.scss';

interface IProps {
  children: ReactNode;
  label: string;
}

export const InputLayout: FC<IProps> = ({ children, label }) => (
  <div className='input-container'>
    {children}
    <label className='input-label'>{label}</label>
  </div>
);
