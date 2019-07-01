/* eslint-disable no-underscore-dangle */
import db from '../db/adverts';

class PropertyModel {
  constructor(payload = null) {
    this.payload = payload;
    this.result = null;
  }

  async createProperty() {
    const property = {
      _id: this.payload._id,
      owner: this.payload.owner,
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
      price: this.payload.price,
      address: this.payload.address,
      image_url: this.payload.image_url,
    };
    db.splice(obj._id - 1, 1, newAdvert);
    this.result = newAdvert;
    return true;
  }
}

export default PropertyModel;
