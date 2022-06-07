//Функция, возвращающая случайное целое число из переданного диапазона включительно (Источник https://learn.javascript.ru/number)
function getRandomNumber(min, max, decimal) {
  if (min>= 0 && max >=0 && decimal<20) {
    return (min + Math.random() * (max - min)).toFixed(decimal);
  }
  if ((min>= 0 && max >=0) && !decimal || decimal===0){
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
getRandomNumber(0, 1,10);
const COUNT_OBJECT = 2;
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = (elements) => {return elements[getRandomNumber(0, elements.length - 1)];};

const createObjectAuthor = (countObject) => {return {avatar: `img/avatars/user${countObject.toString().padStart(2,'0')}.png`,};};
const createObjectLocation = () => {
  return {
    lat: getRandomNumber(35.65000,35.70000,5),
    lng: getRandomNumber(139.70000,139.80000,5),
  };
};
function getArray(features) {
  const maxLength = features.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];
  for(let i = array.length;i < lengthOfArray;i++) {
    const indexOfElement = getRandomNumber(0, maxLength - 1);
    const element = features[indexOfElement];
    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
}
const createObjectOffer = () => {
  return {
      title: `Название ${this.type}`, //херота
      address: location.lat,  //херота
      price: getRandomNumber(3000, 10000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getArray(FEATURES),
      description: `Описание не придумано ${this.rooms}`, //херота
      photos: getArray(PHOTOS),
  };
};

const createObjectArray = (count) => {
  return {
    author: createObjectAuthor(count),
    offer: createObjectOffer(),
    location: createObjectLocation(),
  };
};
const createObjectALL = (count) => {
  let arrayObject = [];
  for (let i = 1; i<= count; i++){
    arrayObject.push(createObjectArray(i));



  }
  return arrayObject;
}

//const createArrayObjects = Array.from({length: COUNT_OBJECT}, createObjectOffer);

console.log(createObjectArray(COUNT_OBJECT));
//console.log(createObjectALL(COUNT_OBJECT));
