const jwt = require("jsonwebtoken");

const authMiddleware = (req, res,next) =>{
    // console.log("auth middleware is passed")
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    //split from the bearer
    const token = authHeader && authHeader.split(" ")[1];
    // if no token
    if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided. Please login to continue",
        });
      }
    //decode this token(get the user information)
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decodedTokenInfo);
        req.userInfo = decodedTokenInfo;
    next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Access denied. No token provided. Please login to continue",
          });
    }
    
}


module.exports = authMiddleware