import { FC, Fragment } from 'react';

import { AuthorizationContentView } from '../../types';

import { Authorization } from './components/authorization';

import './authorization.scss';

interface IProps {
  contentView: AuthorizationContentView;
}

export const AuthorizationPage: FC<IProps> = ({ contentView }) => (
  <Fragment>
    {contentView === AuthorizationContentView.Auth && <Authorization />}
    {contentView === AuthorizationContentView.Registration && <div />}
    {contentView === AuthorizationContentView.ForgotPass && <div />}
  </Fragment>
);
