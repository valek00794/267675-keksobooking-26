import { pageToActive } from './form.js';
import { getData } from './api.js';
import { onError } from './utils.js';
import { getCard } from './create-card.js';
import { disOrEnableFormElements } from './utils.js';
const COUNT_VIEW_OBJECTS = 10;
const TOKYO_CENTER_COOTDINATE = {
  lat: 35.6550,
  lng: 139.75,
};
const ZOOM_MAP = 10;
const MAIN_MARKER_OPTION = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const ANOTHER_MARKER_OPTION = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

function mapDraw() {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageToActive();
    })
    .setView(TOKYO_CENTER_COOTDINATE, ZOOM_MAP);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  const mainMarkerIcon = L.icon({
    iconUrl: MAIN_MARKER_OPTION.iconUrl,
    iconSize: MAIN_MARKER_OPTION.iconSize,
    iconAnchor: MAIN_MARKER_OPTION.iconAnchor,
  });
  const anotherMarkerIcon = L.icon({
    iconUrl: ANOTHER_MARKER_OPTION.iconUrl,
    iconSize: ANOTHER_MARKER_OPTION.iconSize,
    iconAnchor: ANOTHER_MARKER_OPTION.iconAnchor,
  });
  const mainMarker = L.marker(
    TOKYO_CENTER_COOTDINATE,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
    document.querySelector('#address').value=`${TOKYO_CENTER_COOTDINATE.lat.toFixed(5)},${TOKYO_CENTER_COOTDINATE.lng.toFixed(5)}`,
  );
  const markerGroup = L.layerGroup().addTo(map);
  const createMarker = (point) => {
    const anotherMarker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: anotherMarkerIcon,
      },
    );
    anotherMarker
      .addTo(markerGroup)
      .bindPopup(getCard(point));
    return anotherMarker;
  };
  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    const addressField = document.querySelector('#address');
    addressField.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });
  
  const mapForm = document.querySelector('.map__filters');
  getData(
    (data) => data.slice(0, COUNT_VIEW_OBJECTS).forEach(point => createMarker(point)),
    (message) => {
      disOrEnableFormElements(mapForm, true);
      onError(message)
    }
    );
}

export { mapDraw };
