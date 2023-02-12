import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import './main-layout.scss';

export const MainLayout: FC = () => (
  <div className='main-layout'>
    <Header />
    <main className='main'>
      <Outlet />
    </main>
    <Footer />
  </div>
);
