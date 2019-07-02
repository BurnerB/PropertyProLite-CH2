/* eslint-disable camelcase */
/* eslint-disable quotes */
import Token from "./jwt";


class TokenGen {
  static genToken(_id, email, firstname, lastname, is_Agent, is_Admin, phoneNumber) {
    const tokenDetail = Token.generateToken({
      _id,
      email,
      firstname,
      lastname,
      is_Agent,
      is_Admin,
      phoneNumber,
    });
    return tokenDetail;
  }
}

export default TokenGen;
