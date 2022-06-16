import {getRandomArrayElement,getRandomNumber,getRandomElementsFromArray,getArrayOfObjectKeys} from './utils.js';
//Входные данные для создания массива объектов
const COUNT_OBJECTS = 1;
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
const types = {
  palace:'Дворец',
  flat:'Квартира',
  house:'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
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
const OFFER_COORDINATE_RANGE = {
  LATITUDE: {min: 35.65, max: 35.7},
  LONGITUDE: {min: 139.7, max: 139.8},
  ACCURACY: 5,
};
  //Функция создания сылки аватара
const createAvatarAuthorLink  = (countObject) => {{return `img/avatars/user${countObject.toString().padStart(2,'0')}.png`;}};
//Функция создания оъекта с данными
const createOffer = (count) => {
  const LATITUDE = getRandomNumber(OFFER_COORDINATE_RANGE.LATITUDE.min, OFFER_COORDINATE_RANGE.LATITUDE.max, OFFER_COORDINATE_RANGE.ACCURACY);
  const LONGITUDE = getRandomNumber(OFFER_COORDINATE_RANGE.LONGITUDE.min, OFFER_COORDINATE_RANGE.LONGITUDE.max, OFFER_COORDINATE_RANGE.ACCURACY);
  return {
    author: {
      avatar: createAvatarAuthorLink(count),
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: `${LATITUDE},${LONGITUDE}`,
      price: getRandomNumber(OFFER_RANGE_PRICE.min, OFFER_RANGE_PRICE.max),
      type: getRandomArrayElement(getArrayOfObjectKeys(types)),
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
//Функция создания массива данных
const createOfferArray = (count) => {
  const data = [];
  for (let i = 1; i<= count; i++){
    data.push(createOffer(i));
  }
  return data;
};
const DATA_OUTPUT = createOfferArray(COUNT_OBJECTS);
export {DATA_OUTPUT,types};
