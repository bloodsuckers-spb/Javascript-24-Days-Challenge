const wrapper = document.querySelector('.wrapper');
const arr = ['rock', 'paper', 'scissors'];

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const verifyChampion = (userValue, computerValue) => {
  let winner = '';
  const str1 = 'user';
  const str2 = 'PC';
  switch (userValue) {
    case arr[0]:
      winner = computerValue == arr[1] ? str2 : str1;
      break;
    case arr[1]:
      winner = computerValue == arr[0] ? str1 : str2;
      break;
    case arr[2]:
      winner = computerValue == arr[0] ? str2 : str1;
  }
  return winner;
};

const getComputerValue = (userValue) => {
  let computerValue = arr[randomInteger(0, 2)];
  while (userValue === computerValue) {
    computerValue = arr[randomInteger(0, 2)];
  }
  return computerValue;
};

wrapper.addEventListener('click', (e) => {
  const target = e.target.closest('button');

  if (target) {
    const userValue = target.textContent.trim();
    const computerValue = getComputerValue(userValue);
    const winner = verifyChampion(userValue, computerValue);
    localStorage.setItem('winner', winner);
    localStorage.setItem('user-value', userValue);
    localStorage.setItem('pc-value', computerValue);
    window.open('winner.html', '_self', false);
  }
});
