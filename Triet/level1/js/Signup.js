var db;
var request = window.indexedDB.open("myDatabase", 1);
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("users", { autoIncrement: true });
};
request.onerror = function(event) {
  console.log("error: ");
};
request.onsuccess = function(event) {
  db = request.result;
  console.log("success: " + db);
};

function Signup(event) {
  event.preventDefault();
  // Lấy giá trị từ ô nhập liệu
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;

  // Xóa thông báo lỗi hiện tại
  clearErrors();

  // Kiểm tra ô name và ô password không được để trống
  if (name.trim() === "") {
    displayError("nameError", "Vui lòng nhập tên người dùng.");
    return;
  }
  if (password.trim() === "") {
    displayError("passwordError", "Vui lòng nhập mật khẩu.");
    return;
  }
  // Kiểm tra tên người dùng và mật khẩu có đúng với dữ liệu từ IndexedDB hay không
  checkCredentials(name, password);
}

function displayError(elementId, errorMessage) {
  let errorElement = document.getElementById(elementId);
  errorElement.innerText = errorMessage;
  // Tìm ô input tương ứng
  var inputElement = document.getElementById(elementId.replace("Error", ""));
  if (inputElement) {
    inputElement.classList.add("error-input");
  }
}

function clearErrors() {
  var errorElements = document.getElementsByClassName("error");
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].innerText = "";
  }
}

function checkCredentials(name, password) {
  var transaction = db.transaction(["users"], "readonly");
  var objectStore = transaction.objectStore("users");
  var request = objectStore.getAll();

  request.onerror = function(event) {
    console.log("Error: ", event.target.error);
  };

  request.onsuccess = function(event) {
    var users = request.result;
    var isValid = false;

    for (var i = 0; i < users.length; i++) {
      if (users[i].name === name && users[i].password === password) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      // Chuyển hướng đến trang quản lý người dùng
      window.location.href = "ManageUsers.html";
    } else {
      // Hiển thị thông báo lỗi
      displayError("passwordError", "Tên người dùng hoặc mật khẩu sai rồi. !");
    }
  };
}