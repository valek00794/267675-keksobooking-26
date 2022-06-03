//Функция, возвращающая случайное целое число из переданного диапазона включительно (Источник https://learn.javascript.ru/number)
function randomNumber(min, max, decimal) {
  if (min< 0 || max <0 || decimal>10) {
    return undefined;
  } else {
    if (!decimal || decimal===0){
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    let decimalOut;
    if (decimal===1){ decimalOut=1;}
    if (decimal===2){ decimalOut=2;}
    if (decimal===3){ decimalOut=3;}
    if (decimal===4){ decimalOut=4;}
    if (decimal===5){ decimalOut=5;}
    if (decimal===6){ decimalOut=6;}
    if (decimal===7){ decimalOut=7;}
    if (decimal===8){ decimalOut=8;}
    if (decimal===9){ decimalOut=9;}
    if (decimal===10){ decimalOut=10;}
    return (min + Math.random() * (max - min)).toFixed(decimalOut);
  }
}
console.log( randomNumber(0, 1,0) );

