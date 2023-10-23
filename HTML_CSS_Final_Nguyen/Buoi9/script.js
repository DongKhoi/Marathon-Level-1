var searchButton = $("#search-button");
var searchInput = $("#search-input");
var chatNowBtn = $("#button-chatNow");
var shopName = $("#shopName");
var loggedInAccount = "loggedInAccount";
var loginHref = $("#loginHref");
searchButton.on("click", function (event) {
  alert("Bạn đã tìm kiếm: " + searchInput.val());
});
chatNowBtn.on("click", function (event) {
  $("#exampleModalLabel").html(shopName.html());
});

var popList = $("#pop-list");
var headerShopContainer = $("#header-shop-container");
headerShopContainer.on("mouseenter", function (event) {
  headerShopContainer.attr("aria-expanded", "true");
  headerShopContainer.addClass("show");
  popList.attr("data-bs-popper", "static");
  popList.addClass("show");
});
headerShopContainer.on("mouseleave ", function (event) {
  headerShopContainer.attr("aria-expanded", "false");
  headerShopContainer.removeClass("show");
  popList.removeAttr("data-bs-popper");
  popList.removeClass("show");
});
popList.on("mouseenter", function (event) {
  headerShopContainer.attr("aria-expanded", "true");
  headerShopContainer.addClass("show");
  popList.attr("data-bs-popper", "static");
  popList.addClass("show");
});
popList.on("mouseleave ", function (event) {
  headerShopContainer.attr("aria-expanded", "false");
  headerShopContainer.removeClass("show");
  popList.removeAttr("data-bs-popper");
  popList.removeClass("show");
});

var getProductByID = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("index");
  axios.get("http://localhost:3000/getListItems").then((rs) => {
    const data = rs.data;
    var productInfo;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == productId) {
        productInfo = data[i];
        break;
      }
    }
    var imgItem = document.getElementById("img-item");
    imgItem.setAttribute("src", "../Buoi8/src/" + productInfo.image);
    console.log("../Buoi8/src/" + data.image);
    var itemInfoContainer = document.getElementById("item-info-container");
    itemInfoContainer.innerHTML = `<h3 >${productInfo.name}</h3>
    <p id="price"><span class="underline-span">đ</span>54500-<span class="underline-span">đ</span>${productInfo.price}</p>
    <p id="item-description">Điện thoại thông minh , độ bền ngang kim cương . Chức năng nghe , gọi và chọi  </p>
    <p>NGUYEN-PHONE MASTER</p>
    <p class="bold">Mã giảm giá: <span id="discount">ABC123</span></p>
    <p id="item-delivery"><span  class="bold">Vận chuyển</span>
        : Miễn phí</p>
        <form action="">
            <p class="bold amount">Số lượng: </p>
            <div class="amount"><input class="amount" type="number" value="1"></div>
        </form>
    <div id="button-container">
        <a href="../Buoi10/cart.html"><button id="button-addToCart">
            <i class="fa-solid fa-cart-shopping" style="color: #eb5f14;"></i>
            Thêm vào giỏ hàng</button></a>
        <button id="button-buy">Mua hàng</button>
    </div>`;
  });
};

var getLoggedInAccount = function () {
  if (localStorage.getItem(loggedInAccount)) {
    var shopName = document.getElementById("ShopName");
    shopName.innerText =
      "Xin chào " + JSON.parse(localStorage.getItem(loggedInAccount));
    loginHref.addClass("d-none");
  } else {
    var shopContainer = $("#shopContainer");
    shopContainer.addClass("d-none");
    loginHref.removeClass("d-none");
  }
};

var LogOut = function () {
  localStorage.removeItem(loggedInAccount);
  window.location.href = "../Buoi8/home.html";
};

getLoggedInAccount();
getProductByID();
