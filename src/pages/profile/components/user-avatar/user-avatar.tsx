import { ChangeEvent, FC } from 'react';

import AvatarPNG from '../../../../assets/avatar.png';
import PhotoPNG from '../../../../assets/icon-photo.png';
import { API_HOST } from '../../../../constants';
import { useAppDispatch } from '../../../../hooks/redux';
import { uploadFile } from '../../../../store/thunks/account-thunks';
import { Account } from '../../../../types';

import './user-avatar.scss';

type Props = {
  account: Account;
};

export const UserAvatar: FC<Props> = ({ account }) => {
  const { lastName, firstName, avatar } = account;

  const dispatch = useAppDispatch();

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = new FormData();

    files.append('files', e.target.files[0]);
    dispatch(uploadFile({ userId: account.id as string, files }));
  };

  return (
    <div className='user-avatar' data-test-id='profile-avatar'>
      <div className='file-input'>
        <img src={avatar ? `${API_HOST}${avatar}` : AvatarPNG} alt='avatar' />
        <input className='file' type='file' accept='image/*' onChange={onImageChange} />
        <div className='intersect'>
          <img className='photo' src={PhotoPNG} alt='avatar' />
        </div>
      </div>
      <h1>
        <span>{lastName}</span> <span>{firstName}</span>
      </h1>
    </div>
  );
};
