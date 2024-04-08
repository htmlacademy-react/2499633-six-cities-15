import MainPage from '../pages/main/main';
import { Addresses } from '../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { Favorites } from '../pages/favorites/favorites';
import { Offer } from '../pages/offer/offer';
import { NotFound } from '../pages/404/404';
import { PrivateRoute } from '../components/private-route/private-route';
import { MainContent } from '../pages/main/main-content';
import { AuthStatus } from '../types';
import { useSelector } from 'react-redux';
import { getAuthStatus } from '../store/selector';

export const App = () => {
  const authStatus: AuthStatus = useSelector(getAuthStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Addresses.Main} element={<MainPage/>}>
          <Route path=':city' element={<MainContent/>}></Route>
        </Route>
        <Route path={Addresses.Login} element={<Login/>} />
        <Route path={Addresses.Favorites} element={<PrivateRoute authStatus={authStatus}><Favorites/></PrivateRoute>} />
        <Route path={Addresses.Offer} element={<Offer/>} />
        <Route path={'*'} element={<NotFound/>} />
      </Routes>
    </BrowserRouter>

  );
};
