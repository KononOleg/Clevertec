import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { InputLayout } from '../../../authorization/components/input-layout';

type Props = {
  label: string;
  register: UseFormRegisterReturn;
};

export const TextAreaInput: FC<Props> = ({ label, register }) => (
  <InputLayout label={label} error={undefined}>
    <textarea className='input textarea' data-test-id='comment' placeholder=' ' {...register} />
  </InputLayout>
);
