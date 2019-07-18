/* eslint-disable camelcase */
/* eslint-disable quotes */
import Token from "./jwt";


class TokenGen {
  static genToken(id, email, firstname, lastname, is_Agent, is_Admin) {
    const tokenDetail = Token.generateToken({
      id,
      email,
      firstname,
      lastname,
      is_Agent,
      is_Admin,
    });
    return tokenDetail;
  }
}

export default TokenGen;
