let listData = [];
async function loadData() {
  await axios.get('/getdata').then(response => {
    const data = response.data;
    const productContainer = document.getElementById('productList');
    let productsHTML = '';
    if (productContainer) {
      data.forEach((item, index) => {
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
}
loadData();

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
