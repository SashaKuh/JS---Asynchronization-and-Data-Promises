import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');


form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  
  let delay = Number(evt.currentTarget.delay.value)
  const step= Number(evt.currentTarget.step.value)
  const amount= Number(evt.currentTarget.amount.value)
  
  for (let i = 1; i <= amount; i += 1) {
  createPromise(i, delay)
  .then(({ position, delay }) => {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  })
  
  delay += step
  }
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
