var searchButton = $("#search-button");
var searchInput = $("#search-input");
var loadMorebtn = $("#loadMore");

var loggedInAccount = "loggedInAccount";
var AccountListName = "AccountListName";

var cartList = "cartList";

var loginHref = $("#loginHref");

searchButton.on("click", function (event) {
  event.preventDefault();
  getItems(searchInput.val());
});

loadMorebtn.on("click", function (event) {
  $("#hidden-items-container").removeClass("d-none");
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

var getItems = function (name) {
  axios
    .get("http://localhost:3000/getListItems")
    .then((rs) => {
      const data = rs.data;
      console.log(rs);
      var listItem = document.getElementById("listItem");
      var listItemInnerHTML = "";
      //   console.log(listItemInnerHTML);
      data.forEach((element) => {
        var a = "asdasd";
        a.toLowerCase;
        if (element.name.toLowerCase().includes(name.toLowerCase())) {
          listItemInnerHTML += `<div class="mt-2 card col-md-4 text-center">
      <img class="item-img" src="./src/${element.image}" class="card-img-top" alt="img">
      <div class="card-body">
          <h5 class="card-title"> ${element.name}</h5>
          <p class="card-text">${element.price} $</p>
          <a href="../Buoi9/detail.html?index=${element.id}" class="btn btn-primary">Mua hàng</a>
      </div>
  </div>`;
        }
      });
      listItem.innerHTML = listItemInnerHTML;
    })
    .catch((err) => {
      console.log("ERROR when read data from sv", err);
    });
};

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
      parseInt(Account.AmountOfMoney) +
      parseInt(document.getElementById("depositAmount").value);
    for (let i = 0; i < data.length; i++) {
      if (data[i].username == Account.username) {
        data[i].AmountOfMoney =
          parseInt(data[i].AmountOfMoney) +
          parseInt(document.getElementById("depositAmount").value);
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

var LogOut = function () {
  localStorage.removeItem(loggedInAccount);
  localStorage.removeItem(cartList);
  window.location.href = "../Buoi8/home.html";
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

getLoggedInAccount();
getItems("");
