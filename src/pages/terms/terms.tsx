import { FC, Fragment } from 'react';

import { Navigation } from '../../components/navigation';
import { TermsContentView } from '../../types';

import { Contract } from './components/contract';
import { Terms } from './components/terms';

import './terms.scss';

interface IProps {
  contentView: TermsContentView;
}

export const TermsPage: FC<IProps> = ({ contentView }) => (
  <Fragment>
    <Navigation />
    <section className='terms'>
      {contentView === TermsContentView.Terms && <Terms />}
      {contentView === TermsContentView.Contract && <Contract />}
    </section>
  </Fragment>
);
