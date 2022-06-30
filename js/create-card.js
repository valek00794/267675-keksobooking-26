import { types } from './data.js';
function card(data) {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const element = cardTemplate.cloneNode(true);
  if (data.offer.title) {
    element.querySelector('.popup__title').textContent = data.offer.title;
  }
  else {
    element.querySelector('.popup__title').remove();
  }
  if (data.offer.address) {
    element.querySelector('.popup__text--address').textContent = data.offer.address;
  }
  else {
    element.querySelector('.popup__text--address').remove();
  }
  if (data.offer.price) {
    element.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  }
  else {
    element.querySelector('.popup__text--price').remove();
  }
  if (data.offer.type) {
    element.querySelector('.popup__type').textContent = types[data.offer.type];
  }
  else {
    element.querySelector('.popup__type').remove();
  }
  if (data.offer.rooms && data.offer.guests) {
    element.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  }
  else {
    element.querySelector('.popup__text--capacity').remove();
  }
  if (data.offer.checkin && data.offer.checkout) {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  }
  else {
    element.querySelector('.popup__text--time').remove();
  }
  const cardFetures = data.offer.features;
  if (Array.isArray(cardFetures) && cardFetures.length) {
    const modifiers = cardFetures.map((cardFeature) => `popup__feature--${cardFeature}`);
    const featuresList = element.querySelector('.popup__features').querySelectorAll('li');
    featuresList.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }
  else {
    element.querySelector('.popup__features').remove();
  }
  if (data.offer.description) {
    element.querySelector('.popup__description').textContent = data.offer.description;
  }
  else {
    element.querySelector('.popup__description').remove();
  }
  const cardPhotos = data.offer.photos;
  if (Array.isArray(cardPhotos) && cardPhotos.length) {
    const fragment = document.createDocumentFragment();
    const fragmentTemplate = element.querySelector('.popup__photos').querySelector('.popup__photo');
    element.querySelector('.popup__photos').innerHTML = '';
    const imgList = element.querySelector('.popup__photos');
    for (let i = 0; i < cardPhotos.length; i++) {
      const imgElement = fragmentTemplate.cloneNode(true);
      imgElement.src = cardPhotos[i];
      fragment.append(imgElement);
    }
    imgList.append(fragment);
  }
  else {
    element.querySelector('.popup__photos').remove();
  }
  if (data.author.avatar) {
    element.querySelector('.popup__avatar').src = data.author.avatar;
  }
  else {
    element.querySelector('.popup__avatar').remove();
  }
  return element;
}
export { card };
