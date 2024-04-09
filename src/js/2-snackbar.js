import iziToast from 'izitoast';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = formData.get('delay');
  const state = formData.get('state');

  try {
    await createPromise(delay, state);
  } catch (error) {
    console.error('Promise rejected:', error);
  }
});

iziToast.settings({
  position: 'topRight',
});

async function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
        resolve();
      } else {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
        reject('Promise rejected');
      }
    }, delay);
  });
}
