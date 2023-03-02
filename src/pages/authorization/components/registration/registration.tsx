import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { PATH } from '../../../../constants';

interface IFormInputs {
  login: string;
  password: string;
}

export const Registration: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const [step, setStep] = useState<number>(1);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  const nextStepHandler = () => setStep((prev) => prev + 1);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h4>Регистрация</h4>
      <p className='subtitle_small'>{`${step} шаг из 3`}</p>
      {step === 1 && <div />}
      {step === 2 && <div />}
      {step === 3 && <div />}

      <div className='registration'>
        <p className='body_large'>Есть учётная запись?</p>

        <Link to={PATH.auth}>
          <TextButton text='Войти' />
        </Link>
      </div>
    </form>
  );
};
