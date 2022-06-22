import { disOrEnableFormElements } from './utils.js';
const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const divSlider = document.querySelector('.ad-form__slider');
const roomField = adForm.querySelector('#room_number');
const guestsField = adForm.querySelector('#capacity');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const timeInField = adForm.querySelector('#timein');
const timeОutField = adForm.querySelector('#timeout');
const titleField = adForm.querySelector('#title');
function pageToNotActive() {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  divSlider.style.opacity = '0.4';
  divSlider.style.pointerEvents = 'none';
  disOrEnableFormElements(adForm, true);
  disOrEnableFormElements(mapForm, true);
}
function pageToActive() {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  divSlider.removeAttribute('style');
  disOrEnableFormElements(adForm, false);
  disOrEnableFormElements(mapForm, false);
}
const TITLE_LENGTH_RANGE = {
  min: 30,
  max: 100,
};
const maxPriceForNight = 100000;
const minPricePerType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});
function validateTitle (value) {
  return value.length >= TITLE_LENGTH_RANGE.min && value.length <= TITLE_LENGTH_RANGE.max;
}
pristine.addValidator();
pristine.addValidator(
  titleField,
  validateTitle,
  `от ${TITLE_LENGTH_RANGE.min} до ${TITLE_LENGTH_RANGE.max} символов`
);
let minPriceForNight = minPricePerType[typeField.value];
typeField.addEventListener('change', () => {
  for (let key in minPricePerType) {
    if (typeField.value === key) {
      minPriceForNight = minPricePerType[key];
    }
  }
  pristine.validate();
});
function validatePrice (value) {
  return  value <= maxPriceForNight && value >=minPriceForNight;
}
function validatePriceMessage () {
  return  `Мин. цена ${minPriceForNight} руб. и не более ${maxPriceForNight} руб.`;
}
pristine.addValidator(
  priceField,
  validatePrice,
  validatePriceMessage,
);
function validateRoomsGuests () {
  return (guestsField.value === '0' && roomField.value === '100') ||
  (guestsField.value <= roomField.value && roomField.value !== '100' && guestsField.value !== '0');
}
pristine.addValidator(
  guestsField,
  validateRoomsGuests,
  'Гостям тесно'
);
roomField.addEventListener('change', () => {
  pristine.validate();
});
timeInField.addEventListener('change', () => {
  timeОutField.value =timeInField.value;
  pristine.validate();
});
timeОutField.addEventListener('change', () => {
  timeInField.value =timeОutField.value;
  pristine.validate();
});
function validateChekinOut () {
  return  timeInField.value === timeОutField.value;
}
pristine.addValidator(
  timeОutField,
  validateChekinOut,
  'Время заезда и выезда должно быть одинаково'
);
adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
export { pageToNotActive, pageToActive };
