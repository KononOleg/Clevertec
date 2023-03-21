import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { authSelector } from '../../store/selectors/auth-selector';
import { getAccount } from '../../store/thunks/account-thunks';

import { UserAvatar } from './components/user-avatar';

import './profile.scss';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { account } = useAppSelector(accountSelector);

  useEffect(() => {
    dispatch(getAccount(user?.id as string));
  }, [dispatch, user?.id]);

  return <section className='profile-page'>{account && <UserAvatar account={account} />}</section>;
};
