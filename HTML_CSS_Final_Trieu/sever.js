const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors'); // Import thư viện CORS

app.use(express.static(__dirname));

// Sử dụng middleware CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Định nghĩa tuyến đường để cung cấp dữ liệu JSON
app.get('/getdata', (req, res) => {
  const fs = require('fs');
  const jsonData = fs.readFileSync('products.json', 'utf8');
  const jsonArray = JSON.parse(jsonData);
  res.json(jsonArray);
});