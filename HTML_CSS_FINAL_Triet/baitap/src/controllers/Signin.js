import express from "express";
const Signin = (req, res) => {
    return res.render("home",{data:{ title:"Signin", page:"Signin"}});
}
export default Signin;