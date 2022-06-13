import {DATA_OUTPUT} from './data.js';
console.log(DATA_OUTPUT);
const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
DATA_OUTPUT.forEach((card) => {
    const element = cardTemplate.cloneNode(true);
    console.log(element);
    element.querySelector('.popup__title').textContent=card.offer.title;
    element.querySelector('.popup__text--address').textContent=card.offer.address;
    element.querySelector('.popup__text--price').textContent=card.offer.price+' ₽/ночь';
    element.querySelector('.popup__text--capacity').textContent=card.offer.rooms+' комнаты для '+card.offer.guests+' гостей';
    element.querySelector('.popup__text--time').textContent= 'Заезд после '+card.offer.checkin+', выезд до  '+card.offer.checkout;
    const cardFetures = card.offer.features;
    const modifiers = cardFetures.map((cardFeture) => 'popup__feature--' + cardFeture);
    const featuresList = element.querySelector('.popup__features').querySelectorAll('li');
    featuresList.forEach((featuresListItem) => {
       const modifier =featuresListItem.classList[1];
            if (!modifiers.includes(modifier)) {
                featuresListItem.remove();
            }
    });
    element.querySelector('.popup__description').textContent=card.offer.description;
    const cardPhotos = card.offer.photos;
    console.log(cardPhotos.length);
    console.log(cardPhotos);
    //let fragment = document.createDocumentFragment();
    let fragment = element.querySelector('.popup__photos').querySelector('.popup__photo');
    console.log(fragment);
    element.querySelector('.popup__photos').innerHTML = '';
    for (let i = 0; i<cardPhotos.length; i++){
    
    const cardPhoto = fragment.src=cardPhotos[i]; 
   
    }
    element.querySelector('.popup__avatar').src=card.author.avatar; 
    mapCanvas.append(element);  
   // mapCanvas.append(photoImages); 
});

