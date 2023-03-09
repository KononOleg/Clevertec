import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ErrorMessage } from '../../components/error-message';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loading } from '../../components/loading';
import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';

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
