const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
const username = JSON.parse(localStorage.getItem("account"))
const account = accounts.find(x => x.username === username);