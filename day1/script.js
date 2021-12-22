const timer = document.querySelector('.timer');
const button = timer.querySelector('.start, .stop');
const settings = timer.querySelector('.settings');
const minutes = timer.querySelector('.minutes input');
const seconds = timer.querySelector('.seconds input');
const btnCaptureStart = 'start';
const btnCaptureEnd = 'end';
const ring = document.querySelector('.wrapper .ring');
let timerId;


const timerStop = () => {
  clearInterval(timerId);
  settings.disabled = false;
  if (button.disabled) {
    ring.classList.add('ending');
  }
};

const timerStart = () => {
  settings.disabled = true;
  minutes.disabled = true;
  seconds.disabled = true;
  timerId = setInterval(function () {
    if (!(+minutes.value + +seconds.value)) {
      button.disabled = true;
      btnCapture();
      return;
    }
    if (seconds.value == 0) {
      seconds.value = 60;
      minutes.value--;
    }
    seconds.value--;

    if (seconds.value.length < 2) seconds.value = '0' + seconds.value;
    if (minutes.value.length < 2) minutes.value = '0' + minutes.value;

}, 1000);
};

const clickOnGear = () => {
  ring.classList.remove('ending');
  minutes.disabled = false;
  seconds.disabled = false;
  timer.addEventListener('input', (e) => {
    if (e.target.value > 59) e.target.value = 59;
    if (+minutes.value + +seconds.value) {
      button.disabled = false;
    } else button.disabled = true;
  });
};

const btnCapture = () => {
  if (button.textContent === btnCaptureStart) {
    button.textContent = btnCaptureEnd;
    timerStart();
  } else {
    button.textContent = btnCaptureStart;
    timerStop();
  }
};

const timerClicked = (e) => {
  const btn = e.target.closest('.start, .stop');
  const gear = e.target.closest('.settings');
  e.stopImmediatePropagation();

  if (btn) btnCapture();
  if (gear && !settings.disabled) clickOnGear();
};

timer.addEventListener('click', timerClicked);
