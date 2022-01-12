let jiggledBtn;

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const foo = (e) => {
  e.preventDefault();
  const key = e.key.toLowerCase();
  const currentValue = jiggledBtn.textContent.toLowerCase();
  if (key === currentValue) {
    jiggledBtn.classList.remove('jiggle');
    randomKeyJiggle();
  }
};

const randomKeyJiggle = () => {
  const num = randomInteger(0, 52);
  jiggledBtn = document.querySelector(`.key[data-key="${num}"]`);
  jiggledBtn.classList.add('jiggle');
};

document.addEventListener('keydown', foo);
document.addEventListener('DOMContentLoaded', randomKeyJiggle);
