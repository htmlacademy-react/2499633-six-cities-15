import { Helmet } from 'react-helmet-async';

export const HelmetProvider = () => (
  <Helmet>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" crossOrigin="" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" crossOrigin=""></script>
    </head>
  </Helmet>
);
