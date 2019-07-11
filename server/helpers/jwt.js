import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class Token {
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '100d',
    });
    return token;
  }
}

export default Token;
