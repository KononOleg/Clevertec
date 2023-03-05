import { FC, Fragment } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { ReactComponent as ArrowSVG } from '../../assets/icon-arrow.svg';
import { PATH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsBurgerActive } from '../../store/reducers/app-slice';
import { resetSlice } from '../../store/reducers/auth-slice';
import { ILibrary } from '../../types';

import './navigation.scss';

interface IProps {
  navigation: string;
}

export const Navigation: FC<IProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isAllBooksPath = useMatch(PATH.allBooks);
  const isBookCategoryPath = useMatch(PATH.booksCategory);
  const { library } = useAppSelector((state) => state.librarySlice);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'link');

  const resetSliceHandler = () => dispatch(resetSlice());
  const closeBurgerHandler = () => dispatch(setIsBurgerActive(false));

  return (
    <nav className='navigation'>
      <div className='navigation__wrapper'>
        <ul className='links'>
          <li>
            <details open={isAllBooksPath || isBookCategoryPath ? true : false}>
              <summary data-test-id={`${navigation}-showcase`}>
                <NavLink to={PATH.books} className={({ isActive }) => `${isActive ? 'active' : 'link'} disabled`}>
                  <div className='page'>
                    <h5>Витрина книг</h5>
                    <ArrowSVG />
                  </div>
                </NavLink>
              </summary>
              <ul>
                <li>
                  <NavLink to={PATH.allBooks} className={navLinkClassName} onClick={closeBurgerHandler}>
                    <p className='category body_large' data-test-id={`${navigation}-books`}>
                      Все книги
                    </p>
                  </NavLink>
                </li>
                <ul>
                  {library.map(({ id, name, path, books }: ILibrary) => (
                    <li key={id}>
                      <p className='body_large'>
                        <NavLink
                          to={`${PATH.books}/${path}`}
                          className={navLinkClassName}
                          data-test-id={`${navigation}-${path}`}
                          onClick={closeBurgerHandler}
                        >
                          <span className='category'>{name}</span>
                        </NavLink>
                        <span className='count' data-test-id={`${navigation}-book-count-for-${path}`}>
                          {books.length}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </ul>
            </details>
          </li>
          <li>
            <NavLink
              to={PATH.terms}
              className={navLinkClassName}
              data-test-id={`${navigation}-terms`}
              onClick={closeBurgerHandler}
            >
              <h5 className='page'>Правила пользования</h5>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={PATH.contract}
              className={navLinkClassName}
              data-test-id={`${navigation}-contract`}
              onClick={closeBurgerHandler}
            >
              <h5 className='page'>Договор оферты</h5>
            </NavLink>
          </li>
        </ul>
        {navigation === 'burger' && (
          <Fragment>
            <div className='border' />
            <ul className='links'>
              <li>
                <NavLink to={PATH.profile} className={navLinkClassName} onClick={closeBurgerHandler}>
                  <h5 className='page'>Профиль</h5>
                </NavLink>
              </li>
              <li>
                <button type='button' onClick={resetSliceHandler}>
                  <h5 className='page'>Выход</h5>
                </button>
              </li>
            </ul>
          </Fragment>
        )}
      </div>
    </nav>
  );
};
