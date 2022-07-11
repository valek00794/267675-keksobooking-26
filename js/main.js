import {
  pageToNotActive, 
  sendForm, 
  resetAdFormButton, 
  disablefiltersForm, 
  setFilterType, 
  setFilterPrice, 
  setFilterRooms,
  setFilterGuests,
  setFilterWiFi,
  setFilterDishwasher,
  setFilterParking,
  setFilterWasher,
  setFilterElevator,
  setFilterConditioner,
} 
  from './form.js';
import {mapDraw} from './map.js';
import {getData} from './api.js';
import {showLoadAlert} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  pageToNotActive();
  const {resetMap, createMarker} = mapDraw();

  //Получение данных с сервера и отрисовка маркеров
  //При ошибке вывод алерта и блокировка формы с фильтрами
  getData(
    (offers) => {
     createMarker(offers);
     console.log(offers);
     setFilterType(() => createMarker(offers));
     setFilterPrice(() => createMarker(offers));
     setFilterRooms(() => createMarker(offers));
     setFilterGuests(() => createMarker(offers));
     setFilterWiFi(() => createMarker(offers));
     setFilterDishwasher(() => createMarker(offers));
     setFilterParking(() => createMarker(offers));
     setFilterWasher(() => createMarker(offers));
     setFilterElevator(() => createMarker(offers));
     setFilterConditioner(() => createMarker(offers));
      },
    (message) => {
      showLoadAlert(message);
      disablefiltersForm();
    }
  );  
 
  


  sendForm(resetMap);
  resetAdFormButton(resetMap);
});
