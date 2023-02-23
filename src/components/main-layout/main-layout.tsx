import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../navigation';

import './main-layout.scss';

export const MainLayout: FC = () => (
  <Fragment>
    <div className='navigation-showcase'>
      <Navigation navigation='navigation' />
    </div>
    <Outlet />
  </Fragment>
);
