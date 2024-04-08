import { NavLink, Navigate, Outlet, useParams } from 'react-router-dom';
import { Layout } from '../../components/layout/layout.tsx';
import { CITIES } from '../../const';

export const MainPage = () => {
  const params = useParams();
  const cities = CITIES;
  return(
    <Layout>
      <>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li className="locations__item" key={city.name}>
                  <NavLink
                    className={({ isActive }) => `locations__item-link tabs__item ${isActive && 'tabs__item--active'}`}
                    to={`/${city.name}`}

                  >
                    <span>{city.name}</span>
                  </NavLink>
                </li >
              ))}
            </ul>
          </section>
        </div>
        {!params.city && <Navigate to={`/${cities[0].name}`} />}
        <Outlet />
      </>
    </Layout>
  );
};

export default MainPage;
