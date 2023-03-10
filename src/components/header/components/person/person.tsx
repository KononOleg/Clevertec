import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import AvatarPNG from '../../../../assets/avatar.png';
import { PATH } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { signOut } from '../../../../store/reducers/auth-slice';

import './person.scss';

export const Person: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  const resetSliceHandler = () => dispatch(signOut());

  return (
    <div className='person'>
      <p className='subtitle_small'>Привет, {user?.firstName}!</p>
      <button type='button' onClick={() => setIsActiveModal(!isActiveModal)}>
        <img className='image' src={AvatarPNG} alt='avatar' />
      </button>

      {isActiveModal && (
        <div className='modal'>
          <Link to={PATH.profile}>
            <h5>Профиль</h5>
          </Link>

          <button type='button' onClick={resetSliceHandler} data-test-id='exit-button'>
            <h5>Выход</h5>
          </button>
        </div>
      )}
    </div>
  );
};
