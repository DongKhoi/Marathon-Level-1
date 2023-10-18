var AccountListName = "AccountListName";
var username = document.getElementById("inp-username");
var password = document.getElementById("inp-password");
var notification = document.getElementById("notification");
var messege = "";
var getAccount = function () {
  if (!localStorage.getItem(AccountListName)) {
    localStorage.setItem(AccountListName, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(AccountListName));
};

var checkCondition = function () {
  this.messege = "";
  if (username.value == "") {
    this.messege = this.messege + "Username không được bỏ trống \n";
  }
  if (password.value == "") {
    this.messege = this.messege + "Password không được bỏ trống \n";
  }
};

var showNotification = function (mess) {
  setTimeout(function () {
    notification.innerText = mess;
    notification.classList.remove("d-none");
    notification.style.opacity = "1";
  }, 1000);
  setTimeout(function () {
    notification.classList.add("d-none");
    notification.style.opacity = "0";
  }, 4000);
};

var login = function () {
  checkCondition();
  if (messege == "") {
    var data = getAccount();
    var rs = false;
    var us = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].username == username.value) {
        us = true;
        if (data[i].password == password.value) {
          rs = true;
          break;
        } else showNotification("Mật khẩu không đúng");
      }
      if (!us) {
        showNotification("Username không tồn tại");
      }
    }

    if (rs) {
      window.location.href = "../Buoi8/home.html";
    }
  } else {
    showNotification(messege);
  }
};
