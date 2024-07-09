const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"Token not provided"})
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({});
    }
}

module.exports = authMiddleware;