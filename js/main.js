//Функция, возвращающая случайное целое число из переданного диапазона включительно (Источник https://learn.javascript.ru/number)
function randomNumber(min, max, decimal) {
  if (min< 0 || max <0 || decimal>20) {
    return undefined;
  } else {
    if (!decimal || decimal===0){
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    return (min + Math.random() * (max - min)).toFixed(decimal);
  }
}
randomNumber(0, 12,20);

