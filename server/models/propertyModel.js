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

  static async allproperties(){
    const query = `SELECT * FROM properties`;
    const adverts = await pool.query(query);
    const allAdverts = adverts.rows;
    return allAdverts;
  }

  static async updateProperty(id, price){
    const query =`UPDATE properties SET price= $1 WHERE id = $2 RETURNING *`;
    const Updates = [price,id];
    const {rows} = await pool.query(query,Updates);
    return rows[0];
  }

  static async markProperty(id) {
    const query = 'UPDATE properties SET status = $1 WHERE id = $2 returning *';
    const values = ['SOLD',id];
    const { rows } = await pool.query(query,values);
    return rows;
  }

  static async delete(id) {
    const text = 'DELETE FROM properties WHERE id =$1';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async searchbyType(type) {
    const { rows } = await pool.query('SELECT * FROM properties WHERE type=$1', [type]);
    return rows;
  }

  static async findbyId(id) {
    const searchUserQuery = `SELECT * FROM users WHERE id= $1`;
    const foundUser = await pool.query(searchUserQuery,[id])
    const user = foundUser.rows[0];
    return user;
  }


}
export default PropertyModel;
