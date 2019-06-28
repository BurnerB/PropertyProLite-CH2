import db from '../db/adverts';

class PropertyModel {
  constructor(payload = null) {
    this.payload = payload;
    this.result = null;
  }

  async registerProperty() {
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
}

export default PropertyModel;
