import express from "express";
const Signup = (req, res) => {
    return res.render("home", {data: { title:"Signup", page:"Signup"}});
}
export default Signup;