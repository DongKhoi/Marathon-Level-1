import express from "express";
import getHomePage from "../controllers/HomeController";
import aboutPage from "../controllers/AboutController";
import Signin from "../controllers/Signin";
import Signup from "../controllers/Signup";
import handleNotFound from "../controllers/ErrorController";
import userController from "../controllers/userController";
const router = express.Router();
const initWesRouter = (app) => {
    //define the home page router
    router.get('/', getHomePage);
    // define about router
    router.get('/about', aboutPage);
    /// define the listuser 
    router.get("/listUser", userController.getAllUser);
    //difine the edit user
    router.get("/editUser/:usename", userController.editUser)
    // define the Signin
    router.get("/Signin", Signin);
    // define the Signup
    router.get("/Signup", Signup);
    //detail user
    router.get("/detailUser/:username", userController.detailUser)
    //update user
    router.post("/updateUser", userController.updateUser )
    // dènine the userController
    router.get("/")
    router.use(handleNotFound);
    return app.use('/', router);

}
export default initWesRouter;