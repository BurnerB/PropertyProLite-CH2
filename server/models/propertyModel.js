import pool from '../../config/config';

class PropertyModel {
  constructor(owner,ownerEmail,status, type, state, city, price, address, image_url) {
    this.owner = owner;
    this.ownerEmail = ownerEmail;
    this.status = status;
    this.type = type;
    this.state = state;
    this.city = city;
    this.price = price;  
    this.address = address;
    this.image_url = image_url;
  }


  async createProperty() {
    const createPropertyQuery = `INSERT INTO properties(owner,ownerEmail,status, type, state, city, price, address, image_url) VALUES($1, $2, $3, $4, $5 ,$6, $7, $8, $9) returning *`;
    const createdProperty = await pool.query(createPropertyQuery, [this.owner,this.ownerEmail,this.status,this.type,this.state,this.city,this.price,this.address,this.image_url]);
    const property = createdProperty.rows[0];
    return property;
  }

  static async findbyEmail(email) {
    const searchUserQuery = `SELECT * FROM users WHERE email= $1`;
    const foundUser = await pool.query(searchUserQuery,[email])
    const user = foundUser.rows[0];
    return user;
  }
}
export default PropertyModel;
