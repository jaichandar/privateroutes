const jwt = require('jsonwebtoken')

function Auth(req,res,next){
    const token = req.header('auth-token')

    if(!token){
        return res.status(401).json({
            message:'failure',
            value:'access denied'
        })
    }

    try{
        const verify = jwt.verify(token,process.env.jwtsecret)
        req.user = verify
        next()
    }catch(err){
        res.status(400).json({
            message:'invalid token'
        })
    }
}

module.exports = Auth
