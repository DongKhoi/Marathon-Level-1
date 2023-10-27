document.getElementById("addtocart").addEventListener("click", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");
  if (productId) {
    const product = listData.find(item => item.id.toString() === productId);
    if (product) {
      const quantity = parseInt(document.getElementById("quantity").value); 

      // Kiểm tra số lượng hợp lệ
      if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng không hợp lệ!");
        return;
      }

      // Lấy danh sách giỏ hàng từ local storage (nếu tồn tại)
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existProduct = cartItems.find(x => x.id.toString() === productId)
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      if (existProduct) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cộng thêm số lượng
        existProduct.quantity += quantity;
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào danh sách
        cartItems.push({
          id: productId,
          name: product.name,
          price: product.price,
          image: product.img,
          quantity: quantity
        }) 
      }

      // Lưu đối tượng giỏ hàng vào local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Thông báo thành công
      alert("Sản phẩm đã được thêm vào giỏ hàng!");

    } else {
      alert("Không tìm thấy sản phẩm!");
    }
  }
});