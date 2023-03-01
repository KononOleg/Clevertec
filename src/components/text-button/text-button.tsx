import { FC } from 'react';

import { ReactComponent as ArmSVG } from '../../assets/icon-arm.svg';

import './text-button.scss';

interface IProps {
  text: string;
}

export const TextButton: FC<IProps> = ({ text }) => (
  <button className='text-button' type='button'>
    {text}
    <ArmSVG />
  </button>
);
