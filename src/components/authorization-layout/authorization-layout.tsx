import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { Loading } from '../loading';

import './authorization-layout.scss';

export const AuthorizationLayout: FC = () => {
  const navigate = useNavigate();
  const { isAuth, isPending } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (isAuth) {
      navigate(PATH.allBooks);
    }
  }, [isAuth, navigate]);

  return (
    <Fragment>
      {isPending && <Loading />}
      <div className='authorization-layout' data-test-id='auth'>
        <h3 className='title'>Cleverland</h3>
        <Outlet />
      </div>
    </Fragment>
  );
};
