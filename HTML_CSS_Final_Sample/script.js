// Thực hiện khi tài khoản chưa tồn tại
function createUser(username, password) {
    // Thêm tài khoản vào lưu trữ (storage)
    // Ví dụ sử dụng Local Storage
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const newAccount = {
        username: username,
        password: password,
        fund: 0,
        orderNumber: 0
    }
    accounts.push(newAccount)
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Thực hiện khi đăng ký
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupRePassword").value;

    if (password !== confirmPassword) {
        alert("Mật khẩu và mật khẩu nhập lại không trùng khớp.");
    } else {
        // Kiểm tra xem tài khoản đã tồn tại chưa
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        if (accounts.find(x => x.username === username)) {
            alert("Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.");
        } else {
            // Tài khoản chưa tồn tại, thực hiện tạo tài khoản
            createUser(username, password);
            alert("Đăng ký thành công!");
        }
    }
});

// Thực hiện khi đăng nhập
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Kiểm tra xem tài khoản có tồn tại và mật khẩu có khớp không
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    if (accounts.find(x => x.username === username && x.password == password)) {
        localStorage.setItem("account", JSON.stringify(username));
        alert("Đăng nhập thành công!");
        // Sau khi đăng nhập thành công, thực hiện chuyển hướng đến trang home.html
        window.location.href = "home.html";
    } else {
        alert("Đăng nhập không thành công. Vui lòng kiểm tra tài khoản và mật khẩu.");
    }
});



