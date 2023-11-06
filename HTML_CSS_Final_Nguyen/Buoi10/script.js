var shopName = $("#shopName");
var loggedInAccount = "loggedInAccount";
var loginHref = $("#loginHref");
var AccountListName = "AccountListName";

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
      "Xin chào " + JSON.parse(localStorage.getItem(loggedInAccount)).username;
    loginHref.addClass("d-none");
  } else {
    var shopContainer = $("#shopContainer");
    shopContainer.addClass("d-none");
    loginHref.removeClass("d-none");
  }
};

var LogOut = function () {
  localStorage.removeItem(loggedInAccount);
  localStorage.removeItem(cartList);
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
            <div class="item-img-container">
                <input type="checkbox">
                <img src="../Buoi8/src/${data[i].image}" alt="img">
            </div>
            <div class="d-flex align-items-center">   
                <p class="center-vertical item-name">${data[i].name}</p>
            </div>
            <div class="d-flex align-items-center">
                <p class="center-vertical item-price"><span class="midd-line"><span
                            class="underline">đ</span>${prePrice}</span><span class="underline">đ</span>${data[i].price}</p>
            </div>
            <div class="amount-input-container">
                <button class="${data[i].Id}" onclick="minus(event, this)">-</button>
                <input type="text" value="${data[i].quantity}">
                <button class="${data[i].Id}" onclick="add(event,this)">+</button>
            </div>
            <div class="delete-container">
                <button myAtt="${data[i].Id}" class="delete-btn" onclick="del(event, this)">Xóa</button>
            </div>
        </div>`;
    }
    var formItemContainer = document.getElementById("form-item-container");
    document.getElementById("total-price").innerText = totalPrice
      .toFixed(2)
      .toString();
    formItemContainer.innerHTML = innerHTML;
  } else {
    var formItemContainer = document.getElementById("form-item-container");
    formItemContainer.innerHTML = "";
    document.getElementById("total-price").innerText = "0";
  }

};
var add = function (e, btn) {
  e.preventDefault();
  var idProduct = btn.getAttribute("class");
  if (localStorage.getItem(cartList)) {
    var data = JSON.parse(localStorage.getItem(cartList));
    for (let i = 0; i < data.length; i++) {
      if (data[i].Id == idProduct) {
        data[i].quantity += 1;
        break;
      }
    }
    localStorage.setItem(cartList, JSON.stringify(data));
    loadCart();
  }
};

var del = function (e, btn) {
  e.preventDefault();
  var idProduct = btn.getAttribute("myAtt");
  if (localStorage.getItem(cartList)) {
    var data = JSON.parse(localStorage.getItem(cartList));
    for (let i = 0; i < data.length; i++) {
      if (data[i].Id == idProduct) {
        data.splice(i, 1);
        break;
      }
    }
    localStorage.setItem(cartList, JSON.stringify(data));
    loadCart();
  }
};

var minus = function (e, btn) {
  e.preventDefault();
  var idProduct = btn.getAttribute("class");
  if (localStorage.getItem(cartList)) {
    var data = JSON.parse(localStorage.getItem(cartList));
    for (let i = 0; i < data.length; i++) {
      if (data[i].Id == idProduct && data[i].quantity > 1) {
        data[i].quantity -= 1;
        break;
      }
    }
    localStorage.setItem(cartList, JSON.stringify(data));
    loadCart();
  }
};

var AccountInf = function () {
  var loggedAccount = JSON.parse(localStorage.getItem(loggedInAccount));
  document.getElementById("usernameModal").innerText = loggedAccount.username;
  document.getElementById("PayedOrderModal").innerText =
    loggedAccount.orderNumber;
  document.getElementById("AmountOfMoney").innerText =
    loggedAccount.AmountOfMoney;
  document.getElementById("depositAmount").value = 0;
};

var deposit = function () {
  if (parseInt(document.getElementById("depositAmount").value) >= 0) {
    var Account = JSON.parse(localStorage.getItem(loggedInAccount));
    var data = JSON.parse(localStorage.getItem(AccountListName));
    Account.AmountOfMoney =
      parseFloat(Account.AmountOfMoney) +
      parseFloat(document.getElementById("depositAmount").value);
    for (let i = 0; i < data.length; i++) {
      if (data[i].username == Account.username) {
        data[i].AmountOfMoney =
          parseFloat(data[i].AmountOfMoney) +
          parseFloat(document.getElementById("depositAmount").value);
      }
    }
    localStorage.setItem(AccountListName, JSON.stringify(data));
    localStorage.setItem(loggedInAccount, JSON.stringify(Account));
    showNotification("Nạp tiền thành công");
    AccountInf();
  } else {
    showNotification("Số tiền không được âm");
  }
};

var showNotification = function (mess) {
  setTimeout(function () {
    notification.innerText = mess;
    notification.classList.remove("d-none");
    notification.style.opacity = "1";
  }, 100);
  setTimeout(function () {
    notification.classList.add("d-none");
    notification.style.opacity = "0";
  }, 4000);
};

var MyProgress = $("#MyProgress");
$("#button-pay").on("click", function (event) {
  var Account = JSON.parse(localStorage.getItem(loggedInAccount));
  if (
    Account.AmountOfMoney >=
    parseFloat(document.getElementById("total-price").innerText)
  ) {
    if (document.getElementById("total-price").innerText != "0") {
      $("#MyProgressContainer").removeClass("d-none");
      $(this).addClass("d-none");
      var count = 0;
      var interval = setInterval(function () {
        count = count + 20;
        MyProgress.css("width", count + "%");
        $("#MyProgressContainer").attr("aria-valuenow", count);
        MyProgress.html(count + "%");

        if (count > 100) {
          $("#MyProgressContainer").addClass("d-none");
          $("#button-pay").removeClass("d-none");
          MyProgress.css("width", "0%");
          $("#MyProgressContainer").attr("aria-valuenow", 0);
          Account.AmountOfMoney -= parseFloat(
            document.getElementById("total-price").innerText
          );
          Account.orderNumber += 1;
          localStorage.setItem(loggedInAccount, JSON.stringify(Account));
          localStorage.removeItem(cartList);
          var data = JSON.parse(localStorage.getItem(AccountListName));
          for (let i = 0; i < data.length; i++) {
            if (data[i].username == Account.username) {
              data[i].AmountOfMoney = Account.AmountOfMoney;
              data[i].orderNumber = Account.orderNumber;
            }
          }
          localStorage.setItem(AccountListName, JSON.stringify(data));

          alert("Đã thanh toán thành công");
          loadCart();
          clearInterval(interval);
        }
      }, 1000);
    }
  } else {
    showNotification("Số dư tài khoản không đủ");
  }
});

getLoggedInAccount();
loadCart();
