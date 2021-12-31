const menuItems = [
  {
    name: 'French Fries with Ketchup',
    price: 2.23,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 2,
  },
  {
    name: 'Salmon and Vegetables',
    price: 5.12,
    image: 'plate__salmon-vegetables.png',
    alt: 'Salmon and Vegetables',
    count: 0,
  },
  {
    name: 'Spaghetti with Meat Sauce',
    price: 7.82,
    image: 'plate__spaghetti-meat-sauce.png',
    alt: 'Spaghetti with Meat Sauce',
    count: 0,
  },
  {
    name: 'Bacon, Eggs, and Toast',
    price: 5.99,
    image: 'plate__bacon-eggs.png',
    alt: 'Bacon, Eggs, and Toast',
    count: 0,
  },
  {
    name: 'Chicken Salad with Parmesan',
    price: 6.98,
    image: 'plate__chicken-salad.png',
    alt: 'Chicken Salad with Parmesan',
    count: 0,
  },
  {
    name: 'Fish Sticks and Fries',
    price: 6.34,
    image: 'plate__fish-sticks-fries.png',
    alt: 'Fish Sticks and Fries',
    count: 1,
  },
];

const menu = document.querySelector('.menu');
const cart = document.querySelector('.cart');
const totals = cart.querySelector('.totals');
const cartSummary = cart.querySelector('.cart-summary');
const subtotal = totals.querySelector('.subtotal');
const tax = totals.querySelector('.tax');
const total = totals.querySelector('.total .total');
const quantityWrapperTemplate = cart.querySelector('.quantity__wrapper');

const inCartString = `<img src="images/check.svg" alt="Check" />
In Cart`;
const addtoCartString = 'Add to Cart';

const createElement = (type, className) => {
  const el = document.createElement(type);
  el.classList.add(className);
  return el;
};

const totalPriceOutput = (el, val) => {
  el.textContent = `$` + val.toFixed(2);
};

const emptyCartNotification = () => {
  const p = createElement('p', 'empty');
  p.textContent = `Your cart is empty.`;
  cartSummary.prepend(p);
};

const fullSubTotalPrice = () => {
  return menuItems
    .filter((el) => el.count > 0)
    .map((el) => el.price * el.count)
    .reduce((el, acc) => {
      return acc + el;
    }, 0);
};

const renderTotalPrice = () => {
  const subtotalValue = fullSubTotalPrice();
  const taxValue = subtotalValue * 0.0975;
  if (!subtotalValue) emptyCartNotification();
  totalPriceOutput(subtotal, subtotalValue);
  totalPriceOutput(tax, taxValue);
  totalPriceOutput(total, taxValue + subtotalValue);
};

const createItem = (el, ind) => {
  const li = el.cloneNode(true);
  const quantityWrapper = quantityWrapperTemplate.cloneNode(true);
  const quantity = createElement('div', 'quantity');
  const subtotal = createElement('div', 'subtotal');
  const [plate, content] = li.children;
  content.lastElementChild.remove();
  quantity.textContent = ++menuItems[ind].count;
  subtotal.textContent = `$${menuItems[ind].count * menuItems[ind].price}`;
  li.append(quantityWrapper, subtotal);
  plate.append(quantity);
  return li;
};

const deleteItem = (el, ind) => {
  const btn = menu.querySelector(`[data-ind = "${ind}"] .in-cart`);
  el.remove();
  btn.classList.remove('in-cart');
  btn.classList.add('add');
  btn.innerHTML = addtoCartString;
};

const renderItem = (el, ind) => {
  const quantity = el.querySelectorAll('.quantity');
  const subtotal = el.lastElementChild;
  const subtotalPrice = menuItems[ind].count * menuItems[ind].price;
  quantity.forEach((el) => {
    el.textContent = menuItems[ind].count;
  });
  subtotal.textContent = `$${subtotalPrice.toFixed(2)}`;
};

const addToCard = (e) => {
  const btn = e.target.closest('.add');

  if (btn) {
    const target = e.target.closest('li');
    const index = target.dataset.ind;
    const li = createItem(target, index);
    btn.classList.remove('add');
    btn.classList.add('in-cart');
    btn.innerHTML = inCartString;
    if (cart.querySelector('.empty')) {
      cart.querySelector('.empty').replaceWith(li);
    } else {
      cartSummary.append(li);
    }
    renderTotalPrice();
  }
};

const cartOnclick = (e) => {
  const arrow = e.target.closest('button');

  if (arrow) {
    const target = e.target.closest('li');
    const ind = target.dataset.ind;
    if (arrow.classList[0] === 'increase') {
      ++menuItems[ind].count;
      renderItem(target, ind);
    }
    if (arrow.classList[0] === 'decrease') {
      --menuItems[ind].count;
      !menuItems[ind].count ? deleteItem(target, ind) : renderItem(target, ind);
    }
    renderTotalPrice();
  }
};

menu.addEventListener('click', addToCard);
cart.addEventListener('click', cartOnclick);
