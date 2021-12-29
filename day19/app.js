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

const validate = (el) => {
  let bool = false;

  if (!el.value.length) {
    showValidationCheck(el, false);
    return;
  }

  data[el.name] = el.value;

  if (el.name === 'name') {
    bool = el.value.length >= 3;
  }

  if (el.name === 'email') {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    bool = reg.test(el.value);
  }

  if (el.name === 'password') {
    bool = el.value.length >= 4;
    if (bool) {
      const confirm = form.querySelector('.confirm-password');
      confirm.disabled = false;
    }
  }

  if (el.name === 'confirm-password') {
    bool = data[el.name] === data.password;
    if (!bool) {
      showValidationCheck(el, bool, el.name);
      return;
    }
  }
  showValidationCheck(el, bool);
};

const elemOnBlur = (e) => {
  if (e.target.classList[0] === 'show-hide' || e.target.value === 'Submit') {
    return;
  }
  validate(e.target);
};

const clickOnForm = (e) => {
  e.preventDefault();

  if (e.target.closest('.submit')) {
    console.log(data);
  }

  if (e.target.closest('.show-hide')) {
    e.target.classList.toggle('hide');
    switchPasswordVisibility(e.target);
  }
};

form.addEventListener('click', clickOnForm);
form.addEventListener('blur', elemOnBlur, true);
