const timer = document.querySelector('.timer');
const button = timer.querySelector('.start, .stop');
const settings = timer.querySelector('.settings');
const minutes = timer.querySelector('.minutes input');
const seconds = timer.querySelector('.seconds input');
const ring = document.querySelector('.wrapper .ring');
const btnCaptureStart = 'start';
const btnCaptureEnd = 'end';
let timerId;

const toSwitch = (item, bool) => {
  if (Array.isArray(item)) {
    item.forEach(el => el.disabled = bool);
  }
  else {
      item.disabled = bool;
  } 
}

const timerOnInput = () => {
  timer.addEventListener('input', (e) => {
    const flag = (!(+minutes.value + +seconds.value))
    toSwitch(button, flag)
    if (e.target.value > 59) e.target.value = 59;
  });
}

const timePrettier = (time) => {
  return time.length < 2 ? time.padStart(2, '0') : time;
};

const timeIncrement = () => {
  if (!+seconds.value) {
    seconds.value = 60;
    minutes.value--;
  }
  seconds.value--;
  minutes.value = timePrettier(minutes.value);
  seconds.value = timePrettier(seconds.value);
};

const timerStop = () => {
  clearInterval(timerId);
  toSwitch(settings, false)
  if (button.disabled) {
    ring.classList.add('ending');
  }
};

const timerStart = () => {
  toSwitch([settings, minutes, seconds], true);
  timerId = setInterval(() => {
    if (!(+minutes.value + +seconds.value)) {
      toSwitch(button, true);
      btnCapture();
      return;
    }
    timeIncrement();
  }, 1000);
};

const clickOnGear = () => {
  ring.classList.remove('ending');
  toSwitch([minutes, seconds], false)
  timerOnInput();
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
  const target = e.target.closest('button');
  e.stopImmediatePropagation();
  if (target === button) btnCapture();
  if (target === settings && !settings.disabled) {
    clickOnGear();
  }
};

timer.addEventListener('click', timerClicked);
