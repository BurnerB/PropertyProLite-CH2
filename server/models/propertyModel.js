/* eslint-disable no-underscore-dangle */
import db from '../db/adverts';
import fraud from '../db/fraudulent';

class PropertyModel {
  constructor(payload = null) {
    this.payload = payload;
    this.result = null;
  }

  async createProperty() {
    const property = {
      _id: this.payload._id,
      owner: this.payload.owner,
      ownerEmail:this.payload.ownerEmail,
      ownerPhoneNumber:this.payload.ownerPhoneNumber,
      status: this.payload.status,
      type: this.payload.type,
      state: this.payload.state,
      city: this.payload.city,
      price: this.payload.price,
      address: this.payload.address,
      created_on: this.payload.created_on,
      image_url: this.payload.image_url,
    };
    db.push(property);
    this.result = property;
    return true;
  }

  async updateProperty() {
    const obj = db.find(o => o._id === parseInt(this.payload._id));
    if (!obj) {
      return false;
    }
    const newAdvert = {
      _id: obj._id,
      owner: obj.owner,
      status: obj.status,
      type: this.payload.type,
      state: this.payload.state,
      city: this.payload.city,
      price: obj.price,
      address: this.payload.address,
      image_url: this.payload.image_url,
      created_on: this.payload.created_on,
    };
    db.splice(obj._id - 1, 1, newAdvert);
    this.result = newAdvert;
    return true;
  }

  async markProperty() {
    const obj = db.find(o => o._id === parseInt(this.payload._id));
    if (!obj) {
      return false;
    }
    const newAdvert = {
      _id: obj._id,
      owner: obj.owner,
      status: 'Sold',
      type: obj.type,
      state: obj.state,
      city: obj.city,
      price: obj.price,
      address: obj.address,
      image_url: obj.image_url,
    };
    db.splice(obj._id - 1, 1, newAdvert);
    this.result = newAdvert;
    return true;
  }

  async delete() {
    const obj = db.find(o => o._id === parseInt(this.payload._id));
    if (!obj) {
      return false;
    }
    this.result = obj;
    db.splice(db.indexOf(obj), 1);
    return true;
  }

  async allproperties() {
    if (db.length === 0) {
      this.result = [];
      return false;
    }
    this.result = db;
    return true;
  }

  async searchbyType() {
    const { type } = this.payload;
    const obj = db.filter(o => o.type == type);
    if (obj.length === 0) {
      return false;
    }
    this.result = obj;
    return true;
  }

  async markFraud() {
    const obj = db.find(o => o._id === parseInt(this.payload.property_id));
    if (!obj) {
      return false;
    }
    const reported = {
      _id: this.payload._id,
      user_id:this.payload.user_id,
      property_id: this.payload.property_id,
      created_on: this.payload.created_on,
      reason: this.payload.reason,
      description: this.payload.description,
    };
    fraud.push(reported);
    this.result = reported;
    return true;
  }

  async findById() {
    const obj = db.find(o => o._id === parseInt(this.payload._id));
    if (!obj) {
      return false;
    }
    this.result = obj;
    return true;
 }

 async findByIdfraud() {
  const obj = fraud.find(o => o._id === parseInt(this.payload._id));
  if (!obj) {
    return false;
  }
  this.result = obj;
  return true;
}
}

export default PropertyModel;
