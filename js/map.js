import { pageToActive, disablefiltersForm} from './form.js';
import { getOfferData } from './api.js';
import { getCard } from './create-card.js';
import { showLoadAlert } from './utils.js';
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
const FILLTER_SELECTED_DEFAULT = 'any';
const FILTER_PRICE_VALUES = ['low', 'middle', 'high'];
const FILLTER_PRICE_RANGE = {
  min: 10000,
  max: 50000,
};
const FILTER_ROOMS_VALUES = [1, 2, 3];

function mapDraw() {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageToActive();
    })
    .setView(TOKYO_CENTER_COORDINATES,  MAP_ZOOM);

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
    document.querySelector('#address').value=`${TOKYO_CENTER_COORDINATES.lat.toFixed(5)},${TOKYO_CENTER_COORDINATES.lng.toFixed(5)}`,
  ).addTo(map);

  const addressField = document.querySelector('#address');
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressField.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });

  

  function compareOfferType (item) {
    const fillterTypeField = document.querySelector('#housing-type');
    if (fillterTypeField.value === FILLTER_SELECTED_DEFAULT) {
      return true
    }
      return item.offer.type === fillterTypeField.value;  
    
    } 

  function compareOfferPrice (item) {
    const fillterPriceField = document.querySelector('#housing-price');
    if (fillterPriceField.value === FILLTER_SELECTED_DEFAULT) {
      return true
    }
    if (fillterPriceField.value === FILTER_PRICE_VALUES[0] && item.offer.price <= FILLTER_PRICE_RANGE.min) {
      return true
    }
    if (fillterPriceField.value === FILTER_PRICE_VALUES[1] && (item.offer.price >= FILLTER_PRICE_RANGE.min && item.offer.price <= FILLTER_PRICE_RANGE.max)){
    return true    
    }
    if (fillterPriceField.value === FILTER_PRICE_VALUES[2] && item.offer.price >= FILLTER_PRICE_RANGE.max){
    return true   
    } 
    }

    function compareOfferRooms (item) {
      const fillterRoomsField = document.querySelector('#housing-rooms');
      if (fillterRoomsField.value === FILLTER_SELECTED_DEFAULT) {
        return true
      } 
      if (Number(fillterRoomsField.value) === item.offer.rooms)
        return true
        
      } 
      function compareOfferGuests (item) {
        const fillterGuestsField = document.querySelector('#housing-guests');
        if (fillterGuestsField.value === FILLTER_SELECTED_DEFAULT) {
          return true
        } 
        if (Number(fillterGuestsField.value) === item.offer.guests) {
          return true
        }
        } 
        function compareFetures (item, field) {
          const offerFutures = item.offer.features;
          if (!field.checked) {
            return true
          } else {
            if (offerFutures && offerFutures.some((feature) => feature === field.value)) {
              return true
            }
        }
      }
      function compareOfferIncludeWiFi (item) {
        const fillterWiFiCheck = document.querySelector('#filter-wifi');
        if (compareFetures (item, fillterWiFiCheck)) {
          return true
        }
          }
          function compareOfferIncludeDishwasher (item) {
            const fillterDishwasherCheck = document.querySelector('#filter-dishwasher');
            if (compareFetures (item, fillterDishwasherCheck)) {
              return true
            }
              }
              function compareOfferIncludeParking (item) {
                const fillterParkingCheck = document.querySelector('#filter-parking');
                if (compareFetures (item, fillterParkingCheck)) {
                  return true
                }
                  }
                  function compareOfferIncludeWasher (item) {
                    const fillterWasherCheck = document.querySelector('#filter-washer');
                    if (compareFetures (item, fillterWasherCheck)) {
                      return true
                    }
                      }
                      function compareOfferIncludeElevator (item) {
                        const fillterElevatorCheck = document.querySelector('#filter-elevator');
                        if (compareFetures (item, fillterElevatorCheck)) {
                          return true
                        }
                          }
                          function compareOfferIncludeConditioner (item) {
                            const fillterConditionerCheck = document.querySelector('#filter-conditioner');
                            if (compareFetures (item, fillterConditionerCheck)) {
                              return true
                            }
                              }
              
          

    const markerGroup = L.layerGroup().addTo(map);
  function createMarker (offers) {
    markerGroup.clearLayers();
    offers
    .slice()
    .filter(compareOfferType)
    .slice()
    .filter(compareOfferPrice)
    .slice()
    .filter(compareOfferRooms)
    .slice()
    .filter(compareOfferGuests)
    .slice()
    .filter(compareOfferIncludeWiFi)
    .slice()
    .filter(compareOfferIncludeDishwasher)
    .slice()
    .filter(compareOfferIncludeParking)
    .slice()
    .filter(compareOfferIncludeWasher)
    .slice()
    .filter(compareOfferIncludeElevator)
    .slice()
    .filter(compareOfferIncludeConditioner)
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
  function resetMap () {
    map
      .setView(TOKYO_CENTER_COORDINATES, MAP_ZOOM)
      .closePopup();
    mainMarker
      .setLatLng(TOKYO_CENTER_COORDINATES);
    document.querySelector('#address').value=`${TOKYO_CENTER_COORDINATES.lat.toFixed(5)},${TOKYO_CENTER_COORDINATES.lng.toFixed(5)}`;
    createMarker(getOfferData());
    
  }
  return { mapDraw, resetMap, createMarker,compareOfOfferType: compareOfferType };
}

export { mapDraw };
