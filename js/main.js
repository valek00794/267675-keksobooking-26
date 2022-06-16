import {card} from './create-card.js';
import {pageToNotActive, pageToActive} from './form.js';
document.addEventListener('DOMContentLoaded', () => {
  pageToNotActive();
  pageToActive();
});
card();
