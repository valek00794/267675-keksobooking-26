let receivedData = [];
const getOfferData = () => receivedData.slice();
const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      receivedData = offers;
      onSuccess(offers);
    })
    .catch(() => onFail('Ошибка загрузки данных с сервера'));
};

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
