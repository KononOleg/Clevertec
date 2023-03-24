import { ChangeEvent, FC } from 'react';

import AvatarPNG from '../../../../assets/avatar.png';
import PhotoPNG from '../../../../assets/icon-photo.png';
import { API_HOST } from '../../../../constants';
import { useAppDispatch } from '../../../../hooks/redux';
import { uploadFile } from '../../../../store/thunks/account-thunks';
import { IAccount } from '../../../../types';

import './user-avatar.scss';

interface IProps {
  account: IAccount;
}

export const UserAvatar: FC<IProps> = ({ account }) => {
  const { lastName, firstName, avatar } = account;

  const dispatch = useAppDispatch();

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = new FormData();

    files.append('files', e.target.files[0]);
    dispatch(uploadFile({ userId: account.id as string, files }));
  };

  return (
    <div className='user-avatar'>
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
