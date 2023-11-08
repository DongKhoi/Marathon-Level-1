let listData = [];

async function loadData() {
  await axios
    .get('/getdata')
    .then(response => {
      const data = response.data;
      const productContainer = document.getElementById('list-product');
      let productsHTML = '';
      data.forEach((item, index) => {
        productsHTML += `
          <div class="col-md-4 product">
            <div class="card">
              <img src="${item.img}" class="card-img-top" alt="Card image cap">
              <div class="card-body"> 
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">đ${item.price}</p>
                <a href="detail.html?id=${item.id}" class="btn btn-primary">Mua Hang</a>
              </div>
            </div>
          </div>
        `;
      });
      productContainer.innerHTML = productsHTML;
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
}

async function performSearch(name) {
  listData = [];
  const productContainer = document.getElementById('list-product');
  productContainer.innerHTML = '';

  await axios
    .get('/getdata')
    .then(response => {
      const data = response.data;
      const filteredData = data.filter(item => item.name.includes(name));
      filteredData.forEach((item, index) => {
        listData.push(item);
        productContainer.innerHTML += `
          <div class="col-md-4 product">
            <div class="card">
              <img src="${item.img}" class="card-img-top" alt="Card image cap">
              <div class="card-body"> 
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.price}</p>
                <a href="detail.html?id=${item.id}" class="btn btn-primary">Mua Hang</a>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(error => console.error('ERR', error));
}

function resetPage() {
  const productContainer = document.getElementById('list-product');
  productContainer.innerHTML = '';
  loadData();
}

searchButton.addEventListener('click', function () {
  const searchValue = searchInput.value.trim();

  if (searchValue !== '') {
    performSearch(searchValue);
  } else {
    resetPage();
  }
});

loadData();