const form = document.querySelector('form');
const data = {};

const showValidationCheck = (el, bool) => {
  const errorField = el.parentElement.querySelector('.error');
  const successField = el.parentElement.querySelector('.success');
  
  if (bool) {
    successField.innerHTML = '<img src="./images/success.svg" alt="Success" />';
    errorField.innerHTML = '';
  } else {
    successField.innerHTML = '';
    errorField.innerHTML = `<img src="./images/error.svg" alt="Error" />
      //   A ${el.name} is required`;
  }
};

const toValidate = (el) => {
  if (!el.value.length) {
    showValidationCheck(el, false);
    return;
  }

  // валидация EMAIL

  if (el.name === 'confirm-password') {
    if (data[el.name] !== data.password) {
      showValidationCheck(el, false);
      return;
    }
  }
    showValidationCheck(el, true);
};

const addInputListeners = (el) => {
  el.addEventListener('input', (e) => {
    e.target.value = e.target.value.trim();
    data[e.target.name] = e.target.value;
  });
  el.addEventListener('focus', (e) => {
    console.log('focus');
  });
  el.addEventListener('blur', (e) => {
    toValidate(e.target);
  });
};

const switchPasswordVisibility = (target) => {
  const el = target.parentElement.querySelector('input');
  el.type = el.type === 'text' ? 'password' : 'text';
} 

const clickOnForm = (e) => {
    e.preventDefault();

    if (e.target.closest('.field__input')) {
      addInputListeners(e.target)
     
    }

    if (e.target.closest('.submit')) {
      console.log('submit')
    }


    if (e.target.closest('.show-hide')) {
      switchPasswordVisibility(e.target);
    }

}


form.addEventListener('click', clickOnForm);
