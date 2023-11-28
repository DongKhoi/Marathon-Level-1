let listData = [];

async function loadData() {
    await axios.get('/getdata').then(response => {
        const data = response.data
        data.forEach((item, index) => {
            listData.push(item);
        })
        displayProductDetail();
    })
    .catch(error => {
        console.log('Có lỗi!', error);
    })
};

function displayProductDetail() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("id");
    if(productId) {
        const product = listData.find(item => item.id.toString() === productId);
        if(product) {
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-img').src = product.image;
            document.getElementById('product-desription').textContent = product.desription;
            document.getElementById('product-title').textContent = product.title;
        } else {
            alert('không tìm thấy sản phẩm !')
        }
    }
}


loadData()