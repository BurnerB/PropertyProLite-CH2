/* eslint-disable no-underscore-dangle */
import db from '../db/queries';

class UserModel {
  constructor(firstname, lastname, email, password, address, is_Agent, is_Admin) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.address = address;
    this.is_Agent = is_Agent;
    this.is_Admin = is_Admin;

  }

  async registerUser() {
    const createUserQuery = `INSERT INTO users(firstname,lastname,email,password, address,is_Agent, is_Admin) VALUES($1, $2, $3, $4, $5 ,$6, $7) returning *`;
    const value = [this.firstname,this.lastname,this.email,this.password,this.address,this.is_Agent, this.is_Admin];
    const createdUser = await db.query(createUserQuery,value);
    const user = createdUser.rows[0];
    return user;
  }

  // async findbyEmail(email) {
  //   const searchUserQuery = `SELECT * FROM users WHERE email= $1`;
  //   const foundUser = await db.query(searchUserQuery,[email])
  //   return foundUser.row[0];
  // }
}
export default UserModel;
