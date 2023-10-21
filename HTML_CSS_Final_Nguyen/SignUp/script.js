var AccountListName = "AccountListName";
var username = document.getElementById("inp-username");
var password = document.getElementById("inp-password");
var confirm = document.getElementById("inp-confirm");
var notification = document.getElementById("notification");
var messege = "";
var getAccount = function () {
  if (!localStorage.getItem(AccountListName)) {
    localStorage.setItem(AccountListName, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(AccountListName));
};
// var checkUsername=function(){
//     var data= getAccount();
//     var rs = true;
//     data.forEach(element => {
//         if(element.username==username.value) {
//             rs=false;
//         }
//     });
//     return rs;
// }

var checkCondition = function () {
  this.messege = "";
  if (password.value != confirm.value) {
    this.messege = this.messege + "Mật khẩu không khớp \n";
  }
  if (username.value == "") {
    this.messege = this.messege + "Username không được bỏ trống \n";
  }
  if (password.value == "") {
    this.messege = this.messege + "Password không được bỏ trống \n";
  }
  if (confirm.value == "") {
    this.messege = this.messege + "Xác nhập password không được bỏ trống \n";
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

var createAccount = function () {
  checkCondition();
  if (messege == "") {
    var data = getAccount();
    var rs = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].username == username.value) {
        rs = false;
        break;
      }
    }
    if (rs) {
      data.push({
        username: username.value,
        password: password.value,
      });
      localStorage.setItem(AccountListName, JSON.stringify(data));
      showNotification("Đăng ký thành công");
    } else {
      showNotification("Tên đăng nhập đã tồn tại");
    }
  } else {
    showNotification(messege);
  }
};
