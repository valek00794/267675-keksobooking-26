import { pageToActive } from './form.js';
import { DATA_OUTPUT } from './data.js';
import {card} from './create-card.js';
const TOKYO_CENTER_COOTDINATE = {
  lat: 35.6550,
  lng: 139.75,
};
function mapDraw() {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageToActive();
    })
    .setView(TOKYO_CENTER_COOTDINATE, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  const mainMarkerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const anotherMarkerIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
  const mainMarker = L.marker(
    TOKYO_CENTER_COOTDINATE,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  const markerGroup = L.layerGroup().addTo(map);
  const createMarker = (point) => {
    const anotherMarker = L.marker(
      {
        lat: point.location.iat,
        lng: point.location.ing,
      },
      {
        icon: anotherMarkerIcon,
      },
    );
    anotherMarker
      .addTo(markerGroup)
      .bindPopup(card(point));
    return anotherMarker;
  };
  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    const addressField = document.querySelector('#address');
    addressField.value=`${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });
  DATA_OUTPUT.forEach((point) => {
    createMarker(point);
  });
}

export { mapDraw };
