import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { BookingModal } from '../../components/booking-modal';
import { ErrorMessage } from '../../components/error-message';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loading } from '../../components/loading';
import { ReviewModal } from '../../components/review-modal';
import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { authSelector } from '../../store/selectors/auth-selector';
import { librarySelector } from '../../store/selectors/library-selector';

import './layout.scss';

export const Layout: FC = () => {
  const navigate = useNavigate();
  const { isAuth, isPending } = useAppSelector(authSelector);
  const { isPending: isPendingLibrary, bookingModalParams, reviewModalParams } = useAppSelector(librarySelector);
  const { isPending: isPendingAccount } = useAppSelector(accountSelector);

  useEffect(() => {
    if (!isAuth) {
      if (!isPending) navigate(PATH.auth);
    }
  }, [isAuth, isPending, navigate]);

  return (
    <Fragment>
      {(isPendingLibrary || isPendingAccount) && <Loading />}
      {bookingModalParams && <BookingModal />}
      {reviewModalParams && <ReviewModal />}
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
