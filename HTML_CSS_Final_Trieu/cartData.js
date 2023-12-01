function getCartFromLocalStorage() {
    const cartData = localStorage.getItem("cart")
    return cartData ? JSON.parse(cartData) : []
}

function displayCartItems() {
    const cart = getCartFromLocalStorage()
    const cartItemsContainer = document.querySelector(".cart-item")
    const totalPriceElement = document.getElementById("total-price")

    cartItemsContainer.innerHTML = ""
    let totalPrice = 0

    cart.forEach(item => {
        const cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")

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
                        ₫${item.price}
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
        `
        cartItemsContainer.appendChild(cartItem)
    })
    
    totalPrice = calculator()
    totalPriceElement.textContent = `₫${totalPrice}`
}

function calculator() {
  let totalPrice = 0;
  listData.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
  });
  return totalPrice;
}
displayCartItems()