import { disOrEnableFormElements } from './utils.js';
import { sendData } from './api.js';
import { showSuccsessAlert, showErrorAlert } from './utils.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const sliderElement = document.querySelector('.ad-form__slider');
const roomField = adForm.querySelector('#room_number');
const guestsField = adForm.querySelector('#capacity');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const timeInField = adForm.querySelector('#timein');
const timeОutField = adForm.querySelector('#timeout');
const titleField = adForm.querySelector('#title');
const adFormSubmitButton = adForm.querySelector('.ad-form__submit');
const avatarImgChooser = adForm.querySelector('#avatar');
const previewAvatarField = adForm.querySelector('.ad-form-header__preview img');
const offerImgChooser = adForm.querySelector('#images');
const previewOfferField = adForm.querySelector('.ad-form__photo img');
const avatarImgDefault = previewAvatarField.src;
const offerImgDefault = previewOfferField.src;

const TITLE_LENGTH_RANGE = {
  min: 30,
  max: 100,
};
const MAX_PRICE_FOR_NIGHT = 100000;
const MIN_PRICE_PER_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
const SLIDER_RANGE = {
  min: 0,
  max: MAX_PRICE_FOR_NIGHT,
  start: 0,
  step: 1,
};
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
//Функции активации и деактиввации форм
function disablefiltersForm() {
  filtersForm.classList.add('map__filters--disabled');
  disOrEnableFormElements(filtersForm, true);
}
function pageToNotActive() {
  adForm.classList.add('ad-form--disabled');
  sliderElement.style.opacity = '0.4';
  sliderElement.style.pointerEvents = 'none';
  disOrEnableFormElements(adForm, true);
  disablefiltersForm();
}
function pageToActive() {
  adForm.classList.remove('ad-form--disabled');
  filtersForm.classList.remove('map__filters--disabled');
  sliderElement.removeAttribute('style');
  disOrEnableFormElements(adForm, false);
  disOrEnableFormElements(filtersForm, false);
}
//Валидация внешним API Pristine
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});
//Слайдер noUiSlider
const sliderSetting = {
  range: {
    min: SLIDER_RANGE.min,
    max: SLIDER_RANGE.max,
  },
  start: SLIDER_RANGE.start,
  step: SLIDER_RANGE.step,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};
noUiSlider.create(sliderElement, sliderSetting);
sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate();
});

function validateTitle(value) {
  return value.length >= TITLE_LENGTH_RANGE.min && value.length <= TITLE_LENGTH_RANGE.max;
}
pristine.addValidator();
pristine.addValidator(
  titleField,
  validateTitle,
  `от ${TITLE_LENGTH_RANGE.min} до ${TITLE_LENGTH_RANGE.max} символов`
);
let minPriceForNight = MIN_PRICE_PER_TYPE[typeField.value];
typeField.addEventListener('change', () => {
  for (const key in MIN_PRICE_PER_TYPE) {
    if (typeField.value === key) {
      priceField.placeholder = MIN_PRICE_PER_TYPE[key];
      minPriceForNight = MIN_PRICE_PER_TYPE[key];
    }
  }
  pristine.validate();
});
function validatePrice(value) {
  return value <= MAX_PRICE_FOR_NIGHT && value >= minPriceForNight;
}
function validatePriceMessage() {
  return `Мин. цена ${minPriceForNight} руб. и не более ${MAX_PRICE_FOR_NIGHT} руб.`;
}
pristine.addValidator(
  priceField,
  validatePrice,
  validatePriceMessage,
);
function validateRoomsGuests() {
  const СONDITION_EXCEPTION_FOR_GUESTS = '0';
  const СONDITION_EXCEPTION_FOR_ROOMS = '100';
  return (guestsField.value === СONDITION_EXCEPTION_FOR_GUESTS && roomField.value === СONDITION_EXCEPTION_FOR_ROOMS) ||
    (guestsField.value <= roomField.value && roomField.value !== СONDITION_EXCEPTION_FOR_ROOMS && guestsField.value !== СONDITION_EXCEPTION_FOR_GUESTS);
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
  timeОutField.value = timeInField.value;
  pristine.validate();
});
timeОutField.addEventListener('change', () => {
  timeInField.value = timeОutField.value;
  pristine.validate();
});
function validateChekinOut() {
  return timeInField.value === timeОutField.value;
}
pristine.addValidator(
  timeОutField,
  validateChekinOut,
  'Время заезда и выезда должно быть одинаково'
);
//Блокировка и разблокировка кнопки при отправки
function blockSubmitButton() {
  adFormSubmitButton.disabled = true;
  adFormSubmitButton.textContent = 'Прдождите..';
}
function unblockSubmitButton() {
  adFormSubmitButton.disabled = false;
  adFormSubmitButton.textContent = 'Опубликовать';
}
//Функция кнопки сброса
function resetAdFormButton(resetMap) {
  adForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
    evt.preventDefault();
    resetAdForm();
    resetMap();
  });
}
//Функция сброса форм и слайдера
function resetAdForm() {
  adForm.reset();
  filtersForm.reset();
  sliderElement.noUiSlider.updateOptions(sliderSetting);
  previewAvatarField.src = avatarImgDefault;
  previewOfferField.src = offerImgDefault;
}
//Функция отправки формы
function sendForm(resetMap) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showSuccsessAlert();
          unblockSubmitButton();
          resetAdForm();
          resetMap();
        },
        () => {
          showErrorAlert();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
}

function setFilter(cb) {
  filtersForm.addEventListener('change', () => {
    cb();
  });
}

function previewImg (chooser, field) {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    field.src = URL.createObjectURL(file);
  }
}
avatarImgChooser.addEventListener('change', () => {
  previewImg (avatarImgChooser, previewAvatarField);

});

offerImgChooser.addEventListener('change', () => {
  previewImg (offerImgChooser, previewOfferField);

});

export {
  pageToNotActive,
  pageToActive,
  disablefiltersForm,
  sendForm,
  resetAdFormButton,
  setFilter,
};
