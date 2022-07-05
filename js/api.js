const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
};

const sendData = (onSuccess, onFail, body) => {
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
        onFail('Не удалось отправить форму. Попробуйте ещё раз1');
      }
    })
    .catch(() => onFail('Не удалось отправить форму. Попробуйте ещё раз2'));
};

export {getData, sendData};
