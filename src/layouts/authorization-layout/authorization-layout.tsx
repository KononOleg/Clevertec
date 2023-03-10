import { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Loading } from '../../components/loading';
import { PATH } from '../../constants';
import { useAppSelector } from '../../hooks/redux';
import { authSelector } from '../../store/selectors/auth-selector';

import './authorization-layout.scss';

export const AuthorizationLayout: FC = () => {
  const navigate = useNavigate();
  const { isAuth, isPending } = useAppSelector(authSelector);

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
