import { Link } from 'react-router-dom';
import { Addresses } from '../../const';
import { Layout } from '../../components/layout/layout.tsx';
import '../404/404.css';

export const NotFound = () => (
  <Layout>
    <div className="page page--gray page--not-found">
      <h1 className='not-found-title'>404</h1>
      <h2>Page Not Found</h2>
      <Link to={Addresses.Main} className='locations__item-link'>To Main</Link>
    </div>
  </Layout>

);
