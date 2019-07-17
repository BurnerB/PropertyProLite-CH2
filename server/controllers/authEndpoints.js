/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import bcrypt from 'bcrypt';
import _ from 'lodash';
import UserModel from '../models/userModel';
import Token from '../helpers/token';
import response from '../helpers/responses';


class Authentication {
  static async registerUser(req, res) {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        address,
        is_Agent,
      } = req.body;

      const user1 = await UserModel.findbyEmail(email);

      if(!user1){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel(
          firstname,
          lastname,
          email,
          hashedPassword,
          address,
          is_Agent,
        );
        const user = await newUser.registerUser();

        const token = Token.genToken(user.id, user.email, user.firstname, user.lastname, user.is_Agent);
        user["token"]=token;

        return response.authsuccess(201, 'successfully created user', 
                                        _.pick(user,['id','email', 'firstname','lastname','phoneNumber','address', 'is_Admin','is_Agent','token']), res);
        }
      return response.handleError(409, 'The email has already been used to register', res);
    
    } catch (e) {
      return response.catchError(500, e.message, res);
    }
  }

  static async userLogin(req, res) {
		try {
			const { email, password } = req.body;
			const user = await UserModel.findbyEmail(email);

			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
            const token = Token.genToken(user.id, user.email, user.firstname, user.lastname, user.is_Agent);
            user["token"]=token;
            return response.authsuccess(200, 'successly logged in', 
                                        _.pick(user,['id','email', 'firstname','lastname','phoneNumber','address', 'is_Admin','is_Agent','token']), res);
        }
        return response.handleError(401, 'Incorrect password Email combination', res);

      } return response.handleError(400, 'Email not found, sign up to create an account', res);
		} catch (e) {
      return response.catchError(500, e.toString(), res);
		}
  }

  // static async resetPassword(req, res) {
	// 	try {
  //     const { email, phoneNumber } = req.body;

  //     const user = new UserModel(email);
  //     if (!await user.findbyEmail()) {
  //       return response.handleError(404, 'No account with this email found', res);

  //     } return response.success(200, 'Details on password reset have been sent to your email address', res);
	// 	} catch (e) {
  //     return response.catchError(500, e.toString(), res);
	// 	}
  // }
}

export default Authentication;