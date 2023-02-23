import { FC } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { ReactComponent as ArrowSVG } from '../../assets/icon-arrow.svg';
import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { ILibrary } from '../../types';

import './navigation.scss';

interface IProps {
  navigation: string;
}

export const Navigation: FC<IProps> = ({ navigation }) => {
  const isAllBooksPath = useMatch(PATH.allBooks);
  const isBookCategoryPath = useMatch(PATH.booksCategory);
  const { library } = useAppSelector((state) => state.librarySlice);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'link');

  return (
    <nav className='navigation'>
      <div className='navigation__wrapper'>
        <ul className='links'>
          <li>
            <details open={isAllBooksPath || isBookCategoryPath ? true : false}>
              <summary data-test-id={`${navigation}-showcase`}>
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
                    <p className='category body_large all-book' data-test-id={`${navigation}-books`}>
                      Все книги
                    </p>
                  </NavLink>
                </li>
                <ul>
                  {library.map(({ id, name, path, books }: ILibrary) => (
                    <li key={id}>
                      <NavLink
                        to={`${PATH.books}/${path}`}
                        className={navLinkClassName}
                        data-test-id={`${navigation}-${path}`}
                      >
                        <p className='body_large'>
                          <span className='category'>{`${name}`}</span>
                          <span className='count' data-test-id={`${navigation}-book-count-for-${path}`}>
                            {books.length}
                          </span>
                        </p>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to={PATH.terms} className={navLinkClassName} data-test-id={`${navigation}-terms`}>
              <h5 className='page'>Правила пользования</h5>
            </NavLink>
          </li>
          <li>
            <NavLink to={PATH.contract} className={navLinkClassName} data-test-id={`${navigation}-contract`}>
              <h5 className='page'>Договор оферты</h5>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
