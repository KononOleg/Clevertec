import { FC } from 'react';

import FacebookPNG from '../../assets/icon-facebook.png';
import InstagramPNG from '../../assets/icon-instagram.png';
import LinkedinPNG from '../../assets/icon-linkedin.png';
import VKPNG from '../../assets/icon-vk.png';

import './footer.scss';

export const Footer: FC = () => (
  <footer className='footer'>
    <div className='left'>
      <p className='body_large'>© 2020-2023 Cleverland.</p>
      <p className='body_large'>Все права защищены.</p>
    </div>
    <ul>
      <li>
        <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
          <img src={FacebookPNG} alt='facebook' />
        </a>
      </li>
      <li>
        <a href='https://www.instagram.com' target='_blank' rel='noreferrer'>
          <img src={InstagramPNG} alt='instagram' />
        </a>
      </li>
      <li>
        <a href='https://vk.com' target='_blank' rel='noreferrer'>
          <img src={VKPNG} alt='vk' />
        </a>
      </li>
      <li>
        <a href='https://www.linkedin.com' target='_blank' rel='noreferrer'>
          <img src={LinkedinPNG} alt='linkedin' />
        </a>
      </li>
    </ul>
  </footer>
);
