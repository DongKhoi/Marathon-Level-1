let listData = [];

async function loadData() {
    await axios.get('/getdata').then(response => {
        const data = response.data
        data.forEach((item, index) => {
            listData.push(item);
        })
        displayProductDetail();
    })
    .catch(error => {
        console.log('Có lỗi!', error);
    })
};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

function displayProductDetail() {
    if(productId) {
        const product = listData.find(item => item.id.toString() === productId);
        if(product) {
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-img').src = product.image;
            //document.getElementById('product-title').textContent = product.title;
        } else {
            alert('không tìm thấy sản phẩm !')
        }
    }
}

document.getElementById("add-to-cart").addEventListener("click", function() {
    if (productId) {
        const product = listData.find(item => item.id == productId)
        if (product) {
            const cart = JSON.parse(localStorage.getItem("cart")) || []
            const quantityInput = document.getElementById("product-quantity")
            let quantity = parseInt(quantityInput.value)

            const existingProduct = cart.find(item => item.id === productId)
            if (existingProduct) {
                existingProduct.quantity += quantity; //=<chỉ cần cộng 1
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity, // nếu chưa có thì mặc định là 1
                })
            }
            localStorage.setItem("cart", JSON.stringify(cart))

            alert("Sản phẩm đã được thêm vào giỏ hàng")
        } else {
            alert("Không tìm thấy sản phẩm")
        }
    }
})

loadData()
