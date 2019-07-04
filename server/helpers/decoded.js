import jwt from 'jsonwebtoken';


class Decoded {
  static decodeToken(payload) {
    const token = payload.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  }
}


export default Decoded;
