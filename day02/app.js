const data = [
  {
    name: 'French Fries with Ketchup',
    price: 2.23,
    imgSrc: 'plate__french-fries.png',
    imgAlt: 'French Fries',
  },
  {
    name: 'Salmon and Vegetables',
    price: 5.12,
    imgSrc: 'plate__salmon-vegetables.png',
    imgAlt: 'Salmon and Vegetables',
  },
  {
    name: 'Spaghetti with Meat Sauce',
    price: 7.82,
    imgSrc: 'plate__spaghetti-meat-sauce.png',
    imgAlt: 'Spaghetti with Meat Sauce',
  },
  {
    name: 'Bacon, Eggs, and Toast',
    price: 5.99,
    imgSrc: 'plate__bacon-eggs.png',
    imgAlt: 'Bacon, Eggs, and Toast',
  },
  {
    name: 'Chicken Salad with Parmesan',
    price: 6.98,
    imgSrc: 'plate__chicken-salad.png',
    imgAlt: 'Chicken Salad with Parmesan',
  },
  {
    name: 'Fish Sticks and Fries',
    price: 6.34,
    imgSrc: 'plate__fish-sticks-fries.png',
    imgAlt: 'Fish Sticks and Fries',
  },
];

const menuField = document.querySelector('.wrapper .menu');
const cartSummaryOutput = document.querySelector('.cart-summary');
const priceOutput = document.querySelector('.totals');
const emptyCartCaption = document.querySelector('.empty');

class Cart {
  static state = {
    instanceAmount: 0,
    priceBeforeTax: 0,
    fullTax: 0,
    fullPrice: 0,
  };

  constructor(btn, menuItem) {
    this.btn = btn;
    this.name = menuItem['name'];
    this.imgSrc = menuItem['imgSrc'];
    this.imgAlt = menuItem['imgAlt'];
    this.price = menuItem['price'];
    this.subtotalPrice = menuItem['price'];
    this.amount = 1;
    this.init();
  }

  setCartCaption() {
    emptyCartCaption.textContent = Cart.state.instanceAmount
      ? ''
      : 'Your cart is empty.';
  }

  setBtnState() {
    if (!this.btn.classList[1]) {
      this.btn.classList.add('in-cart');
      this.btn.innerHTML = `<img src="images/check.svg" alt="Check" />
      In Cart`;
      this.btn.disabled = true;
    } else {
      this.btn.classList.remove('in-cart');
      this.btn.innerHTML = 'Add to Cart';
      this.btn.disabled = false;
    }
  }

  init() {
    ++Cart.state.instanceAmount;
    this.setBtnState();
    this.setCartCaption();
    this.calculateFullPrice();
    this.renderItem();
    this.renderMarkup();
    this.renderFullPrice();
    this.bindEvents();
  }

  renderItem() {
    const li = document.createElement('li');
    cartSummaryOutput.append(li);
    this.instance = li;
  }

  renderMarkup() {
    const markup = `
      <div class="plate">
        <img src="images/${this.imgSrc}" alt="${this.imgAlt}">
        <div class="quantity">${this.amount}</div>
      </div>
      <div class="content">
        <p class="menu-item">${this.name}</p>
        <p class="price">$${this.price}</p>
      </div>
      <div class="quantity__wrapper">
      <button class="decrease"><img src="images/chevron.svg" /></button>
      <div class="quantity">${this.amount}</div>
      <button class="increase"><img src="images/chevron.svg" /></button>
      </div><div class="subtotal">$${this.subtotalPrice}</div>
    `;

    this.instance.innerHTML = markup;
  }

  deleteItem() {
    this.instance.remove();
    this.setBtnState();
    --Cart.state.instanceAmount;
    if (!Cart.state.instanceAmount) {
      this.setCartCaption();
    }
  }

  increaseAmount() {
    ++this.amount;
  }

  decreaseAmount() {
    --this.amount;
    if (!this.amount) {
      this.deleteItem();
    }
  }

  calculateFullPrice() {
    const pricePrettier = (val) => Math.round(parseFloat(val) * 100) / 100;
    const subtotalPrice = this.amount * this.price;
    const priceBeforeTax = Cart.state.priceBeforeTax;
    const fullTax = Cart.state.fullTax;
    this.subtotalPrice = pricePrettier(subtotalPrice);
    Cart.state.priceBeforeTax = pricePrettier(
      priceBeforeTax + this.subtotalPrice
    );
    Cart.state.fullTax = pricePrettier(fullTax + this.subtotalPrice * 0.0975);
    Cart.state.fullPrice = pricePrettier(
      Cart.state.fullTax + Cart.state.priceBeforeTax
    );
  }

  renderFullPrice() {
    const markup = `<div class="line-item">
      <div class="label">Subtotal:</div>
      <div class="amount price subtotal">$${Cart.state.priceBeforeTax}</div>
    </div>
    <div class="line-item">
      <div class="label">Tax:</div>
      <div class="amount price tax">$${Cart.state.fullTax}</div>
    </div>
    <div class="line-item">
      <div class="label">Total:</div>
      <div class="amount price total">$${Cart.state.fullPrice}</div>
    </div>`;

    priceOutput.innerHTML = markup;
  }

  handleClick(e) {
    const arrow = e.target.closest('button');
    if (arrow) {
      if (arrow.classList[0] === 'increase') {
        this.increaseAmount();
      }
      if (arrow.classList[0] === 'decrease') {
        this.decreaseAmount();
      }
      this.calculateFullPrice();
      this.renderMarkup();
      this.renderFullPrice();
    }
  }

  bindEvents() {
    this.instance.addEventListener('click', (e) => this.handleClick(e));
  }
}

const addItem = (e) => {
  if (e.target.closest('.add')) {
    const btn = e.target;
    const index = btn.dataset.ind;
    new Cart(btn, data[index]);
  }
};

menuField.addEventListener('click', addItem);
