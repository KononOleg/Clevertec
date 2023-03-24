import { FC, Fragment, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { BookingModal } from '../../components/booking-modal';
import { ErrorMessage } from '../../components/error-message';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loading } from '../../components/loading';
import { ReviewModal } from '../../components/review-modal';
import { PATH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { authSelector } from '../../store/selectors/auth-selector';
import { librarySelector } from '../../store/selectors/library-selector';
import { getAccount } from '../../store/thunks/account-thunks';
import { getLibrary } from '../../store/thunks/library-thunks';

import './layout.scss';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, isPending } = useAppSelector(authSelector);
  const { isPending: isPendingLibrary, bookingModalParams, reviewModalParams } = useAppSelector(librarySelector);
  const { isPending: isPendingAccount } = useAppSelector(accountSelector);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (isAuth) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      dispatch(getLibrary());
      dispatch(getAccount());
    } else if (!isPending) navigate(PATH.auth);
  }, [dispatch, isAuth, isPending, navigate]);

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
