import { pageToActive } from './form.js';
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
  const mainMackerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [40, 40],
    iconAnchor: [26, 52],
  });
  const mainMarker = L.marker(
    getTokyoCenterCoordinate(),
    {
      draggable: true,
      icon: mainMackerIcon,
    },
  );
  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const addressString = evt.target.getLatLng();
    console.log(addressString);
    console.log(`${addressString.lat.toFixed(5)},${addressString.lng.toFixed(5)}`);

  });
}

export { mapDraw };
