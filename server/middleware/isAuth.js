const jwt = require('jsonwebtoken')

exports.isAuth = async (req, res, next) => {
    let token
    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split('; ')
        token = cookies.find(cookie => cookie.includes('token'))    
        if (token) {
            token = token.split('=')[1]
            try {
                const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
                req.creator = decodedToken.id
                next()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
