import { FC, Fragment } from 'react';

interface IProps {
  text: string;
}

export const ErrorTextUserName: FC<IProps> = ({ text }) => {
  if (text) {
    if (/[A-Za-z]/.test(text) && !/[0-9]/.test(text)) {
      return (
        <Fragment>
          Используйте для логина латинский алфавит и <span className='color_error'>цифры</span>
        </Fragment>
      );
    }
    if ((/[A-Za-z]/.test(text) && !/[0-9]/.test(text)) || (/[А-Яа-я]/.test(text) && /[0-9]/.test(text))) {
      return (
        <Fragment>
          Используйте для логина <span className='color_error'>латинский алфавит</span> и цифры
        </Fragment>
      );
    }
    if ((/[А-Яа-я]/.test(text) && !/[0-9]/.test(text)) || /\s/.test(text)) {
      return (
        <Fragment>
          Используйте для логина <span className='color_error'>латинский алфавит</span> и{' '}
          <span className='color_error'>цифры</span>
        </Fragment>
      );
    }
  }

  return <Fragment>Используйте для логина латинский алфавит и цифры</Fragment>;
};

export const ErrorTextPassword: FC<IProps> = ({ text }) => {
  if (text) {
    if (/[A-Z]/.test(text) && /[0-9]/.test(text) && !/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, с заглавной буквой и цифрой
        </Fragment>
      );
    }
    if (/[A-Z]/.test(text) && !/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, с заглавной буквой и{' '}
          <span className='color_error'>цифрой</span>
        </Fragment>
      );
    }
    if (!/[A-Z]/.test(text) && /[0-9]/.test(text) && !/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, с{' '}
          <span className='color_error'>заглавной буквой</span> и цифрой
        </Fragment>
      );
    }
    if (!/[A-Z]/.test(text) && !/[0-9]/.test(text) && !/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, с{' '}
          <span className='color_error'>заглавной буквой</span> и <span className='color_error'>цифрой</span>
        </Fragment>
      );
    }
  }

  return <Fragment>Пароль не менее 8 символов, с заглавной буквой и цифрой</Fragment>;
};
