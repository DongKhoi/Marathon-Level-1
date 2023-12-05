const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.static(__dirname));
app.use(cors());

app.listen(port, () => {
    console.log(`sever is listening on port ${port}`);
});
app.get('/getdata', (req, res) => {
    const fs = require('fs');
    const jsonData = fs.readFileSync('products.json', 'utf8');
    const jsonArray = JSON.parse(jsonData);
    res.json(jsonArray);
});