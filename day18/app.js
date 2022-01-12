const wrapper = document.querySelector('.wrapper');
const passOutput = wrapper.querySelector('.text-output');
const rangeOutput = wrapper.querySelector('.range-output');

const data = {
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  symbols: ['@', '#', '$', '%'],
  lowercase: ['A', 'B', 'C', 'L', 'D', 'O'],
  uppercase: ['a', 'i', 'c', 'd'],
};

const similarCharacters = {
  i: ['l', '1', 'L'],
  l: ['i', '1', 'L'],
  1: ['i', 'l', 'L'],
  L: ['i', 'l', '1'],
  o: ['0', 'O'],
  0: ['o', 'O'],
  O: ['o', '0'],
};

const conditions = [
  {
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
  },
  {
    similar: true,
  },
];

const dataFiltered = { ...data };
let passwordLength = 12;

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const passwordOutput = (arg) => {
  passOutput.value = arg ? arg.join('') : 'Error';
};

const generatePassword = () => {
  const password = [];
  const dataArray = Object.values(dataFiltered).flat();

  if (!dataArray.length) {
    passwordOutput();
    return;
  }

  for (let i = 0; i < passwordLength; i++) {
    const index = randomInteger(0, dataArray.length - 1);
    password.push(dataArray[index]);
  }

  if (conditions[1]) {
    const values = Object.keys(similarCharacters);
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      if (password.includes(val)) {
        for (let k = 0; k < similarCharacters[val].length; k++) {
          const val2 = similarCharacters[val][k];
          if (password.includes(val2)) {
            generatePassword();
          }
        }
      }
    }
  }
  passwordOutput(password);
};

const dataInit = () => {
  Object.entries(data).forEach((el) => {
    dataFiltered[el[0]] = el[1];
  });
  for (let objKey in conditions[0]) {
    if (!conditions[0][objKey]) {
      delete dataFiltered[objKey];
    }
  }
  generatePassword();
};

const rangeChange = (e) => {
  passwordLength = e.target.value;
  rangeOutput.textContent = e.target.value;
  generatePassword();
};

const copyProcess = (el) => {
  el.classList.add('copied');
  passOutput.select();
  document.execCommand('copy');
  setTimeout(() => {
    el.classList.remove('copied');
  }, 5000);
};

const contentOnclick = (e) => {
  if (e.target.closest('.characters-checkbox')) {
    const key = e.target.name;
    conditions[0][key] = e.target.checked;
    dataInit();
    return;
  }

  if (e.target.closest('.similar-checkbox')) {
    const key = e.target.name;
    conditions[1][key] = e.target.checked;
    generatePassword();
    return;
  }

  if (e.target.closest('.range-input')) {
    rangeChange(e);
    e.target.addEventListener('input', rangeChange);
    return;
  }

  if (e.target.closest('.copy-btn')) {
    copyProcess(e.target.closest('.copy-btn'));
    return;
  }
};

wrapper.addEventListener('click', contentOnclick);
document.addEventListener('DOMContentLoaded', generatePassword);
