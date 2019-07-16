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

      const user = await UserModel.findbyEmail(email);

      if(!user){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
          firstname,
          lastname,
          email,
          hashedPassword,
          address,
          is_Agent,
        });
        await newUser.registerUser();

        const userInfo = {
          firstname:newUser.firstname,
          lastname:newUser.lastname,
          email:newUser.email,
          is_Agent:newUser.is_Agent,
        };

        const token = Token.genToken(email, firstname, lastname, is_Agent);

        userInfo.token = token;
        return response.authsuccess(201, 'success',userInfo, res);
      }
      return response.handleError(409, 'The email has already been used to register', res);
    
    } catch (e) {
      console.log(e.message);
      return response.catchError(500, e.message, res);
    }
  }

  static async userLogin(req, res) {
		try {
			const { email, password } = req.body;
			const user = new UserModel(email);

			if (await user.findbyEmail()) {
  
        const {
            // eslint-disable-next-line no-shadow
            _id, firstname, lastname, is_Admin, is_Agent, phoneNumber,
        } = user.result;

				if (bcrypt.compareSync(password, user.result.password)) {
            const token = Token.genToken(_id, email, firstname, lastname, is_Agent, is_Admin, phoneNumber);
            user.result["token"]=token;
            return response.authsuccess(200, 'success', 
                                        _.pick(user.result,['_id','email', 'firstname','lastname','phoneNumber','address', 'is_Admin','is_Agent','token']), res);
        }
        return response.handleError(401, 'Incorrect password Email combination', res);

      } return response.handleError(400, 'Email not found, sign up to create an account', res);
		} catch (e) {
      return response.catchError(500, e.toString(), res);
		}
  }

  static async resetPassword(req, res) {
		try {
      const { email, phoneNumber } = req.body;

      const user = new UserModel(email);
      if (!await user.findbyEmail()) {
        return response.handleError(404, 'No account with this email found', res);

      } return response.success(200, 'Details on password reset have been sent to your email address', res);
		} catch (e) {
      return response.catchError(500, e.toString(), res);
		}
  }
}

export default Authentication;