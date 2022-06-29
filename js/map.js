import { pageToActive } from './form.js';
import { DATA_OUTPUT, types } from './data.js';
console.log(DATA_OUTPUT);
function getTokyoCenterCoordinate() {
  return {
    lat: 35.6550,
    lng: 139.75,
  };
}

function mapDraw() {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageToActive();
    })
    .setView(getTokyoCenterCoordinate(), 10);
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
  const anotherMackerIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [26, 40],
  });
  const mainMarker = L.marker(
    getTokyoCenterCoordinate(),
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  const anotherMarker = L.marker(
    getTokyoCenterCoordinate(),
    {
      icon: anotherMackerIcon,
    }
);
  mainMarker.addTo(map);
  anotherMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    const addressField = document.querySelector('#address');
    addressField.value=`${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });
}

export { mapDraw };
