import jwt from 'jsonwebtoken'


// Middleware function to decode jwt token to get clerkId
export const authUser = async (req, res, next) => {
    try {


        const { token } = req.headers;


        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }


        const token_decode = jwt.decode(token);

        // ✅ Ensure req.body exists
        req.body = req.body || {};
        req.body.clerkId = token_decode.clerkId;

        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
