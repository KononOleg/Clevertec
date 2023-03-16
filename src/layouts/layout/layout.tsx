import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { BookingsModal } from '../../components/book-modal';
import { ErrorMessage } from '../../components/error-message';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loading } from '../../components/loading';
import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { authSelector } from '../../store/selectors/auth-selector';
import { librarySelector } from '../../store/selectors/library-selector';

import './layout.scss';

export const Layout: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(authSelector);
  const { isPending, bookingModalParams } = useAppSelector(librarySelector);

  useEffect(() => {
    if (!isAuth) {
      navigate(PATH.auth);
    }
  }, [isAuth, navigate]);

  return (
    <Fragment>
      {isPending && <Loading />}
      {bookingModalParams && <BookingsModal />}
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
