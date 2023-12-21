const jwt = require('jsonwebtoken')


exports.signAccessToken = async admin => {
    const payload = {
        email: admin.email,
        id: admin._id,
    };

    const token = await jwt.sign(payload, 'longstringsecret', { expiresIn: 60 * 60 });

    return token
}
