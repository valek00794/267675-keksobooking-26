import { disOrEnableFormElements } from './utils.js';
const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const divSlider = document.querySelector('.ad-form__slider');
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
const minPricePerType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
const maxPriceForNight = 100000;
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});
const titleField = adForm.querySelector('#title');
const priceField = adForm.querySelector('#price');
function validateTitle (value) {
  return value.length >= TITLE_LENGTH_RANGE.min && value.length <= TITLE_LENGTH_RANGE.max;
}
pristine.addValidator();
pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  `от ${TITLE_LENGTH_RANGE.min} до ${TITLE_LENGTH_RANGE.max} символов`
);

const typeField = adForm.querySelector('#type');
//let priceMinValue = minPricePerType[typeField.value];
let priceMinValue = Number(priceField.placeholder);
console.log(priceMinValue);
typeField.addEventListener('change', () => {
  if (typeField.value === 'bungalow') {
    priceMinValue = 0;
    priceField.placeholder=priceMinValue;
  }
  if (typeField.value === 'flat') {
    priceMinValue = 1000;
    priceField.placeholder=priceMinValue;
  }
  if (typeField.value === 'hotel') {
    priceMinValue = 3000;
    priceField.placeholder=priceMinValue;
  }
  if (typeField.value === 'house') {
    priceMinValue = 5000;
    priceField.placeholder=priceMinValue;
  }
  if (typeField.value === 'palace') {
    priceMinValue = 10000;
    priceField.placeholder=priceMinValue;
  }
  pristine.validate();
});
function validatePrice (value) {
  //  const priceFieldSelected = form.querySelector('[name="type"]:selected');
  // return  value <= 100000 && value >=minPricePerType.priceFieldSelected.value;
  return  value <= maxPriceForNight && value >=priceMinValue;
}
pristine.addValidator(
  priceField,
  validatePrice,
  `Мин. цена ${priceMinValue} руб. и не более ${maxPriceForNight} руб.`
);

function validateRoomsGuests () {
  const roomFields = adForm.querySelector('#room_number');
  const guestsFields = adForm.querySelector('#capacity');
  return (guestsFields.value === '0' && roomFields.value === '100') ||
  (guestsFields.value <= roomFields.value && roomFields.value !== '100' && guestsFields.value !== '0');
}
pristine.addValidator(
  adForm.querySelector('#capacity'),
  validateRoomsGuests,
  'Гостям тесно'
);
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');
timeinField.addEventListener('change', () => {
  timeoutField.value =timeinField.value;
  pristine.validate();
});
timeoutField.addEventListener('change', () => {
  timeinField.value =timeoutField.value;
  pristine.validate();
});

function validateChekinOut () {
  return  timeinField.value === timeoutField.value;
}
pristine.addValidator(
  timeoutField,
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
