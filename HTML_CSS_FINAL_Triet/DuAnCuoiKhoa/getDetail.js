const users = JSON.parse(localStorage.getItem("users")) || [];
const username = localStorage.getItem("name");
const user = users.find(user => user.username === username);

document.getElementById("nameUser").textContent = `Tên người dùng: ${username}`;
document.getElementById("balance").textContent = `Số dư: ${user ? user.balance || 0 : 0}`;
document.getElementById("order").textContent = `Số đơn hàng đã thanh toán: ${user ? user.order || 0 : 0}`;

document.getElementById("deposit").addEventListener("click", function() {
  if (user) {
    var currentBalance = user.balance || 0;
    user.balance = currentBalance + 100;
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("balance").textContent = `Số dư: ${user.balance}`;
  }
});