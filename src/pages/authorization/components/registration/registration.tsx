import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { PATH } from '../../../../constants';
import { FirstRegistration } from '../first-registration';
import { SecondRegistration } from '../second-registration';
import { ThirdRegistration } from '../third-registration';

export interface IRegistrationInputs {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const Registration: FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IRegistrationInputs>();

  const [step, setStep] = useState<number>(1);

  const onSubmit: SubmitHandler<IRegistrationInputs> = () => {};

  const nextStepHandler = () => setStep((prev) => prev + 1);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h4>Регистрация</h4>
      <p className='subtitle_small'>{`${step} шаг из 3`}</p>
      {step === 1 && (
        <FirstRegistration register={register} errors={errors} nextStepHandler={nextStepHandler} isValid={isValid} />
      )}
      {step === 2 && (
        <SecondRegistration register={register} errors={errors} nextStepHandler={nextStepHandler} isValid={isValid} />
      )}
      {step === 3 && <ThirdRegistration register={register} errors={errors} />}

      <div className='registration'>
        <p className='body_large'>Есть учётная запись?</p>

        <Link to={PATH.auth}>
          <TextButton text='Войти' />
        </Link>
      </div>
    </form>
  );
};
