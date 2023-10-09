import express from "express";
const aboutPage = (req, res) => {
    return res.render("home",{data:{title:"about", page:"about"}});
};
export default aboutPage;