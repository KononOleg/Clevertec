import { FC, Fragment } from 'react';

import { AuthorizationContentView } from '../../types';

import { Authorization } from './components/authorization';
import { ForgotPassword } from './components/forgot-password';
import { Registration } from './components/registration';

import './authorization.scss';

interface IProps {
  contentView: AuthorizationContentView;
}

export const AuthorizationPage: FC<IProps> = ({ contentView }) => (
  <Fragment>
    {contentView === AuthorizationContentView.Auth && <Authorization />}
    {contentView === AuthorizationContentView.Registration && <Registration />}
    {contentView === AuthorizationContentView.ForgotPass && <ForgotPassword />}
  </Fragment>
);
