import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import AvatarPNG from '../../../../assets/avatar.png';
import { API_HOST, PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { signOut } from '../../../../store/reducers/auth-slice';
import { accountSelector } from '../../../../store/selectors/account-selector';

import './person.scss';

export const Person: FC = () => {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector(accountSelector);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  const signOutHandler = () => dispatch(signOut());

  return (
    <div className='person'>
      <p className='subtitle_small'>Привет, {account?.firstName}!</p>
      <button type='button' onClick={() => setIsActiveModal(!isActiveModal)}>
        <img className='image' src={account?.avatar ? `${API_HOST}${account.avatar}` : AvatarPNG} alt='avatar' />
      </button>

      {isActiveModal && (
        <div className='person__modal'>
          <Link to={PATH.profile}>
            <h5>Профиль</h5>
          </Link>

          <button type='button' onClick={signOutHandler} data-test-id='exit-button'>
            <h5>Выход</h5>
          </button>
        </div>
      )}
    </div>
  );
};
