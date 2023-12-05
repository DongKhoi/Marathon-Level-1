let listData = [];

async function loadData(name) {
    await axios.get('/getdata').then(response => {
        const data = response.data;
        const productContainer = document.getElementById('list-product');
        let productsHTML = '';
        const filteredData = data.filter(item => {
            return item.name.includes(name)
        })
  
        filteredData.forEach((item, index) => {
            productsHTML += `
            <div class="col-md-4 product">
                <div class="card card-hidden text-center align-items-lg-center" aria-hidden="true" style="width: 18rem;">
                    <img src="${item.image}" alt="Card image cap" class="card-img-top w-50">
                    <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.price}</p>
                            <a href="detail.html?id=${item.id}" class="btn btn-primary">Mua Hàng</a>
                    </div>
                </div>
            </div>
            `
        })
        productContainer.innerHTML = productsHTML
      })
      .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    }  

document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

loadData()

function login() {
    var username = document.getElementById("loginUsername").value;

    if (username.trim() !== "") {
        // Tạo storage mới cho mỗi lần đăng nhập
        var storageKey = "user";
        localStorage.setItem(storageKey, username);

        // Hiển thị thông tin người dùng và ẩn form đăng nhập
        displayUserInfo(username, storageKey);
    }
}

function logout() {
    // Xác định storage key hiện tại
    var currentStorageKey = getCurrentStorageKey();

    // Kiểm tra và xóa storage nếu tồn tại
    if (currentStorageKey) {
        localStorage.removeItem(currentStorageKey);
    }

    // Ẩn thông tin người dùng và hiển thị form đăng nhập
    document.getElementById("nav-hover").style.display = "none";
    document.getElementById("loginLink").style.display = "block";
}

function checkLoginStatus() {
    var currentStorageKey = getCurrentStorageKey();

    if (currentStorageKey) {
        // Nếu storage tồn tại, hiển thị thông tin người dùng
        var username = localStorage.getItem(currentStorageKey);
        displayUserInfo(username, currentStorageKey);
    } else {
        // Nếu không có storage, ẩn thông tin người dùng và hiển thị form đăng nhập
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("nav-hover").style.display = "block";
    }
}

function getCurrentStorageKey() {
    // Lặp qua tất cả các items trong localStorage để tìm storage key
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        if (key.startsWith("user")) {
            return key;
        }
    }

    return null;
}

function displayUserInfo(username, storageKey) {
    // Hiển thị thông tin người dùng và ẩn form đăng nhập
    document.getElementById("username").innerText = "Xin chào, " + username;
    document.getElementById("account-info").style.display = "block";
    document.getElementById("login-form").style.display = "none";

    // Lưu storage key vào một biến toàn cục để sử dụng sau này
    window.currentStorageKey = storageKey;
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput");
    const name = searchInput.value;
    console.log(name)
    loadData(name);
});

loadData("");

