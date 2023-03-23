import { FC, Fragment } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { accountSelector } from '../../store/selectors/account-selector';
import { authSelector } from '../../store/selectors/auth-selector';

import { Booking } from './components/booking';
import { Сredentials } from './components/credentials';
import { Delivery } from './components/delivery';
import { History } from './components/history';
import { UserAvatar } from './components/user-avatar';

import './profile.scss';

export const Profile: FC = () => {
  const { password } = useAppSelector(authSelector);
  const { account } = useAppSelector(accountSelector);

  return (
    <section className='profile-page'>
      {account && (
        <Fragment>
          <UserAvatar account={account} />
          <Сredentials account={account} password={password} />
          <Booking booking={account.booking} />
          <Delivery delivery={account.delivery} />
          <History history={account.history} comments={account.comments} />
        </Fragment>
      )}
    </section>
  );
};
