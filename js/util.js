//Функция, возвращающая случайное целое число из переданного диапазона включительно (Источник https://learn.javascript.ru/number)
const getRandomNumber = (min, max, decimal) => {
  if (min>= 0 && max >=0 && decimal<20) {
    return (min + Math.random() * (max - min)).toFixed(decimal);
  }
  if ((min>= 0 && max >=0) && !decimal || decimal===0){
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  throw new RangeError('Входные данные вне диапазона');
};
  //Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => {{return elements[getRandomNumber(0, elements.length - 1)];}};
//Функция получения случайного массива из исходного массива
const getRandomElementsFromArray = (features) => {
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
};
export {getRandomArrayElement,getRandomNumber,getRandomElementsFromArray};
