import {pageToNotActive, sendForm, buttonResetAdForm, disablefiltersForm, setFilterTypeOffers} from './form.js';
import {mapDraw} from './map.js';
import {getData} from './api.js';
import {showLoadAlert} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  pageToNotActive();
  const {resetMap, createMarker, compareOfOfferType} = mapDraw();

  //Получение данных с сервера и отрисовка маркеров
  //При ошибке вывод алерта и блокировка формы с фильтрами
  getData(
    (offers) => {
     createMarker(offers);
     setFilterTypeOffers(() =>createMarker(offers));
      },
    (message) => {
      showLoadAlert(message);
      disablefiltersForm();
    }
  );  

  


  sendForm(resetMap);
  buttonResetAdForm(resetMap);
});
