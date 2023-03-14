import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { InputLayout } from '../../../authorization/components/input-layout';

interface IProps {
  label: string;
  register: UseFormRegisterReturn;
}

export const TextAreaInput: FC<IProps> = ({ label, register }) => (
  <InputLayout label={label} error={undefined}>
    <textarea className='input textarea' placeholder=' ' {...register} />
  </InputLayout>
);
