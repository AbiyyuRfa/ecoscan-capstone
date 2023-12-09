const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({ message: 'Oops! It seems like you are not logged in. Please provide a token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Oh no! Your token seems to be invalid. Please check and try again.' });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };