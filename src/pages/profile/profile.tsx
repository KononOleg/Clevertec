import { FC, Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { authSelector } from '../../store/selectors/auth-selector';
import { getAccount } from '../../store/thunks/account-thunks';

import { Сredentials } from './components/credentials';
import { UserAvatar } from './components/user-avatar';

import './profile.scss';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { user, password } = useAppSelector(authSelector);
  const { account } = useAppSelector(accountSelector);

  useEffect(() => {
    dispatch(getAccount(user?.id as string));
  }, [dispatch, user?.id]);

  return (
    <section className='profile-page'>
      {account && (
        <Fragment>
          <UserAvatar account={account} />
          <Сredentials account={account} password={password} />
        </Fragment>
      )}
    </section>
  );
};
