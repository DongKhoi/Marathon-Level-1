const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.static(__dirname));

app.use(cors());
app.get("/getListItems", (req, res) => {
  const fs = require("fs");
  const data = fs.readFileSync("products.json", "utf-8");
  const jsonData = JSON.parse(data);
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
