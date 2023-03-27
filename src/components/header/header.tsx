import { FC, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LogoPNG from '../../assets/logo.png';
import { PATH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsBurgerActive } from '../../store/reducers/app-slice';
import { appSelector } from '../../store/selectors/app-selector';

import { BurgerNavigation } from './components/burger-navigation';
import { Person } from './components/person';

import './header.scss';

export const Header: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isBurgerActive } = useAppSelector(appSelector);

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

        <h3>{location.pathname === PATH.profile ? 'Личный кабинет' : 'Библиотека'}</h3>
      </div>
      <Person />
    </header>
  );
};
