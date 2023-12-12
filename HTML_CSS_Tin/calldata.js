let listData = [];
async function loadData(name) {
  await axios.get('/getdata').then(response => {
    const data = response.data;
    const productContainer = document.getElementById('productList');
    let productsHTML = '';
    const filteredData = data.filter(item => {
      return item.name.includes(name);
    });
    if (productContainer) {
      filteredData.forEach((item, index) => {
        productsHTML += `
   <div class="col-md-4 my-3">
       <div class="card" style="width:23rem;">
          <img class="card-img-top" src="${item.image}" alt="Card image cap">
        <div class="card-body">
         <h5 class="card-title">${item.name}</h5>
        <p class="card-text" style="font-size: medium;">${item.price}</p>
      <a href="detail.html?index=${item.id}" class="btn btn-primary">Buy</a>
 </div>
</div>
</div>
     `;
      });
      productContainer.innerHTML = productsHTML;
    }
    else {
      data.forEach((item, index) => {
        listData.push(item);
      });
    }

    console.log(productsHTML);
  })
    .catch(error => {
      console.error('Lỗi:', error);
    });

  const dropdownMenuLink = document.getElementById("dropdownMenuLink");
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
  window.location.href = "login.html";
});

function loadInfo() {
  if (account) {
    // Cập nhật thông tin trên giao diện
    document.getElementById("usernameInfo").textContent = username;
    document.getElementById("orderCountInfo").textContent = account.orderNumber || 0;
    document.getElementById("accountBalanceInfo").textContent = account.fund || 0;
  } else {
    // Xử lý khi không tìm thấy tài khoản
    alert("Không tìm thấy tài khoản với username: " + username);
  }
}
// Lấy modal element
var accountModal = document.getElementById('accountModal');

// Sử dụng sự kiện "show.bs.modal" của Bootstrap để theo dõi khi modal được hiển thị
accountModal.addEventListener('show.bs.modal', function () {
  loadInfo();
});

// Sự kiện khi nút "Nạp Tiền" được nhấn
document.getElementById("accountInfoOk").addEventListener("click", function () {
  if (account) {
    // Nạp thêm 10,000$ vào số dư tài khoản
    account.fund += 100000;

    // Cập nhật thông tin tài khoản trong storage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    loadInfo()
  } else {
    alert("Không tìm thấy tài khoản với username: " + username);
  }
});
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput");
  const name = searchInput.value;
  console.log(name)
  loadData(name);
});
loadData("");

//function loadData() {
//axios.get('/getdata')
//    .then(response => {
//     const data = response.data;
//     const dataArray = [];
//     data.forEach(item => {
//       dataArray.push(item);
//    });

//    localStorage.setItem('data', JSON.stringify(dataArray));
//   const productList = document.getElementById('productList');

//    productList.innerHTML = '';
//    data.forEach(product => {
//      const productElement = document.createElement('div');
//       productElement.innerHTML = `
//              <div class="col-md-4 my-3">
//              <div class="card" style="width:23rem;">
//                  <img class="card-img-top" src="$(item.image)" alt="Card image cap">
//                  <div class="card-body">
//                     <h5 class="card-title">Sản phẩm 1</h5>
//                      <p class="card-text" style="font-size: medium;">cost:$100</p>
//                      <a href="detail.html" class="btn btn-primary">Buy</a>
///                  </div>
//             </div>
//         </div>
//      `;
//      productList.appendChild(productElement);
//    })
//  })

//   .catch(error => console.error('Lỗi khi tải dữ liệu:', error));

//}
//loadData();