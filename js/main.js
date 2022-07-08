import {pageToNotActive, sendForm, buttonResetAdForm} from './form.js';
import {mapDraw} from './map.js';

document.addEventListener('DOMContentLoaded', () => {
  pageToNotActive();
  const {resetMap} = mapDraw();
  sendForm(resetMap);
  buttonResetAdForm(resetMap);
});
