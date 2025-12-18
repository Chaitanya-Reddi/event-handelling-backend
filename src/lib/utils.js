const jwt=require('jsonwebtoken')
const generateToken=async(userId,res)=>{
    try{
        const token=jwt.sign({userId},process.env.JWT_SECRET,{ //generates the token and sends to the user through cookie
            expiresIn:"7d",
        });
        res.cookie("jwt",token,{ // payload is user id
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure: process.env.APPLICATION==="production" ? true:false,
        });
        return token;
    }catch(err){
        console.log(err);
    }
}

module.exports=generateToken