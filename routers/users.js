const express = require('express')
const Controller = require("../controller/users")
const checkLogin = require("../middleware/checkLogin")
const checkAdmin = require("../middleware/checkAdmin")

const router = express.Router();

router.get('/users', checkLogin.isSignin, checkAdmin.isAdmin, Controller.getAllUser);
router.post('/users', checkLogin.isSignin, checkAdmin.isAdmin, Controller.createUser);
router.delete('/users/:id', checkLogin.isSignin, checkAdmin.isAdmin, Controller.deleteUser);
router.get('/users/:id', checkLogin.isSignin, checkLogin.authentication, Controller.getOneUser);
router.put('/users/:id', checkLogin.isSignin, checkLogin.authentication, Controller.updateUser);
router.post('/signin', Controller.signIn);
router.post('/signup', Controller.signUp);



module.exports = router;