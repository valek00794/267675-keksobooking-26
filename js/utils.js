//Функция, возвращающая случайное целое число из переданного диапазона включительно (Источник https://learn.javascript.ru/number)
function getRandomNumber(min, max, decimal) {
  if (min>= 0 && max >=0 && decimal<20) {
    return (min + Math.random() * (max - min)).toFixed(decimal);
  }
  if ((min>= 0 && max >=0) && !decimal || decimal===0){
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  throw new RangeError('Входные данные вне диапазона');
}
//Функция получения случайного элемента из массива
function getRandomArrayElement (elements) {{return elements[getRandomNumber(0, elements.length - 1)];}}
//Функция получения случайного массива из исходного массива
function getRandomElementsFromArray (features) {
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
//Функция получения массива из ключей объекта
function getArrayOfObjectKeys(types) {
  const array = [];
  for (const type in types) {
    array.push(type);
  }
  return array;
}
//Функция блокировки или разблокировки всех элементов в форме
function disOrEnableFormElements (form, directive){
  const allElements = form.elements;
  for (let i = 0, l = allElements.length; i < l; i++) {
    allElements[i].disabled=directive;
  }
}
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 10000);
}
export {getRandomArrayElement, getRandomNumber, getRandomElementsFromArray, getArrayOfObjectKeys, disOrEnableFormElements,showAlert};
