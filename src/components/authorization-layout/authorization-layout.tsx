import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './authorization-layout.scss';

export const AuthorizationLayout: FC = () => (
  <div className='authorization-layout'>
    <h3 className='title'>Cleverland</h3>
    <Outlet />
  </div>
);
