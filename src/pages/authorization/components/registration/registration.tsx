import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { TextButton } from '../../../../components/text-button';
import { HttpStatusCode, PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetSlice } from '../../../../store/reducers/auth-slice';
import { authSelector } from '../../../../store/selectors/auth-selector';
import { signUp } from '../../../../store/thunks/auth-thunks';
import { RegistrationStep } from '../../../../types';
import { ErrorModal } from '../error-modal';
import { FirstRegistration } from '../first-registration';
import { SecondRegistration } from '../second-registration';
import { ThirdRegistration } from '../third-registration';

export interface IRegistrationInputs {
  username: string;
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
    reset,
    watch,
  } = useForm<IRegistrationInputs>({ mode: 'all' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isSuccessfulRegistration } = useAppSelector(authSelector);
  const [step, setStep] = useState<number>(RegistrationStep.FirstStep);

  const onSubmit: SubmitHandler<IRegistrationInputs> = (data) => dispatch(signUp({ ...data }));

  const resetSliceHandler = useCallback(() => {
    reset();
    setStep(1);
    dispatch(resetSlice());
  }, [dispatch, reset]);

  const nextStepHandler = () => {
    if (isValid) setStep((prev) => prev + 1);
  };

  useEffect(() => {
    resetSliceHandler();
  }, [resetSliceHandler]);

  return (
    <Fragment>
      {error && error.status === HttpStatusCode.BAD_REQUEST && (
        <ErrorModal
          title='Данные не сохранились'
          text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
          buttonText='назад к регистрации'
          onClickHandler={resetSliceHandler}
        />
      )}

      {error && error.status !== HttpStatusCode.BAD_REQUEST && (
        <ErrorModal
          title='Данные не сохранились'
          text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
          buttonText='повторить'
          onClickHandler={resetSliceHandler}
        />
      )}

      {isSuccessfulRegistration && (
        <ErrorModal
          title='Регистрация успешна'
          text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
          buttonText='вход'
          onClickHandler={() => navigate(PATH.auth)}
        />
      )}

      {!isSuccessfulRegistration && !error && (
        <div className='authorization'>
          <h4>Регистрация</h4>
          <p className='subtitle_small step'>{`${step} шаг из 3`}</p>

          <form className='form' onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
            {step === RegistrationStep.FirstStep && (
              <FirstRegistration
                register={register}
                errors={errors}
                nextStepHandler={nextStepHandler}
                isValid={isValid}
                watch={watch}
              />
            )}
            {step === RegistrationStep.SecondStep && (
              <SecondRegistration
                register={register}
                errors={errors}
                nextStepHandler={nextStepHandler}
                isValid={isValid}
              />
            )}
            {step === RegistrationStep.ThirdStep && (
              <ThirdRegistration register={register} errors={errors} isValid={isValid} />
            )}
          </form>

          <div className='registration'>
            <p className='body_large'>Есть учётная запись?</p>

            <Link to={PATH.auth}>
              <TextButton text='Войти' />
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};
