let receivedOffers = [];
const getOfferData = () => receivedOffers.slice();
//Получение данных с сервера
const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      receivedOffers = offers;
      onSuccess(offers);
    })
    .catch(() => onFail('Ошибка загрузки данных с сервера'));
};
//Отправка данных с сервера
const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData, getOfferData };
