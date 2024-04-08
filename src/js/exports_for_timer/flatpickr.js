import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export function initializeDateTimePicker(selector, options, onCloseCallback) {
  return flatpickr(selector, {
    ...options,
    onClose: onCloseCallback,
  });
}
