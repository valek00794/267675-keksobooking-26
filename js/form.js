import { disOrEnableFormElements } from './utils.js';
function pageToNotActive() {
  const adForm = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');
  const divSlider = document.querySelector('.ad-form__slider');
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  divSlider.style.opacity = '0.4';
  divSlider.style.pointerEvents = 'none';
  disOrEnableFormElements(adForm, true);
  disOrEnableFormElements(mapForm, true);

}
function pageToActive() {
  const adForm = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');
  const divSlider = document.querySelector('.ad-form__slider');
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
const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});
function validateTitle (value) {
  return value.length >= TITLE_LENGTH_RANGE.min && value.length <= TITLE_LENGTH_RANGE.max;
}
pristine.addValidator();
pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'от 30 до 100 символов'
);
function validatePrice (value) {
  return  value <= 100000;
}
pristine.addValidator(
  form.querySelector('#price'),
  validatePrice,
  'не более 100000 руб.'
);
function validateRoomsGuests () {
  const roomFields = form.querySelector('#room_number');
  const guestsFields = form.querySelector('#capacity');
  return (guestsFields.value === '0' && roomFields.value === '100') ||
  (guestsFields.value <= roomFields.value && roomFields.value !== '100' && guestsFields.value !== '0');
}
pristine.addValidator(
  form.querySelector('#capacity'),
  validateRoomsGuests,
  'Гостям тесно'
);
form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
export { pageToNotActive, pageToActive };
