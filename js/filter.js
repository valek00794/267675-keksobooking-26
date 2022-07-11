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
  if (Number(fillterRoomsField.value) === item.offer.rooms) {
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

function compareOfferFeatures(item) {
  const fillterFeaturesCheckbox = document.querySelectorAll('#housing-features input');
  const checkedFilterFeatures = [];
  const itemFeatures = item.offer.features;
  fillterFeaturesCheckbox.forEach((feature) => {
    if (feature.checked) {
      checkedFilterFeatures.push(feature.value);
    }
  });
  if (!checkedFilterFeatures) {
    return true;
  }
  if (checkedFilterFeatures && itemFeatures) {
    return checkedFilterFeatures.every((feature) => itemFeatures.includes(feature));
  }
}

export {
  compareOfferType,
  compareOfferPrice,
  compareOfferRooms,
  compareOfferGuests,
  compareOfferFeatures,
};
