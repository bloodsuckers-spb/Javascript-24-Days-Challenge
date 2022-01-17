const contentCapture = document.querySelector('.content');
const listOfEpisodes = document.querySelectorAll('input');

const checkedBoxes = new Array(10).fill(false);

let firstIndex = 0;
let lastIndex = 0;

const clearSelection = () => {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else {
    document.selection.empty();
  }
};

const getFirstAndLastIndex = () => {
  firstIndex = checkedBoxes.findIndex((el) => el === true);
  lastIndex = checkedBoxes.findLastIndex((el) => el === true);
};

const setCheckboxUnchecked = (el, i) => {
  el.checked = false;
  checkedBoxes[i] = false;
  getFirstAndLastIndex();
};

const setCheckboxActive = (event, el, i) => {
  el.checked = true;
  checkedBoxes[i] = true;
  getFirstAndLastIndex();
  if (event.shiftKey) {
    while (firstIndex < lastIndex) {
      listOfEpisodes[firstIndex].checked = true;
      checkedBoxes[firstIndex] = true;
      firstIndex++;
    }
  }
};

const defineCheckboxesState = (e) => {
  clearSelection();
  const checkbox = e.target.closest('input[type="checkbox"]');
  if (!checkbox) return;
  const currentIndex = e.target.dataset.index;
  if (checkedBoxes[currentIndex]) {
    setCheckboxUnchecked(checkbox, currentIndex);
  } else {
    setCheckboxActive(e, checkbox, currentIndex);
  }
};

contentCapture.addEventListener('click', defineCheckboxesState);
