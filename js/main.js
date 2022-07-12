import {
  pageToNotActive,
  sendForm,
  resetAdFormButton,
  disablefiltersForm,
  setFilter,
}
  from './form.js';
import { mapDraw } from './map.js';
import { getData } from './api.js';
import { showLoadAlert, debounce } from './utils.js';

const FILTER_DELAY = 500;

document.addEventListener('DOMContentLoaded', () => {
  pageToNotActive();
  const { resetMap, createMarker } = mapDraw();

  //Получение данных с сервера и отрисовка маркеров
  //При ошибке вывод алерта и блокировка формы с фильтрами
  getData(
    (offers) => {
      createMarker(offers);
      setFilter(debounce(() => createMarker(offers), FILTER_DELAY));
    },
    (message) => {
      showLoadAlert(message);
      disablefiltersForm();
    }
  );
  sendForm(resetMap);
  resetAdFormButton(resetMap);
});
