const express=require('express')
const authRouter=express.Router();
const {userLogin,userRegister,userLogout,authUser}=require('../controllers/auth.controller')
const auth = require('../middlewares/auth.middleware')
authRouter.post('/register',userRegister);
authRouter.post('/login',userLogin);
authRouter.post('/logout',userLogout);
authRouter.get('/auth/me',auth,authUser)

module.exports=authRouter;