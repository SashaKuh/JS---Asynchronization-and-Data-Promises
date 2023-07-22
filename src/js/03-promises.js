import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');


form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const { delay, step, amount } = {
    delay: Number(evt.currentTarget.delay.value),
    step: Number(evt.currentTarget.step.value),
    amount: Number(evt.currentTarget.amount.value),
  };

  let i = 0;

  function sendNotification() {
    if (i < amount) {
      let promiseDelay = delay + step * i;
      createPromise(i + 1, promiseDelay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        })
        .finally(() => {
          i++;
          sendNotification();
        });
    }
  }

  sendNotification();
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
