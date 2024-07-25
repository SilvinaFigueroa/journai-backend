import jwt from 'jsonwebtoken'

// middleware to get the password token 
export default (req, res, next) => {

    // pull token out of header 
    const token = req.header('x-auth-token')

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Token not found. Authorization Denied' }] })
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.jwtSecret)
        // Attach user to request
        req.user = decoded.user

        next()

    } catch (err) {
        console.error(err)
        res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
    }
}