import { FC, RefObject, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setIsBurgerActive } from '../../../../store/reducers/app-slice';
import { Navigation } from '../../../navigation';

import './burger-navigation.scss';

interface IProps {
  burgerEl: RefObject<HTMLButtonElement>;
}

export const BurgerNavigation: FC<IProps> = ({ burgerEl }) => {
  const dispatch = useAppDispatch();
  const { isBurgerActive } = useAppSelector((state) => state.appSlice);

  const navEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navEl.current || !burgerEl.current) return;
      const target = e.target as HTMLDivElement;

      if (!navEl.current.contains(target) && !burgerEl.current.contains(target)) dispatch(setIsBurgerActive(false));
    };

    document.addEventListener('click', onClick, true);

    return () => document.removeEventListener('click', onClick, true);
  }, [burgerEl, dispatch, isBurgerActive]);

  return (
    <div
      className={`burger-navigation ${isBurgerActive ? 'navigation_active' : ''}`}
      ref={navEl}
      data-test-id='burger-navigation'
    >
      <Navigation navigation='burger' />
    </div>
  );
};
