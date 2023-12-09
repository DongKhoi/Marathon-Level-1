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
        // Sau khi tạo chuỗi HTML cho tất cả sản phẩm, thêm nó vào phần tử productList
        productContainer.innerHTML = productsHTML;
    })
        .catch(error => {
            console.error('Lỗi:', error);
        });

    const dropdownMenuLink = document.getElementById("user");
    const accountDropdown = document.getElementById("user-dropdown");
    const loginLink = document.getElementById("loginLink");

    if (username) {
        // Nếu dữ liệu tài khoản tồn tại và có username, gán username lên span.
        dropdownMenuLink.textContent = "Xin chào " + username;
    } else {
        // Nếu dữ liệu tài khoản không tồn tại hoặc không có username, hiển thị hyperlink "Đăng Nhập".
        loginLink.style.display = "block";
        accountDropdown.style.display = "none";
    }

}

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Xóa dữ liệu từ Local Storage có tên "account"
    localStorage.removeItem("account");
    localStorage.removeItem("cart");

    // Chuyển người dùng đến trang "login.html" sau khi xóa dữ liệu
    window.location.href = "signup.html";
});


const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput");
    const name = searchInput.value;
    console.log(name)
    loadData(name);
});


function loadInfo() {
    // Check if the user variable is defined
    if (account) {
        // Cập nhật thông tin trên giao diện
        document.getElementById("usernameInfo").textContent = username;
        document.getElementById("orderCountInfo").textContent = account.orderNumber || 0;
        document.getElementById("accountBalanceInfo").textContent = account.fund || 0;
    } else {
        // Xử lý khi không tìm thấy tài khoản
        alert("Không tìm thấy thông tin tài khoản.");
    }
}



var accountModal = document.getElementById('info');

// Sử dụng sự kiện "show.bs.modal" của Bootstrap để theo dõi khi modal được hiển thị
accountModal.addEventListener("click", function () {
    loadInfo();
});

document.getElementById("accountInfook").addEventListener("click", function () {
    if (account) {
        // Nạp thêm 10,000$ vào số dư tài khoản
        account.fund += 10000;

        // Cập nhật thông tin tài khoản trong storage
        localStorage.setItem("accounts", JSON.stringify(accounts));

        loadInfo()
    } else {
        alert("Không tìm thấy tài khoản với username: " + username);
    }
});
loadData("");
 




