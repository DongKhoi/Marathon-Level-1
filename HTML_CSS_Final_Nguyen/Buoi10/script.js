var shopName = $("#shopName");
var loggedInAccount = "loggedInAccount";
var loginHref = $("#loginHref");

var cartList = "cartList";

$("document").ready(function () {
  var searchButton = $("#search-button");
  var searchInput = $("#search-input");
  searchButton.on("click", function (event) {
    alert("Bạn đã tìm kiếm: " + searchInput.val());
  });

  var deleteButton = $("#delete-btn");
  var itemContainer = $("#item-container");
  deleteButton.on("click", function (event) {
    event.preventDefault();
    itemContainer.hide();
    $("#number").html("0");
  });

  var MyProgress = $("#MyProgress");
  $("#button-pay").on("click", function (event) {
    $("#MyProgressContainer").removeClass("d-none");
    $(this).addClass("d-none");
    var count = 0;
    var interval = setInterval(function () {
      count = count + 1;
      MyProgress.css("width", count + "%");
      $("#MyProgressContainer").attr("aria-valuenow", count);
      MyProgress.html(count + "%");

      if (count > 100) {
        $("#MyProgressContainer").addClass("d-none");
        $("#button-pay").removeClass("d-none");
        MyProgress.css("width", "0%");
        $("#MyProgressContainer").attr("aria-valuenow", 0);
        alert("Đã thanh toán thành công");
        clearInterval(interval);
      }
    }, 1000);
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
});

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

var loadCart = function () {
  if (localStorage.getItem(cartList)) {
    const data = JSON.parse(localStorage.getItem(cartList));
    // console.log(data);
    var innerHTML = "";
    var totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      totalPrice += parseFloat(data[i].price) * parseFloat(data[i].quantity);
      var prePrice = (parseFloat(data[i].price) + 1).toString();
      innerHTML += ` <div class="cart-item">
      <div id="item-img-container">
          <input type="checkbox">
          <img src="../Buoi8/src/${data[i].image}" alt="img">
      </div>
      <div>   
          <p class="center-vertical" id="item-name">${data[i].name}</p>
      </div>
      <div>
          <p class="center-vertical" id="item-price"><span class="midd-line"><span
                      class="underline">đ</span>${prePrice}</span><span class="underline">đ</span>${data[i].price}</p>
      </div>
      <div id="amount-input-container">
          <button>-</button>
          <input type="text" value="${data[i].quantity}">
          <button>+</button>
      </div>
      <div id="delete-container">
          <button id="delete-btn">Xóa</button>
      </div>
  </div>`;
    }
    var formItemContainer = document.getElementById("form-item-container");
    document.getElementById("total-price").innerText = totalPrice
      .toFixed(2)
      .toString();
    formItemContainer.innerHTML = innerHTML;
  }
};

getLoggedInAccount();
loadCart();
