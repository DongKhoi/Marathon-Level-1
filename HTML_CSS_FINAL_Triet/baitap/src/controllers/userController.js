import express from "express";
import userModel from "../services/userModel.js"

const getAllUser = async (req, res) => {
    let userList = await userModel.getAllUser();
    return res.render("home", { data: { title: 'Danh sách tài khoản', rows: userList , page: 'listUser'} })
    }

    const editUser = async (req, res) => {
        let user = req.params.username
        let dataUser = await userModel.detailUser(user)
        return res.render("home", {data: { title:"edit-user", page:"editUser", rows: dataUser}})
    }

    const detailUser = async (req, res) => {
        
        let user = req.params.username
        let dataUser = await userModel.detailUser(user)

        res.render('home', {data: { title: 'detail User', page: 'detailUser', rows: dataUser}})
    }

    const updateUser = async (req, res) => {
        console.log(req.body)
        let { username, password, fullname, address, sex, email } = req.body
        await userModel.updateUser(password, fullname, address, sex, email, username)
        res.redirect('/listUser')
    }

export default  {getAllUser, editUser, detailUser, updateUser};