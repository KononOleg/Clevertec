import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { ErrorMessage } from '../error-message';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loading } from '../loading';

import './layout.scss';

export const Layout: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const { isPending } = useAppSelector((state) => state.librarySlice);

  useEffect(() => {
    if (!isAuth) {
      navigate(PATH.auth);
    }
  }, [isAuth, navigate]);

  return (
    <Fragment>
      {isPending && <Loading />}

      <div className='main-layout'>
        <div className='main-layout__wrapper'>
          <ErrorMessage />

          <Header />
          <main className='main'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
