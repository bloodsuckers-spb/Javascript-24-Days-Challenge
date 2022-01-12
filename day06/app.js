const range = document.querySelector('.priceRange');
const output = document.querySelector('.dollars');

range.addEventListener('input', (e) => {
  const val = Math.floor(parseFloat(e.target.value / 100));
  const residue = parseFloat(e.target.value % 100);
  output.textContent = `${val}.${residue}`;
});
