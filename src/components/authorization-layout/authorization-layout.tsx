import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './authorization-layout.scss';

export const AuthorizationLayout: FC = () => (
  <div className='authorization-layout'>
    <Outlet />
  </div>
);
