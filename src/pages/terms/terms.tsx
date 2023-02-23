import { FC } from 'react';

import { TermsContentView } from '../../types';

import { Contract } from './components/contract';
import { Terms } from './components/terms';

import './terms.scss';

interface IProps {
  contentView: TermsContentView;
}

export const TermsPage: FC<IProps> = ({ contentView }) => (
  <section className='terms'>
    {contentView === TermsContentView.Terms && <Terms />}
    {contentView === TermsContentView.Contract && <Contract />}
  </section>
);
