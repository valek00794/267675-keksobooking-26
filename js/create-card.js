import {DATA_OUTPUT,types} from './data.js';
const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
DATA_OUTPUT.forEach((card) => {
  const element = cardTemplate.cloneNode(true);
  if (card.offer.title) {element.querySelector('.popup__title').textContent=card.offer.title;} else {element.querySelector('.popup__title').remove();}
  if (card.offer.address) {element.querySelector('.popup__text--address').textContent=card.offer.address;} else {element.querySelector('.popup__text--address').remove();}
  if (card.offer.price) {element.querySelector('.popup__text--price').textContent=`${card.offer.price} ₽/ночь`;} else {element.querySelector('.popup__text--price').remove();}
  if (card.offer.type) {element.querySelector('.popup__type').textContent=types[card.offer.type];} else {element.querySelector('.popup__type').remove();}
  if (card.offer.rooms &&  card.offer.guests) {element.querySelector('.popup__text--capacity').textContent=`${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;} else {element.querySelector('.popup__text--capacity').remove();}
  if (card.offer.checkin &&  card.offer.checkout) {element.querySelector('.popup__text--time').textContent=`Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;} else {element.querySelector('.popup__text--time').remove();}
  if(card.offer.features !==[]){
    const cardFetures = card.offer.features;
    const modifiers = cardFetures.map((cardFeature) => `popup__feature--${cardFeature}`);
    const featuresList = element.querySelector('.popup__features').querySelectorAll('li');
    featuresList.forEach((featuresListItem) => {
      const modifier =featuresListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });}
  else {
    element.querySelector('.popup__features').remove();
  }
  if (card.offer.description) {element.querySelector('.popup__description').textContent=card.offer.description;} else {element.querySelector('.popup__description').remove();}
  if(card.offer.photos !==[]){
    const cardPhotos = card.offer.photos;
    const photoOut = document.createDocumentFragment();
    const fragmentTemplate = element.querySelector('.popup__photos').querySelector('.popup__photo');
    element.querySelector('.popup__photos').innerHTML = '';
    const templateImg = element.querySelector('.popup__photos');
    for (let i = 0; i<cardPhotos.length; i++){
      const fragment = fragmentTemplate.cloneNode(true);
      fragment.src=cardPhotos[i];
      photoOut.append(fragment);
    }
    templateImg.append(photoOut);}
  else {
    element.querySelector('.popup__photos').remove();
  }
  if (card.author.avatar) {element.querySelector('.popup__avatar').src=card.author.avatar;} else {element.querySelector('.popup__avatar').remove();}
  mapCanvas.append(element);
});

