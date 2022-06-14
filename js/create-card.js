import {DATA_OUTPUT,types} from './data.js';
console.log(DATA_OUTPUT);
const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;

DATA_OUTPUT.forEach((card) => {
  const element = cardTemplate.cloneNode(true);
  element.querySelector('.popup__title').textContent=card.offer.title;
  element.querySelector('.popup__text--address').textContent=card.offer.address;
  element.querySelector('.popup__text--price').textContent= card.offer.price+` ₽/ночь`;
  element.querySelector('.popup__type').textContent=types[card.offer.type];
  element.querySelector('.popup__text--capacity').textContent=card.offer.rooms+' комнаты для '+card.offer.guests+' гостей';
  element.querySelector('.popup__text--time').textContent= 'Заезд после '+card.offer.checkin+', выезд до  '+card.offer.checkout;
  const cardFetures = card.offer.features;
  const modifiers = cardFetures.map((cardFeature) => 'popup__feature--' + cardFeature);
  const featuresList = element.querySelector('.popup__features').querySelectorAll('li');
  featuresList.forEach((featuresListItem) => {
    const modifier =featuresListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
  element.querySelector('.popup__description').textContent=card.offer.description;
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
  templateImg.append(photoOut);
  element.querySelector('.popup__avatar').src=card.author.avatar;

  mapCanvas.append(element);

});

