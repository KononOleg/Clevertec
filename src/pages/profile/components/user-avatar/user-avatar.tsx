import { FC } from 'react';

import AvatarPNG from '../../../../assets/avatar.png';
import { API_HOST } from '../../../../constants';
import { IAccount } from '../../../../types';

import './user-avatar.scss';

interface IProps {
  account: IAccount;
}

export const UserAvatar: FC<IProps> = ({ account }) => {
  const { lastName, firstName, avatar } = account;

  return (
    <div className='user-avatar'>
      <img src={avatar ? `${API_HOST}${avatar}` : AvatarPNG} alt='avatar' />

      <h1>
        <span>{lastName}</span> <span>{firstName}</span>
      </h1>
    </div>
  );
};
