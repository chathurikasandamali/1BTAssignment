const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if(!accessToken) return res.status(401).json({ error: "Unauthorized!"});
    try{
        const validToken = verify(accessToken, "importantsecret");
        if(validToken){
            return next();
        }
    }catch (err) {
        //console.log("Unauthorized!");
        return res.status(401).json({ error: "Unauthorized!" });
    }
}

module.exports = { validateToken };