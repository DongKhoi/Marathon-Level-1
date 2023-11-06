document.getElementById("addtocart").addEventListener("click", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");
  if (productId) {
    const product = listData.find(item => item.id.toString() === productId);
    if (product) {
      const quantity = parseInt(document.getElementById("quantity").value); 

      if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng không hợp lệ!");
        return;
      }

      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existProduct = cartItems.find(x => x.id.toString() === productId)
      if (existProduct) {
        existProduct.quantity += quantity;
      } else {
        cartItems.push({
          id: productId,
          name: product.name,
          price: product.price,
          image: product.img,
          quantity: quantity
        }) 
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("Sản phẩm đã được thêm vào giỏ hàng!");

    } else {
      alert("Không tìm thấy sản phẩm!");
    }
  }
});