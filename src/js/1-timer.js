import { initializeDateTimePicker } from './exports_for_timer/flatpickr';
import iziToast from 'izitoast';
import * as timer from './exports_for_timer/timer';
import { selectors } from './exports_for_timer/refs';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

iziToast.settings({
  position: 'topRight',
});

const onCloseCallback = selectedDates => {
  const selectedDate = selectedDates[0];

  if (selectedDate < new Date()) {
    iziToast.error({
      title: 'Error',
      message: `❌ Please choose a date in the future`,
    });
    timer.resetTimerDisplay();
    selectors.startBtnRef.disabled = true;
  } else {
    iziToast.success({
      title: 'Success',
      message: `✅ You selected a valid future date`,
    });
    selectors.startBtnRef.disabled = false;

    localStorage.setItem('selectedDate', selectedDate.toISOString());
  }
};

initializeDateTimePicker('#datetime-picker', options, selectedDates =>
  onCloseCallback(
    selectedDates,
    options.defaultDate.getTime() - new Date().getTime()
  )
);

window.addEventListener('load', () => {
  const savedSelectedDate = localStorage.getItem('selectedDate');

  if (savedSelectedDate) {
    options.defaultDate = new Date(savedSelectedDate);
  }

  initializeDateTimePicker('#datetime-picker', options, onCloseCallback);

  selectors.startBtnRef.disabled = true;

  selectors.startBtnRef.addEventListener('click', () => {
    timer.startTimer(updateTimerDisplay);
  });

  const currentDate = new Date();
  const selectedDate = new Date(savedSelectedDate);

  if (selectedDate > currentDate) {
    timer.startTimer(updateTimerDisplay);
  }
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  selectors.daysRef.textContent = timer.addLeadingZero(days);
  selectors.hoursRef.textContent = timer.addLeadingZero(hours);
  selectors.minutesRef.textContent = timer.addLeadingZero(minutes);
  selectors.secondsRef.textContent = timer.addLeadingZero(seconds);
}
