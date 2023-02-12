import { FC } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { ReactComponent as ArrowSVG } from '../../assets/icon-arrow.svg';
import { PATH } from '../../constants/path';
import { useAppSelector } from '../../hooks/redux';
import { ICategory } from '../../types';

import './navigation.scss';

export const Navigation: FC = () => {
  const isAllBooksPath = useMatch(PATH.allBooks);
  const isBookCategoryPath = useMatch(PATH.booksCategory);
  const { categories } = useAppSelector((state) => state.librarySlice);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'link');

  return (
    <nav className='navigation navigation-showcase'>
      <div className='navigation__wrapper'>
        <ul className='links'>
          <li>
            <details open={isAllBooksPath || isBookCategoryPath ? true : false}>
              <summary data-test-id='navigation-showcase'>
                <NavLink to={PATH.books} className={navLinkClassName}>
                  <div className='page'>
                    <h5>Витрина книг</h5>
                    <ArrowSVG />
                  </div>
                </NavLink>
              </summary>
              <ul>
                <li>
                  <NavLink to={PATH.allBooks} className={navLinkClassName}>
                    <p className='category body_large all-book' data-test-id='navigation-books'>
                      Все книги
                    </p>
                  </NavLink>
                </li>
                <ul>
                  {categories.map(({ id, name, path }: ICategory) => (
                    <li key={id}>
                      <NavLink to={`${PATH.books}/${path}`} className={navLinkClassName}>
                        <p className='body_large'>
                          <span className='category'>{`${name}`}</span>
                          <span className='count'>10</span>
                        </p>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to={PATH.terms} className={navLinkClassName} data-test-id='navigation-terms'>
              <h5 className='page'>Правила пользования</h5>
            </NavLink>
          </li>
          <li>
            <NavLink to={PATH.contract} className={navLinkClassName} data-test-id='navigation-contract'>
              <h5 className='page'>Договор оферты</h5>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
