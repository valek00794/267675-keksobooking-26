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
export { pageToNotActive, pageToActive };
