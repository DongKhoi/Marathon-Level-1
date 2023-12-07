//Lấy danh sách sản phẩm từ Local Storage
function getCartFromLocalStorage() {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
}
// Hiển thị danh sách sản phẩm trong giỏ hàng
function displayCartItems() {
    const cart = getCartFromLocalStorage();
    const CartItemsContainers = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price"); //Phần tử hiển thị tổng tiền

    CartItemsContainers.innerHTML = ""; //xóa nội dung hiện  tại của giỏ hàng
    let totalPrice = 0; //Biên để tính tổng tiền
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        //Tạo HTML cho từng sản phẩm trong giỏ hàng
        cartItem.innerHTML = `
       <div class="checkbox">
                <input type="checkbox" class="product-checkbox">
            </div>
            <div class="item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="tensanpham">
                <h>${item.name}</h>
            </div>
            <div class="thongtinsanpham">
                <div class="giatien">
                    <p class="gia" style="font-size: larger;">
                        ${item.price}đ
                    </p>
                </div>
            </div>
            <div class="quantity">
                <button class="quantity-button subtract" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input" />
                <button class="quantity-button add" data-id="${item.id}">+</button>
            </div>
            <div class="delete">
                <button class="remove-from-cart" data-index="${item.id}">Xóa</button>
            </div>
    `;
        const productTotal = item.price * item.quantity;
        totalPrice += productTotal;
        CartItemsContainers.appendChild(cartItem);
    });
    // Cập nhật tổng tiền lên trang
    totalPriceElement.textContent = totalPrice.toFixed(2) + "đ";

    //Thêm sự kiện click cho nút "Xóa" trong hàm displayCartItems
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute("data-index");

            //Xóa sản phẩm từ giỏ hàng dựa tren ID
            const updateCart = cart.filter(item => item.id !== productId);

            //Cập nhật local storage với giỏ hàng đã cập nhật
            localStorage.setItem("cart", JSON.stringify(updateCart));

            //Cập nhật giao diện
            displayCartItems();
        });
    });
    // Thêm sự kiện click cho nút "Add" và "Subtract"
    const addButtons = document.querySelectorAll(".quantity-button.add");
    const subtractButtons = document.querySelectorAll(".quantity-button.subtract");

    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute("data-id");
            const updatedCart = cart.map(item => {
                if (item.id === productId) {
                    if (item.quantity < 10) {
                        item.quantity += 1;
                    }
                }
                return item;
            });

            // Cập nhật local storage với giỏ hàng đã cập nhật
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // Cập nhật giao diện
            displayCartItems();
        });
    });
    subtractButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute("data-id");
            const updateCart = cart.map(item => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    }
                }
                return item;
            });
            //Cập nhật local storage với giỏ hàng đã cập nhật
            localStorage.setItem("cart", JSON.stringify(filterCart));

            //Cập nhật giao diện 
            displayCartItems();
        });
    });
}
//Gọi hàm để hiển thị danh sách từ giỏ hàng
displayCartItems();