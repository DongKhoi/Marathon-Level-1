document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("registerName").value;
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (getUser(username)) {
      alert("Tài khoản đã tồn tại!");
    } else if (password !== confirmPassword) {
      alert("Hai mật khẩu không khớp!");
    } else {
      saveUser(username, password);
      alert("Đăng ký thành công!");
    }
  });

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;
    if (checkMatch(username, password)) {
      alert("Đăng nhập thành công!");
      window.location.href = "home.html";
    } else {
      alert("Tài khoản và mật khẩu không đúng!");
    }
  });

function getUser(username) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var user = users.find(function (user) {
    return user.username === username;
  });
  return user;
}

function saveUser(username, password) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username: username, password: password });
  localStorage.setItem("users", JSON.stringify(users));
}

function checkMatch(username, password) {
  var user = getUser(username);
  if (user && user.password === password) {
    return true;
  }
  return false;
}
