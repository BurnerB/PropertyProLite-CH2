import Token from "./jwt";


class TokenGen {
  static genToken(_id, email, firstname, lastname, is_Agent, is_Admin) {
    const tokenDetail = Token.generateToken({
      _id,
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
