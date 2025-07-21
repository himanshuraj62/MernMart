import jwt from "jsonwebtoken"
const auth = async (req, res, next) => {
    try {
// First, it tries to extract the token:
// Either from a cookie named accessToken
// Or from the Authorization header (if sent like Bearer token)
// If both are missing, token will be undefined.
        const token = await req.cookies.accessToken || req?.header?.authorization?.split(" ")[1] // ["Bearer","token"]
 
        if (!token) {
            return res.status(401).json({
                message: "Provide token",
                error: true,
                success: false
            })

        }
        
        
      // here we are checking 
      // If token exists, it uses jwt.verify() to decode and verify the token using your secret key (SECRET_KEY_ACCESS_TOKEN).
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decode) {
            return res.status(401).json({
                message: "Unauthorize access",
                error: true,
                success: false

            })
        }

        req.userId = decode.id;
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
export default auth