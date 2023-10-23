const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)

    if(token){
        try{
            jwt.verify(token, 'masai', function(err, decoded) {
               if(decoded){
                next()
               }
               else{
                res.status(200).send({'err':"authentication error"})
               }
              });
        }
        catch(err){
        res.status(400).send({'err':err})
        }
    }
}

module.exports={auth}