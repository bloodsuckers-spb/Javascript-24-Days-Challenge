const form = document.querySelector('form');
const data = {};

const switchPasswordVisibility = (target) => {
  const el = target.parentElement.querySelector('input');
  el.type = el.type === 'text' ? 'password' : 'text';
};

const showValidationCheck = (el, bool, str) => {
  const [outputImg, outputText] =
    el.parentElement.querySelector('.output').children;
  outputText.innerHTML = '';

  if (bool) {
    outputImg.classList.remove('invalid');
    outputImg.classList.add('valid');
  } else {
    outputImg.classList.remove('valid');
    outputImg.classList.add('invalid');
    if (str) {
      outputText.innerHTML = `passwords fields should match`;
      return;
    }
    outputText.innerHTML = `This field is required`;
  }
};

const validate = (e) => {
  let bool = false;

  if (!e.target.value.length) {
    showValidationCheck(e.target, false);
    return;
  }

  if (e.target.name === 'name') {
    bool = e.target.value.length >= 3;
  }

  if (e.target.name === 'email') {
    bool = e.target.value.length >= 6;
  }

  if (e.target.name === 'password') {
    bool = e.target.value.length >= 4;
    if (bool) {
      const confirm = form.querySelector('.confirm-password');
      confirm.disabled = false;
    }
  }

  if (e.target.name === 'confirm-password') {
    bool = data[e.target.name] === data.password;
    if (!bool) {
      showValidationCheck(e.target, bool, e.target.name);
      return;
    }
  }
  showValidationCheck(e.target, bool);
};

const clickOnForm = (e) => {
  e.preventDefault();

  if (e.target.closest('.submit')) {
    console.log('submit')
  }

  if (e.target.closest('.show-hide')) {
    e.target.classList.toggle('hide');
    switchPasswordVisibility(e.target);
  }
};

form.addEventListener('click', clickOnForm);
form.addEventListener('blur', validate, true);