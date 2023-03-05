import { FC, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AuthorizationContentView } from '../../types';

import { Authorization } from './components/authorization';
import { ForgotPassword } from './components/forgot-password';
import { RecoveryPassword } from './components/recovery-password';
import { Registration } from './components/registration';

import './authorization.scss';

interface IProps {
  contentView: AuthorizationContentView;
}

export const AuthorizationPage: FC<IProps> = ({ contentView }) => {
  const [searchParams] = useSearchParams();

  const codeQuery = searchParams.get('code') || '';

  return (
    <Fragment>
      {contentView === AuthorizationContentView.Auth && <Authorization />}
      {contentView === AuthorizationContentView.Registration && <Registration />}
      {contentView === AuthorizationContentView.ForgotPass && !codeQuery && <ForgotPassword />}
      {contentView === AuthorizationContentView.ForgotPass && codeQuery && <RecoveryPassword code={codeQuery} />}
    </Fragment>
  );
};
