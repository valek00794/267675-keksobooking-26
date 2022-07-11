import { pageToActive } from './form.js';
import { getOfferData } from './api.js';
import { getCard } from './create-card.js';
import {
  compareOfferPrice,
  compareOfferType,
  compareOfferRooms,
  compareOfferGuests,
  compareOfferFeatures,
}
  from './filter.js';

const TOKYO_CENTER_COORDINATES = {
  lat: 35.6550,
  lng: 139.75,
};
const MAP_ZOOM = 10;
const MAIN_MARKER_SETTINGS = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const ANOTHER_MARKER_SETTINGS = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const COUNT_VIEW_OBJECTS = 10;

function mapDraw() {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageToActive();
    })
    .setView(TOKYO_CENTER_COORDINATES, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarkerIcon = L.icon({
    iconUrl: MAIN_MARKER_SETTINGS.iconUrl,
    iconSize: MAIN_MARKER_SETTINGS.iconSize,
    iconAnchor: MAIN_MARKER_SETTINGS.iconAnchor,
  });

  const anotherMarkerIcon = L.icon({
    iconUrl: ANOTHER_MARKER_SETTINGS.iconUrl,
    iconSize: ANOTHER_MARKER_SETTINGS.iconSize,
    iconAnchor: ANOTHER_MARKER_SETTINGS.iconAnchor,
  });

  const mainMarker = L.marker(
    TOKYO_CENTER_COORDINATES,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
    document.querySelector('#address').value = `${TOKYO_CENTER_COORDINATES.lat.toFixed(5)},${TOKYO_CENTER_COORDINATES.lng.toFixed(5)}`,
  ).addTo(map);

  const addressField = document.querySelector('#address');
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressField.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });

  const markerGroup = L.layerGroup().addTo(map);
  function createMarker(offers) {
    markerGroup.clearLayers();
    offers
      .slice()
      .filter(compareOfferType)
      .filter(compareOfferPrice)
      .filter(compareOfferRooms)
      .filter(compareOfferGuests)
      .filter(compareOfferFeatures)
      .slice(0, COUNT_VIEW_OBJECTS)
      .forEach((point) => {
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
      });
  }

  //Сброс карты в дефолтное состояние
  function resetMap() {
    map
      .setView(TOKYO_CENTER_COORDINATES, MAP_ZOOM)
      .closePopup();
    mainMarker
      .setLatLng(TOKYO_CENTER_COORDINATES);
    document.querySelector('#address').value = `${TOKYO_CENTER_COORDINATES.lat.toFixed(5)},${TOKYO_CENTER_COORDINATES.lng.toFixed(5)}`;
    createMarker(getOfferData());

  }
  return { mapDraw, resetMap, createMarker, compareOfOfferType: compareOfferType };
}

export { mapDraw };
