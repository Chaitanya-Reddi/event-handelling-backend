const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.cookies.jwt; // get the token from the cookie 

    if(!token)
        return res.status(401).json({message:"User Not Authenticated"});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET); //verifys the token is legit or not
        req.user=decoded; //here comes the id of the user (payload)
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Invalid token"});
    }
}

module.exports=auth;