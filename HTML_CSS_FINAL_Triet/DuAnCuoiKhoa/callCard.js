let listData = [];

const cartDataJson = localStorage.getItem("cart");
const cartData = JSON.parse(cartDataJson) || [];
if (cartData) {
  listData = [...cartData];
  console.log(listData);
}

function calculator() {
  let totalPrice = 0;
  listData.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
  });
  return totalPrice;
}

function loadData() {
  const cartContainer = document.getElementById('cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  cartContainer.innerHTML = "";

  listData.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="cart-item-image">
          <div class="checkbox">
              <input type="checkbox" class="product-checkbox" />
          </div>
          <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="nameProduct">
          <h2>${item.name}</h2>
      </div>
      <div class="cart-item-info">
          <div class="price">
              <p>
                  ₫ ${item.price}
              </p>
          </div>
      </div>
      <div class="quantity">
          <button class="quantity-button subtract" data-id="${item.id}">-</button>
          <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input" />
          <button class="quantity-button add" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-actions">
          <button class="remove-from-cart" data-index="${item.id}">Xóa</button>
      </div>
  `;
  cartContainer.appendChild(cartItem);
  });

  const totalPrice = calculator();
  totalPriceElement.textContent = `₫${totalPrice}`;
}

function saveData() {
  localStorage.setItem("cart", JSON.stringify(listData));
}

function removeItemFromCart(itemId) {
  listData = listData.filter(item => item.id !== itemId);
  saveData();
}

function updateQuantity(itemId, newQuantity) {
  listData.forEach(item => {
    if (item.id === itemId) {
      item.quantity = newQuantity;
    }
  });
  saveData();
}

function handleQuantityButtonClick(e) {
  const itemId = e.target.dataset.id;
  const inputElement = e.target.parentElement.querySelector('.quantity-input');
  let newQuantity = parseInt(inputElement.value);

  if (e.target.classList.contains('subtract')) {
    newQuantity = Math.max(1, newQuantity - 1);
  } else if (e.target.classList.contains('add')) {
    newQuantity = Math.min(10, newQuantity + 1);
  }

  inputElement.value = newQuantity;
  updateQuantity(itemId, newQuantity);
}

function handleRemoveButtonClick(e) {
  const itemId = e.target.dataset.index;
  removeItemFromCart(itemId);
  e.target.closest(".cart-item").remove();
}

function handleCheckoutButtonClick() {
  const totalPrice = calculator();

  const users = JSON.parse(localStorage.getItem("users")) || [];
const username = localStorage.getItem("name");
const user = users.find(user => user.username === username);
console.log(user, username);
const balance = user.balance || 0;
console.log(totalPrice, balance);

if (totalPrice <= balance) {
  alert("Thanh toán thành công!");
  

  const orderKey = "order";
  let orderValue = parseInt(localStorage.getItem(orderKey) || 0);
  orderValue++;
  localStorage.setItem(orderKey, orderValue);


  localStorage.removeItem("cart");
} else {
  alert("Thanh toán thất bại. Số dư không đủ!");
}
 }


document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("remove-from-cart")) {
    handleRemoveButtonClick(e);
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("quantity-button")) {
    handleQuantityButtonClick(e);
  }
});

document.getElementById("checkout").addEventListener("click", handleCheckoutButtonClick);


loadData();