import { FC, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Loading } from './components/loading';
import { MainLayout } from './components/main-layout';
import { PATH } from './constants/path';
import { BurgerContext } from './context/burger';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';
import { store } from './store';
import { TermsContentView } from './types';

export const App: FC = () => {
  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);

  return (
    <Provider store={store}>
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
    </Provider>
  );
};
