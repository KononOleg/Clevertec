import { FC, Fragment } from 'react';

import { AuthorizationContentView } from '../../types';

import './authorization.scss';

interface IProps {
  contentView: AuthorizationContentView;
}

export const AuthorizationPage: FC<IProps> = ({ contentView }) => (
  <Fragment>
    {contentView === AuthorizationContentView.Auth && <div />}
    {contentView === AuthorizationContentView.Registration && <div />}
    {contentView === AuthorizationContentView.ForgotPass && <div />}
  </Fragment>
);
