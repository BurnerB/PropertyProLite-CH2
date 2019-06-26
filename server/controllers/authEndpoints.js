import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import db from '../db/users';


const is_Admin = false;
const is_Agent = false;

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
        res.status(409)
          .json({
            status: 'error',
            data: 'The email has already been used to register',
          });
        return;
      }
      // You don't want the code to continue after you've done res.status().json({ }); because it will then try to send another response.
      res.status(201)
        .json({
          status: 'success',
          data: newUser.result,
        });
      return;
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
}

export default Authentication;
