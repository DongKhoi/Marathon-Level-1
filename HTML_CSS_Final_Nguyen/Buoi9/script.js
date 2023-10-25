var searchButton = $("#search-button");
var searchInput = $("#search-input");
var chatNowBtn = $("#button-chatNow");
var shopName = $("#shopName");

var loggedInAccount = "loggedInAccount";
var cartList = "cartList";

var loginHref = $("#loginHref");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("index");

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

var getProductByID = async function () {
  try {
    const rs = await axios.get("http://localhost:3000/getListItems");

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
    var productName = document.getElementById("productName");
    productName.innerText = productInfo.name;
    var productPrice = document.getElementById("productPrice");
    productPrice.innerText = productInfo.price;
    var productPrePrice = document.getElementById("productPrePrice");
    productPrePrice.innerText = (parseFloat(productInfo.price) + 1).toString();
    return productInfo;
  } catch (err) {
    console.log("Error get product by id", err);
    return null;
  }
};

var addToCart = async function () {
  var quantity = $("#quantity");
  if (!localStorage.getItem(cartList)) {
    localStorage.setItem(cartList, JSON.stringify([]));
  }
  const data = JSON.parse(localStorage.getItem(cartList));
  var isExist = false;
  var index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].Id == productId) {
      isExist = true;
      index = i;
      break;
    }
  }
  if (isExist) {
    // alert(parseInt(quantity.val(), data[index].quatity));
    data[index].quantity = data[index].quantity + parseInt(quantity.val());
  } else {
    var product = await getProductByID();
    console.log(product);
    var newPr = {
      Id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: parseInt($("#quantity").val()),
    };
    data.push(newPr);
  }
  localStorage.setItem(cartList, JSON.stringify(data));
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
