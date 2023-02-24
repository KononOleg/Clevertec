import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';

import AvatarPNG from '../../assets/avatar.png';
import LogoPNG from '../../assets/logo.png';
import { PATH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsBurgerActive } from '../../store/reducers/app-slice';

import { BurgerNavigation } from './components/burger-navigation';

import './header.scss';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isBurgerActive } = useAppSelector((state) => state.appSlice);

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
            dispatch(setIsBurgerActive(!isBurgerActive));
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
