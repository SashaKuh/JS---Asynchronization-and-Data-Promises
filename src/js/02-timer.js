import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Timer {
  constructor() {
    this.selectors = {
      inputDatetime: document.querySelector('#datetime-picker'),
      buttonStart: document.querySelector('[data-start]'),
      dataDays: document.querySelector('[data-days]'),
      dataHours: document.querySelector('[data-hours]'),
      dataMinutes: document.querySelector('[data-minutes]'),
      dataSeconds: document.querySelector('[data-seconds]')
    };

    this.timerId = 0;
    this.selectedDate = null;

    this.options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: (selectedDates) => this.onCloseHandler(selectedDates)
    };

    this.flatpickrInstance = flatpickr(this.selectors.inputDatetime, this.options);
    this.selectors.buttonStart.disabled = true;
    this.selectors.buttonStart.addEventListener('click', () => this.onStartHandler());
  }

  onCloseHandler(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      Notify.warning('Please choose a date in the future');
      return;
    }

    this.selectedDate = selectedDates[0];
    if (!this.timerId) {
      this.selectors.buttonStart.disabled = false;
    }
  }

  onStartHandler() {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => this.assignValueTimer(), 1000);
    this.selectors.buttonStart.disabled = true;
  }

  assignValueTimer() {
    const currentDate = new Date();
    if (this.selectedDate <= currentDate) {
      clearInterval(this.timerId);
      this.timerId = 0;
      Notify.success('Timer out');
      return;
    }

    const { days, hours, minutes, seconds } = this.timer(this.selectedDate, currentDate);

    this.selectors.dataDays.textContent = days;
    this.selectors.dataHours.textContent = hours;
    this.selectors.dataMinutes.textContent = minutes;
    this.selectors.dataSeconds.textContent = seconds;
  }

  timer(selectedDate, currentDate) {
    const timerInMs = selectedDate - currentDate;
    return this.convertMs(timerInMs);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
}

new Timer();
