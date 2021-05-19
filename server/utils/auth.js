const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'bigSecret';
const expiration = '4h'

module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.headers.authorization || req.body.token || req.query.token;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid Token');
    }

    return req;
  },
  signToken: ({ firstName, email, _id }) => {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
}