/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import bcrypt from 'bcrypt';
import _ from 'lodash';
import UserModel from '../models/userModel';
import db from '../db/users';
import Token from '../helpers/token';
import response from '../helpers/responses';

const is_Admin = false;


class Authentication {
  static async registerUser(req, res) {
    try {
      const {
        email,
        firstname,
        lastname,
        address,
        password,
        phoneNumber,
        is_Agent,
      } = req.body;
      const _id = db.length + 1;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        _id,
        email,
        firstname,
        lastname,
        password: hashedPassword,
        address,
        phoneNumber,
        is_Agent,
        is_Admin,
      });

      if (!await newUser.registerUser()) {
        return response.handleError(409, 'The email has already been used to register', res);
      }

      const token = Token.genToken(_id, email, firstname, lastname, is_Agent, is_Admin, phoneNumber);
      console.log(newUser.result);
      
      newUser.result["token"]=token;
      // console.log(newUser.result);
      return response.authsuccess(201, 'success',
                                   _.pick(newUser.result,['_id','email', 'firstname','lastname','phoneNumber','address','token']), res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
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
