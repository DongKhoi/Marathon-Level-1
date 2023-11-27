function createUser(username, password) {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || []
    const newAccount = {
        username: username,
        password: password,
        fund: 0,
        orderNumber: 0
    }
    accounts.push(newAccount)
    localStorage.setItem("accounts", JSON.stringify(accounts))
}

document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault()
    const username = document.getElementById("signupUsername").value
    const password = document.getElementById("signupPassword").value
    const confirmPassword = document.getElementById("signupRePassword").value

    if(password !== confirmPassword) {
        alert("Mật khẩu và mật khẩu nhập lại không trùng khớp.")
    } else{
        let accounts = JSON.parse(localStorage.getItem("accounts")) || []
        if(accounts.find(x => x.username === username)) {
            alert("Tài khoản đã tồn tại> Vui lòng chọn tài khoản khác.")
        } else {
            createUser(username, password)
            alert("Đăng ký thành công")
            document.getElementById("signupUsername").value = "";
            document.getElementById("signupPassword").value = "";
            document.getElementById("signupRePassword").value = "";
        }
    }
})

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault()
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    let accounts = JSON.parse(localStorage.getItem("accounts")) || []
    if(accounts.find(x => x.password === password)) {
        alert("Đăng nhập thành công")
        window.location.href = "home.html"
    } else {  
        alert("Đăng nhập không thành công. Vui lòng kiểm tra tài khoản và mật khẩu.")
    }

})

