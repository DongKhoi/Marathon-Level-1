var usernames = localStorage.getItem("name");
var userdropdown = document.getElementById("user-dropdown")
var dropdown = document.getElementById("login")
if (usernames) {
  var usernameElement = document.getElementById("username");
  usernameElement.innerHTML = ('Xin chào ' + usernames + ' !');
  dropdown.style.display = 'none'
} else {
    userdropdown.style.display = 'none';
    
}

document.getElementById("log-out").addEventListener("click", function () {
    localStorage.removeItem("name");
    localStorage.removeItem('cart')
    window.location.href = "home.html";
  });