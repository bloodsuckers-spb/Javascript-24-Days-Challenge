const userPickOutput = document.querySelector('.your-pick');
const computerPickOutput = document.querySelector('.computer-pick');
const btn = document.querySelector('.play-again');

const showResult = () => {
  const userValue = localStorage.getItem('user-value');
  const computerValue = localStorage.getItem('pc-value');
  const winner = localStorage.getItem('winner');
  const userOutput = `<img src="./images/${userValue}.png" alt="${userValue}" />`;
  const computerOutput = `<img src="./images/${computerValue}.png" alt="${computerValue}" />`;
  const title = winner === 'PC' ? 'computer-wins' : 'you-win';
  document.body.classList.add(title);
  userPickOutput.insertAdjacentHTML('beforeend', userOutput);
  computerPickOutput.insertAdjacentHTML('beforeend', computerOutput);
};

btn.addEventListener('click', () => {
  window.open('index.html', '_self', false);
});

document.addEventListener('DOMContentLoaded', showResult);
