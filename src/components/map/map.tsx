import {useRef, useEffect} from 'react';
import {Icon, Marker, latLng, layerGroup} from 'leaflet';
import useMap from './useMap';
import { Points, Point, CityData } from '../../types';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: CityData;
  points: Points | null;
  selectedPoint: Point | undefined;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT || undefined,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT || undefined,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.setView(latLng(city.location.latitude, city.location.longitude), city.location.zoom);
    const markerLayer = layerGroup().addTo(map);

    const addMarker = (point: Point) => {
      const marker = new Marker({
        lat: point.latitude,
        lng: point.longitude
      });

      marker.setIcon(
        selectedPoint !== undefined && point.id === selectedPoint.id
          ? currentCustomIcon
          : defaultCustomIcon
      ).addTo(markerLayer);
    };

    points?.forEach(addMarker);

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, points, selectedPoint, city]);

  return <div className={props.className} id='map' ref={mapRef}></div>;
}

export default Map;
