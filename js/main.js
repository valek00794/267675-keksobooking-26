import {
  pageToNotActive,
  sendForm,
  resetAdFormButton,
  disablefiltersForm,
}
  from './form.js';
import { mapDraw } from './map.js';
import { getData } from './api.js';
import { showLoadAlert } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  pageToNotActive();
  const { resetMap, createMarker } = mapDraw();

  //Получение данных с сервера и отрисовка маркеров
  //При ошибке вывод алерта и блокировка формы с фильтрами
  getData(
    (offers) => {
      createMarker(offers);
      resetAdFormButton(offers, resetMap);
      sendForm(offers, resetMap);
    },
    (message) => {
      showLoadAlert(message);
      disablefiltersForm();
    }
  );
});

