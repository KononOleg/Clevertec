import { FC, Fragment } from 'react';

import { regex } from '../../../../constants/regex';

type Props = {
  text: string;
};

const { onlyLetter, onlyNumber, onlyCyrillic, firstUpper, password } = regex;

export const ErrorTextUserName: FC<Props> = ({ text }) => {
  if (text) {
    if (onlyLetter.test(text) && !onlyNumber.test(text) && !onlyCyrillic.test(text)) {
      return (
        <Fragment>
          Используйте для логина латинский алфавит и <span className='color_error'>цифры</span>
        </Fragment>
      );
    }
    if ((!onlyLetter.test(text) && onlyNumber.test(text)) || (onlyCyrillic.test(text) && onlyNumber.test(text))) {
      return (
        <Fragment>
          Используйте для логина <span className='color_error'>латинский алфавит</span> и <span>цифры</span>
        </Fragment>
      );
    }
    if ((onlyCyrillic.test(text) && !onlyNumber.test(text)) || /\s/.test(text)) {
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

export const ErrorTextPassword: FC<Props> = ({ text }) => {
  if (text) {
    if (firstUpper.test(text) && onlyNumber.test(text) && !password.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
          <span>цифрой</span>
        </Fragment>
      );
    }
    if (firstUpper.test(text) && !password.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, c <span>заглавной буквой</span> и{' '}
          <span className='color_error'>цифрой</span>
        </Fragment>
      );
    }
    if (!firstUpper.test(text) && onlyNumber.test(text) && !password.test(text)) {
      return (
        <Fragment>
          Пароль <span className='color_error'>не менее 8 символов</span>, с{' '}
          <span className='color_error'>заглавной буквой</span> и <span>цифрой</span>
        </Fragment>
      );
    }
    if (!firstUpper.test(text) && !onlyNumber.test(text) && !password.test(text)) {
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
