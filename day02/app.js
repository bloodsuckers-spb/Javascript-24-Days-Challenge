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

class Cart {
  
  static instanceAmount = 0;
  static subtotal = 0;
  static tax = 0;
  static total = 0;

  constructor(btn) {
    this.btn = btn;
    this.index = btn.dataset.ind;
    this.amount = ++menuItems[this.index].count;
    this.price = menuItems[this.index].price;
    ++Cart.instanceAmount;

    this.renderItem();
    this.addButtonSwitcher();
    this.emptyCartNotification();
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
    empty.textContent = Cart.instanceAmount ? '' : 'Your cart is empty.';
  }

  addButtonSwitcher() {
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

  renderItem() {
    const li = this.createElement('li', 'item');
    const plate = this.createElement('div', 'plate');
    const content = this.createElement('div', 'content');
    const menuItem = this.createElement(
      'div',
      'menu-item',
      menuItems[this.index].name
    );
    const price = this.createElement('div', 'price', this.price);
    const img = Object.assign(this.createElement('img', 'content'), {
      src: 'images/' + menuItems[this.index].image,
      alt: menuItems[this.index].alt,
    });
    const quantityWrapper = this.createElement('div', 'quantity__wrapper');
    const decrease = this.createElement('button', 'decrease', arrowImg);
    const increase = this.createElement('button', 'increase', arrowImg);
    const subtotal = this.createElement('div', 'subtotal');
    const quantity = this.createElement('div', 'quantity');
    const quantityImg = this.createElement('div', 'quantity');
    plate.append(quantityImg, img);
    content.append(menuItem, price);
    quantityWrapper.append(decrease, quantity, increase);
    li.append(plate, content, quantityWrapper, subtotal);
    cartSummary.append(li);
    
    this.instance = li;
    this.instanceSubtotalOutput = subtotal;
    this.instanceAmountOutput = quantity;
    this.instanceAmountOutputImg = quantityImg;

    this.renderPriceAndQuantity();
    this.bindEvents();
  }

  deleteItem() {
    this.instance.remove();
    this.addButtonSwitcher();
    --Cart.instanceAmount;
    if (!Cart.instanceAmount) {
      this.emptyCartNotification();
    }
  }

  increaseAmount() {
    this.amount = ++menuItems[this.index].count;
  }

  decreaseAmount() {
    this.amount = --menuItems[this.index].count;
    if (!this.amount) {
      this.deleteItem();
    }
  }

  renderPriceAndQuantity() {
    const subtotalElementPrice = this.amount * this.price;
    Cart.subtotal += subtotalElementPrice;
    Cart.tax += subtotalElementPrice * 0.0975;
    Cart.total = Cart.subtotal + Cart.tax;

    this.pricePrettier(this.instanceSubtotalOutput, subtotalElementPrice);
    this.pricePrettier(subtotal, Cart.subtotal);
    this.pricePrettier(tax, Cart.tax);
    this.pricePrettier(full, Cart.total);

    this.instanceAmountOutput.textContent = this.amount;
    this.instanceAmountOutputImg.textContent = this.amount;
  }

  bindEvents() {
    this.instance.addEventListener('click', (e) => {
      const arrow = e.target.closest('button');
      if (arrow) {
        if (arrow.classList[0] === 'increase') {
          this.increaseAmount();
        }
        if (arrow.classList[0] === 'decrease') {
          this.decreaseAmount();
        }
        this.renderPriceAndQuantity();
      }
    });
  }
}

const addItem = (e) => {
  if (e.target.closest('.add')) {
    new Cart(e.target);
  }
};

menu.addEventListener('click', addItem);
