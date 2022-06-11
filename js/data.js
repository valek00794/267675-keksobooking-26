import {getRandomArrayElement,getRandomNumber,getRandomElementsFromArray} from './util.js';
//Входные данные для создания массива объектов
const COUNT_OBJECTS = 10;
const OFFER_TITLES = [
  'Дворец королей на возвышенности',
  'Апараменты в центре города',
  'Домик у моря',
  'Бунгало в джунглях',
  '6ти звездочный отель',
];
const OFFER_RANGE_PRICE = {
  min: 3000,
  max: 10000,
};
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const OFFER_COUNT_ROOMS = {
  min: 1,
  max: 5,
};
const OFFER_COUNT_GUESTS = {
  min: 1,
  max: 10,
};
const OFFER_CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_DESCRIPTIONS = [
  'Дворец королей с прекрасным видом на окресности',
  'Апараменты в центре города вблизи с основными достопримечательностями',
  'Уютный домик у моря с чистейшим пляжем и тавернами',
  'Бунгало в непроходимых джунглях для уединения',
  '6ти звездочный отель ультра все включено',
];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
  //Функция создания объекта автор с генерацией сылки аватара
const createObjectAvatarAuthorLink  = (countObject) => {{return {avatar: `img/avatars/user${countObject.toString().padStart(2,'0')}.png`,};}};
//Функция создания оъекта с данными
const createOfferObject = (count) => {
  const LATITUDE = getRandomNumber(35.65,35.7,5);
  const LONGITUDE = getRandomNumber(139.7,139.8,5);
  return {
    author: createObjectAvatarAuthorLink(count),
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: `${LATITUDE},${LONGITUDE}`,
      price: getRandomNumber(OFFER_RANGE_PRICE.min, OFFER_RANGE_PRICE.max),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomNumber(OFFER_COUNT_ROOMS.min, OFFER_COUNT_ROOMS.max),
      guests: getRandomNumber(OFFER_COUNT_GUESTS.min, OFFER_COUNT_GUESTS.max),
      checkin: getRandomArrayElement(OFFER_CHECKIN_TIME),
      checkout: getRandomArrayElement(OFFER_CHECKOUT_TIME),
      features: getRandomElementsFromArray(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: getRandomElementsFromArray(OFFER_PHOTOS),
    },
    location: {
      iat: LATITUDE,
      ing: LONGITUDE,
    },
  };
};
//Функция создания массива объектов
const createObjectArray = (count) => {
  const arrayObject = [];
  for (let i = 1; i<= count; i++){
    arrayObject.push(createOfferObject(i));
  }
  return arrayObject;
};
const doneArray = createObjectArray(COUNT_OBJECTS);
export {doneArray};
