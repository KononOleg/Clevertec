import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorMessage } from '../error-message';
import { Footer } from '../footer';
import { Header } from '../header';

import './main-layout.scss';

export const MainLayout: FC = () => (
  <div className='main-layout'>
    <div className='main-layout__wrapper'>
      <ErrorMessage />
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);
