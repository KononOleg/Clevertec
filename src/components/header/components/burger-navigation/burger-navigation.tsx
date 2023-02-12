import { FC, RefObject, useContext, useEffect, useRef } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { ReactComponent as ArrowSVG } from '../../../../assets/icon-arrow.svg';
import { library } from '../../../../constants/library';
import { PATH } from '../../../../constants/path';
import { BurgerContext } from '../../../../context/burger';

import './burger-navigation.scss';

interface IProps {
  burgerEl: RefObject<HTMLButtonElement>;
}

export const BurgerNavigation: FC<IProps> = ({ burgerEl }) => {
  const isAllBooksPath = useMatch(PATH.allBooks);
  const isBookCategoryPath = useMatch(PATH.booksCategory);

  const { isBurgerActive, setIsBurgerActive } = useContext(BurgerContext);
  const navLinkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'link');

  const navEl = useRef<HTMLElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navEl.current || !burgerEl.current) return;
      const target = e.target as HTMLElement;

      if (!navEl.current.contains(target) && !burgerEl.current.contains(target)) setIsBurgerActive(false);
    };

    document.addEventListener('click', onClick, true);

    return () => document.removeEventListener('click', onClick, true);
  }, [burgerEl, isBurgerActive, setIsBurgerActive]);

  return (
    <nav
      className={`navigation burger-navigation ${isBurgerActive ? 'navigation_active' : ''}`}
      ref={navEl}
      data-test-id='burger-navigation'
    >
      <div className='navigation__wrapper'>
        <ul className='links'>
          <li>
            <details open={isAllBooksPath || isBookCategoryPath ? true : false}>
              <summary data-test-id='burger-showcase'>
                <NavLink to={PATH.books} className={navLinkClassName}>
                  <div className='page'>
                    <h5>Витрина книг</h5>
                    <ArrowSVG />
                  </div>
                </NavLink>
              </summary>
              <ul>
                <li>
                  <NavLink to={PATH.allBooks} className={navLinkClassName} data-test-id='burger-books'>
                    <p className='category body_large'>Все книги</p>
                  </NavLink>
                </li>
                <ul>
                  {library.map(({ id, genre, category, length }: any) => (
                    <li key={id}>
                      <NavLink to={`${PATH.books}/${category}`} className={navLinkClassName}>
                        <p className='body_large'>
                          <span className='category'>{`${genre}`}</span>
                          <span className='count'>{`${length}`}</span>
                        </p>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to={PATH.terms} className={navLinkClassName} data-test-id='burger-terms'>
              <h5 className='page'>Правила пользования</h5>
            </NavLink>
          </li>
          <li>
            <NavLink to={PATH.contract} className={navLinkClassName} data-test-id='burger-contract'>
              <h5 className='page'>Договор оферты</h5>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
