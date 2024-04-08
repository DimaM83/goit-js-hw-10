import { selectors } from './refs';

export let countdownInterval;

export function startTimer(updateCallback) {
  clearInterval(countdownInterval);
  updateTimer(updateCallback);
  countdownInterval = setInterval(() => updateTimer(updateCallback), 1000);
}

export function updateTimer(updateCallback) {
  const currentDate = new Date();
  const targetDate = new Date(selectors.dateTimePickerRef.value);

  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    resetTimerDisplay();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  updateCallback({ days, hours, minutes, seconds });
}

export function resetTimerDisplay() {
  selectors.daysRef.textContent = '00';
  selectors.hoursRef.textContent = '00';
  selectors.minutesRef.textContent = '00';
  selectors.secondsRef.textContent = '00';
}

export function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

export function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
