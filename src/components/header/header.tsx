import { FC, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import AvatarPNG from '../../assets/avatar.png';
import LogoPNG from '../../assets/logo.png';
import { PATH } from '../../constants/path';
import { BurgerContext } from '../../context/burger';

import { BurgerNavigation } from './components/burger-navigation';

import './header.scss';

export const Header: FC = () => {
  const { isBurgerActive, setIsBurgerActive } = useContext(BurgerContext);

  const burgerEl = useRef<HTMLButtonElement>(null);

  return (
    <header className='header'>
      <BurgerNavigation burgerEl={burgerEl} />
      <div className='header_left'>
        <Link to={PATH.home} className='header__logo'>
          <img src={LogoPNG} alt='logo' />
        </Link>
        <button
          type='button'
          ref={burgerEl}
          className={`burger ${isBurgerActive ? 'burger_active' : ''}`}
          data-test-id='button-burger'
          onClick={() => {
            setIsBurgerActive((current) => !current);
          }}
        >
          <div />
        </button>

        <h3>Библиотека</h3>
      </div>
      <div className='header__person'>
        <p className='subtitle_small'>Привет, Иван!</p>
        <img className='header__avatar' src={AvatarPNG} alt='avatar' />
      </div>
    </header>
  );
};
