const FILLTER_SELECTED_DEFAULT = 'any';
const FILTER_PRICE_VALUES = ['low', 'middle', 'high'];
const FILLTER_PRICE_RANGE = {
  min: 10000,
  max: 50000,
};

function compareOfferType(item) {
    const fillterTypeField = document.querySelector('#housing-type');
    if (fillterTypeField.value === FILLTER_SELECTED_DEFAULT) {
      return true;
    }
    return item.offer.type === fillterTypeField.value;

  }

  function compareOfferPrice(item) {
    const fillterPriceField = document.querySelector('#housing-price');
    if (fillterPriceField.value === FILLTER_SELECTED_DEFAULT) {
      return true;
    }
    if (fillterPriceField.value === FILTER_PRICE_VALUES[0] && item.offer.price <= FILLTER_PRICE_RANGE.min) {
      return true;
    }
    if (fillterPriceField.value === FILTER_PRICE_VALUES[1] && (item.offer.price >= FILLTER_PRICE_RANGE.min && item.offer.price <= FILLTER_PRICE_RANGE.max)) {
      return true;
    }
    if (fillterPriceField.value === FILTER_PRICE_VALUES[2] && item.offer.price >= FILLTER_PRICE_RANGE.max) {
      return true;
    }
  }

  function compareOfferRooms(item) {
    const fillterRoomsField = document.querySelector('#housing-rooms');
    if (fillterRoomsField.value === FILLTER_SELECTED_DEFAULT) {
      return true;
    }
    if (Number(fillterRoomsField.value) === item.offer.rooms){
      return true;
    }
  }
  function compareOfferGuests(item) {
    const fillterGuestsField = document.querySelector('#housing-guests');
    if (fillterGuestsField.value === FILLTER_SELECTED_DEFAULT) {
      return true;
    }
    if (Number(fillterGuestsField.value) === item.offer.guests) {
      return true;
    }
  }
  function compareFetures(item, field) {
    const offerFutures = item.offer.features;
    if (!field.checked) {
      return true;
    } else {
      if (offerFutures && offerFutures.some((feature) => feature === field.value)) {
        return true;
      }
    }
  }
  function compareOfferIncludeWiFi(item) {
    const fillterWiFiCheck = document.querySelector('#filter-wifi');
    if (compareFetures(item, fillterWiFiCheck)) {
      return true;
    }
  }
  function compareOfferIncludeDishwasher(item) {
    const fillterDishwasherCheck = document.querySelector('#filter-dishwasher');
    if (compareFetures(item, fillterDishwasherCheck)) {
      return true;
    }
  }
  function compareOfferIncludeParking(item) {
    const fillterParkingCheck = document.querySelector('#filter-parking');
    if (compareFetures(item, fillterParkingCheck)) {
      return true;
    }
  }
  function compareOfferIncludeWasher(item) {
    const fillterWasherCheck = document.querySelector('#filter-washer');
    if (compareFetures(item, fillterWasherCheck)) {
      return true;
    }
  }
  function compareOfferIncludeElevator(item) {
    const fillterElevatorCheck = document.querySelector('#filter-elevator');
    if (compareFetures(item, fillterElevatorCheck)) {
      return true;
    }
  }
  function compareOfferIncludeConditioner(item) {
    const fillterConditionerCheck = document.querySelector('#filter-conditioner');
    if (compareFetures(item, fillterConditionerCheck)) {
      return true;
    }
  }
  function compareFeatures(item) {
    const fillterFeaturesCheckbox= document.querySelector('#housing-features input');
    
    }
  
  
  export {
    compareOfferType,
    compareOfferPrice,
    compareOfferRooms,
    compareOfferGuests,
    compareOfferIncludeWiFi,
    compareOfferIncludeDishwasher,
    compareOfferIncludeParking,
    compareOfferIncludeWasher,
    compareOfferIncludeElevator,
    compareOfferIncludeConditioner,
  }