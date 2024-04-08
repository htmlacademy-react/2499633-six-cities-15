import { ChangeEvent, FormEvent, useState } from 'react';
import { Layout } from '../../components/layout/layout.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStatus, Dispatch, State } from '../../types.tsx';
import { tryAuth } from '../../store/action.ts';
import { Link, Navigate } from 'react-router-dom';
import { Addresses, CITIES } from '../../const.ts';
import { getAuthStatus } from '../../store/selector.ts';
import { Spinner } from '../main/spinner';


export const Login = () => {
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
  const dispatch: Dispatch = useDispatch();
  const authStatus: AuthStatus = useSelector(getAuthStatus);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const loginIsSending = useSelector((state: State) => state.isSending.login);
  const loginError = useSelector((state: State) => state.isFailed.login);
  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };
  const isValidLoginData = (password: string) => {
    const passwordRegExp = new RegExp('^(?=.*[a-zA-Z])(?=.*\\d).{2,}$');
    return passwordRegExp.test(password);
  };
  const handleSignIn = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(tryAuth(formData));
  };

  return (
    <Layout>
      <>
        {authStatus === 'AUTH' && <Navigate to={Addresses.Main} />}
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSignIn}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleFieldChange}
                  value={formData.email}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleFieldChange}
                  value={formData.password}
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={!isValidLoginData(formData.password)}>
                Sign in
              </button>
            </form>
            {loginError || loginIsSending && <Spinner />}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/${randomCity.name}`}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </>
    </Layout>
  );
};
