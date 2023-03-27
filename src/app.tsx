import { FC, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch } from './hooks/redux';
import { AuthorizationLayout } from './layouts/authorization-layout';
import { Layout } from './layouts/layout';
import { MainLayout } from './layouts/main-layout';
import { AuthorizationPage } from './pages/authorization';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Profile } from './pages/profile';
import { TermsPage } from './pages/terms';
import { checkisAuth } from './store/reducers/auth-slice';
import { PATH } from './constants';
import { AuthorizationContentView, TermsContentView } from './types';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkisAuth());
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATH.home}>
            <Route element={<MainLayout />}>
              <Route path={PATH.home} element={<Navigate to={PATH.allBooks} />} />
              <Route path={PATH.booksCategory} element={<MainPage />} />
              <Route path={PATH.terms} element={<TermsPage contentView={TermsContentView.Terms} />} />
              <Route path={PATH.contract} element={<TermsPage contentView={TermsContentView.Contract} />} />
            </Route>
          </Route>
          <Route path={PATH.booksId} element={<BookPage />} />
          <Route path={PATH.profile} element={<Profile />} />
        </Route>
        <Route element={<AuthorizationLayout />}>
          <Route path={PATH.auth} element={<AuthorizationPage contentView={AuthorizationContentView.Auth} />} />
          <Route
            path={PATH.registration}
            element={<AuthorizationPage contentView={AuthorizationContentView.Registration} />}
          />
          <Route
            path={PATH.forgotPass}
            element={<AuthorizationPage contentView={AuthorizationContentView.ForgotPass} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
