/* eslint-disable no-underscore-dangle */
import db from '../db/users';

class UserModel {
  constructor(payload = null) {
    this.payload = payload;
    this.result = null;
  }

  async registerUser() {
    const user = {
      _id: this.payload._id,
      email: this.payload.email,
      firstname: this.payload.firstname,
      lastname: this.payload.lastname,
      password: this.payload.password,
      phoneNumber: this.payload.phoneNumber,
      address: this.payload.address,
      is_Agent: this.payload.is_Agent,
      is_Admin: this.payload.is_Admin,
    };

    const obj = db.find(o => o.email === this.payload.email);
    if (!obj) {
      db.push(user);
      this.result = user;
      return true;
    }
    return false;
  }

  async findbyEmail() {
    const obj = db.find(o => o.email === this.payload);
    if (!obj) {
      return false;
    }
    this.result = obj;
    return true;
  }
}

export default UserModel;
