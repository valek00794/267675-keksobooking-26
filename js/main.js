import {pageToNotActive, sendForm, buttonResetAdForm} from './form.js';
import {mapDraw} from './map.js';

document.addEventListener('DOMContentLoaded', async () => {
  pageToNotActive();
  const {resetMap} = await mapDraw();
  sendForm(resetMap);
  buttonResetAdForm(resetMap);

  


});
