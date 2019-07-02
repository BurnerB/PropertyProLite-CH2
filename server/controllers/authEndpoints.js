/* eslint-disable camelcase */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import bcrypt from 'bcrypt';
import _ from 'lodash';
import UserModel from '../models/userModel';
import db from '../db/users';
import Token from '../helpers/token';


// eslint-disable-next-line camelcase
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

      // eslint-disable-next-line no-underscore-dangle
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
        res.status(409)
          .json({
            status: 'error',
            data: 'The email has already been used to register',
          });
        return;
      }

      const token = Token.genToken(_id, email, firstname, lastname, is_Agent, is_Admin, phoneNumber);

      // You don't want the code to continue after you've done res.status().json({ }); because it will then try to send another response.
      res.status(201)
        .json({
          status: 'success',
          data: _.pick(newUser.result, ['_id', 'email', 'firstname','lastname', 'address','is_Agent', 'is_Admin']),
                token,
        });
      return;
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  static async userLogin(req, res) {
		try {
			const { email, password } = req.body;
			const user = new UserModel(email);

			if (await user.findbyEmail()) {

        // eslint-disable-next-line no-underscore-dangle
        const { _id, firstname, lastname, is_Admin, is_Agent, phoneNumber } = user.result;

				if (bcrypt.compareSync(password, user.result.password)) {
            const token = Token.genToken(_id, email, firstname, lastname, is_Agent, is_Admin, phoneNumber);
				    res.status(200)
                .json({
                        status: 'success',
                        data: _.pick(user.result, ['_id', 'email', 'firstname','lastname', 'is_Agent', 'is_Admin']),
                            token,
                      });
        return;
        }res.status(401)
            .json({
                  status: 'Error',
                  data: 'Incorrect password Email combination', 
                });
        return;
			}res.status(400)
                .json({
                        status: 'Error',
                        data: 'email not found sign up to create an account'
                      });
                      return;
		} catch (e) {
            console.log(e);
            res.status(500);
		}
  }
}

export default Authentication;
