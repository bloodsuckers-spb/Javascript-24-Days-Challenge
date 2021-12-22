const form = document.querySelector('form');

const fieldName = ['name', 'email', 'password', 'confirm-password'];
const success = '<img src="./images/success.svg" alt="Success" />';

let str = fieldName[0];

const data = {
  name: '',
  email: '',
  password: '',
  confirmPass: '',
};

function validate(e) {
  const input = e.target.closest('.field__input');
  const btn = e.target.closest('.show-hide');
  e.stopPropagation();

  if (btn) {
    const elem = e.target.parentElement.firstElementChild;
    e.preventDefault();
    elem.type = elem.type === 'text' ? 'password' : 'text';
  }

  if (input) {
   
    if (input.name === fieldName[2]) {
      str = fieldName[2];
      output(input.parentElement.lastElementChild, false);
      input.addEventListener('input', function (e) {
        input.value = input.value.trim();
        data.password = e.target.value;
        if (input.value.length) {
          output(input.parentElement.lastElementChild, true);
        }
      });
    }


    input.addEventListener('focus', function() {
        console.log('focus');
    })


    input.addEventListener('blur', function () {
      const bool = input.value.trim().length;
      input.value = input.value.trim();

      if (this.name == fieldName[0]) {
        data.name = input.value;
        str = fieldName[0];
      }
      if (input.name === fieldName[2]) {
        data.password = input.value;
        str = fieldName[2];
      }

      output(input.parentElement.lastElementChild, bool);
    });
  }
}

function output(el, bool) {
  if (bool) {
    el.previousElementSibling.innerHTML = '';
    el.innerHTML = success;
  } else {
    let error = `<img src="./images/error.svg" alt="Error" />
  A ${str} is required`;
    el.previousElementSibling.innerHTML = error;
    el.innerHTML = '';
  }
}

form.addEventListener('click', validate);
