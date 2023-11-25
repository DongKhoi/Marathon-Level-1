//const { error } = require("console");

function loadData() {
    axios.get('/getdata')
        .then(response => {
        const data = response.data;
    const dataArray = [];
    data.foreach(item => {
        dataArray.push(item);   
    });

    localStorage.setItem('data', JSON.stringify(dataArray));
    const productList = document.getElementById('productList');

    productList.innerHTML = '';
    data.foreach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
        <p>ID: ${product.id}</p>
        <p>TÊN: ${product.name}</p>
        <p>Giá: $${product.price.toFixed(2)}</p>
        <img>src="${product.image}" alt="hình ảnh sản phẩm">
        <hr>
        `;
        productList.appendChild(productElement);
    })
        })

.catch (error=> console.error('Lỗi khi tải dữ liệu:', error));

}
document.getElementById('loadDataButton').addEventListener('click',function() {
    
    loadData();
});