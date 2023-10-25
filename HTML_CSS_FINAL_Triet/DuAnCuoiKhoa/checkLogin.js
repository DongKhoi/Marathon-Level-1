function checkLoggedIn() {
    var loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      document.getElementById("dropdownMenuLink").textContent = loggedInUser;
      document.getElementById("sign-in").style.display = "none";
      document.getElementById("sign-up").style.display = "none";
      document.getElementById("log-out").style.display = "block";
    } else {
      document.getElementById("dropdownMenuLink").textContent = "Đăng nhập/Đăng ký";
      document.getElementById("sign-in").style.display = "block";
      document.getElementById("sign-up").style.display = "block";
      document.getElementById("log-out").style.display = "none";
    }
  }