import { FC, useEffect, useMemo, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Loading } from './components/loading';
import { MainLayout } from './components/main-layout';
import { BurgerContext } from './context/burger';
import { useAppDispatch } from './hooks/redux';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';
import { getLibrary } from './store/thunks/library-thunks';
import { PATH } from './constants';
import { TermsContentView } from './types';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getLibrary());
  }, [dispatch]);

  return (
    <BurgerContext.Provider
      value={useMemo(() => ({ isBurgerActive, setIsBurgerActive }), [isBurgerActive, setIsBurgerActive])}
    >
      <Loading />
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={PATH.home}>
              <Route path={PATH.home} element={<Navigate to={PATH.allBooks} />} />
              <Route path={PATH.booksCategory} element={<MainPage />} />
              <Route path={PATH.terms} element={<TermsPage contentView={TermsContentView.Terms} />} />
              <Route path={PATH.contract} element={<TermsPage contentView={TermsContentView.Contract} />} />
            </Route>
            <Route path={PATH.booksId} element={<BookPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </BurgerContext.Provider>
  );
};
