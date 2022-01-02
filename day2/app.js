const menuItems = [
  {
    name: 'French Fries with Ketchup',
    price: 2.23,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 0,
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
    count: 0,
  },
];

const menu = document.querySelector('.wrapper .menu');
const cart = document.querySelector('.cart');
const cartSummary = cart.querySelector('.cart-summary');
const subtotal = cart.querySelector('.totals .subtotal');
const tax = cart.querySelector('.totals .tax');
const full = cart.querySelector('.totals .total .total');
const empty = cart.querySelector('.empty');
const arrowImg = '<img src="images/chevron.svg" />';
let instanceAmount = 0;

class Cart {
  
  constructor(instance, btn) {
    ++instanceAmount;
    this.instance = instance.cloneNode(true);
    this.index = instance.dataset.ind;
    this.btn = btn;
    this.quantityOutput = this.createElement('div', 'quantity');
    this.imgQuantityOutput = this.createElement('div', 'quantity');
    this.instancePriceOutput = this.createElement('div', 'subtotal')
    this.addButtonSwitcher();
    this.emptyCartNotification();
    this.renderItem();
    this.increaseQuantity();
    this.renderPriceAndQuantity();
    this.bindEvents();
  }

  createElement(type, className, str) {
    const el = document.createElement(type);
    el.classList.add(className);
    if (str) {
      el.innerHTML = str;
    }
    return el;
  }

  pricePrettier(el, val) {
    el.textContent = `$` + val.toFixed(2);
  }

  subtotalPrice(arr) {
    return arr
      .filter((el) => el.count > 0)
      .map((el) => el.price * el.count)
      .reduce((el, acc) => {
        return acc + el;
      }, 0);
  }

  emptyCartNotification() {
    empty.textContent = instanceAmount ? '' : 'Your cart is empty.';
  }

  addButtonSwitcher() {
    if (!this.btn.classList[1]) {
      this.btn.classList.add('in-cart');
      this.btn.innerHTML = `<img src="images/check.svg" alt="Check" />
      In Cart`;
    } else {
      this.btn.classList.remove('in-cart');
      this.btn.innerHTML = 'Add to Cart';
    }
  }

  renderItem() {
    const quantityWrapper = this.createElement('div', 'quantity__wrapper');
    const decrease = this.createElement('button', 'decrease', arrowImg);
    const increase = this.createElement('button', 'increase', arrowImg);
    this.instance.querySelector('button').remove();
    quantityWrapper.append(decrease, this.quantityOutput, increase);
    this.instance.append(quantityWrapper, this.instancePriceOutput);
    this.instance.children[0].append(this.imgQuantityOutput);
    cartSummary.append(this.instance);
  }

  deleteItem() {
    this.instance.remove();
    --instanceAmount;
    this.addButtonSwitcher();
    this.emptyCartNotification();
  }

  increaseQuantity() {
    this.quantity = ++menuItems[this.index].count;
  }

  decreaseQuantity() {
    this.quantity = --menuItems[this.index].count;
    if (!this.quantity) {
      this.deleteItem();
    }
  }

  renderPriceAndQuantity() {
    this.instancePrice = this.quantity * menuItems[this.index].price;
    this.subtotal = this.subtotalPrice(menuItems);
    this.taxValue = this.subtotal * 0.0975;
    this.fullPrice = this.subtotal + this.taxValue;
    this.quantityOutput.textContent = this.quantity;
    this.imgQuantityOutput.textContent = this.quantity;
    this.pricePrettier(this.instancePriceOutput, this.instancePrice);
    this.pricePrettier(subtotal, this.subtotal);
    this.pricePrettier(tax, this.taxValue);
    this.pricePrettier(full, this.fullPrice);
  }

  bindEvents() {
    this.instance.addEventListener('click', (e) => {
      const arrow = e.target.closest('button');
      if (arrow) {
        if (arrow.classList[0] === 'increase') {
          this.increaseQuantity();
        }
        if (arrow.classList[0] === 'decrease') {
          this.decreaseQuantity();
        }
        this.renderPriceAndQuantity();
      }
    });
  }
}

const addItem = (e) => {
  if (e.target.closest('.add')) {
       new Cart(e.target.closest('.item'), e.target);
  } 
};

menu.addEventListener('click', addItem);