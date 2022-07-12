const FILLTER_SELECTED_DEFAULT = 'any';
const FILTER_PRICE_VALUES = ['low', 'middle', 'high'];
const FILLTER_PRICE_RANGE = {
  min: 10000,
  max: 50000,
};
//Сравнение типа жилья и значения фильтра
function compareOfferType(item) {
  const fillterTypeField = document.querySelector('#housing-type');
  return fillterTypeField.value === FILLTER_SELECTED_DEFAULT || fillterTypeField.value === item.offer.type;
}
//Сравнение цены жилья и значения фильтра
function compareOfferPrice(item) {
  const fillterPriceField = document.querySelector('#housing-price');
  return (fillterPriceField.value === FILLTER_SELECTED_DEFAULT)
  || (fillterPriceField.value === FILTER_PRICE_VALUES[0] && item.offer.price <= FILLTER_PRICE_RANGE.min)
  || (fillterPriceField.value === FILTER_PRICE_VALUES[1] && (item.offer.price >= FILLTER_PRICE_RANGE.min && item.offer.price <= FILLTER_PRICE_RANGE.max))
  || (fillterPriceField.value === FILTER_PRICE_VALUES[2] && item.offer.price >= FILLTER_PRICE_RANGE.max);
}
//Сравнение количества комнат и значения фильтра
function compareOfferRooms(item) {
  const fillterRoomsField = document.querySelector('#housing-rooms');
  return fillterRoomsField.value === FILLTER_SELECTED_DEFAULT || Number(fillterRoomsField.value) === item.offer.rooms;
}
//Сравнение количества гостей и значения фильтра
function compareOfferGuests(item) {
  const fillterGuestsField = document.querySelector('#housing-guests');
  return fillterGuestsField.value === FILLTER_SELECTED_DEFAULT || Number(fillterGuestsField.value) === item.offer.guests;
}
//Сравнение наличия особеннойстей со значениями фильтра
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
