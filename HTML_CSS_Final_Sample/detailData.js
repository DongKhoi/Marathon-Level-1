let listData = [];
 
async function loadData() {
    await axios.get('/getData').then(response => {
        const data = response.data;
        data.forEach((item, index) => {
            listData.push(item);
        });
        displayProductDetails()
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}
function displayProductDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("index");
    if (productId)
    {
        const product = listData.find(item => item.id == productId);
        if (product) {
            // Sử dụng dữ liệu sản phẩm tìm thấy để cập nhật trang detail.html
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = product.price + "$";
            document.getElementById("product-image").src = product.image;
            // Cập nhật thông tin khác tại đây
        } else {
            // Xử lý trường hợp sản phẩm không tồn tại
            alert("Không tìm thấy sản phẩm.");
        }
    }
}

document.getElementById("add-to-cart").addEventListener("click", function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("index");
    if (productId) {
        const product = listData.find(item => item.id == productId);
        if (product) {
            const cart = JSON.parse(localStorage.getItem("cart")) || []; // Lấy giỏ hàng từ localStorage

            const quantityInput = document.getElementById("product-quantity");
            let quantity = parseInt(quantityInput.value); // Parse input value to ensure it's a number

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, tăng quantity lên 1
                existingProduct.quantity += quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                });
            }

            // Lưu lại giỏ hàng đã cập nhật vào localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Thông báo cho người dùng sản phẩm đã được thêm vào giỏ hàng
            alert("Sản phẩm đã được thêm vào giỏ hàng.");
        } else {
            alert("Không tìm thấy sản phẩm.");
        }
    }
});

loadData();