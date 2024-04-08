import { Navigate } from 'react-router-dom';
import { Addresses } from '../../const';
import { AuthStatus } from '../../types';
import { Spinner } from '../../pages/main/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
  authStatus: AuthStatus;
};

export const PrivateRoute = ({ children, authStatus }: PrivateRouteProps) => {
  if (authStatus === 'AUTH') {
    return children;
  }
  return authStatus === 'UNKNOWN' ? <Spinner/> : <Navigate to={Addresses.Login} />;
};

