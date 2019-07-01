/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import PropertyModel from '../models/propertyModel';
import db from '../db/adverts';

// eslint-disable-next-line camelcase
const created_on = moment().format('MMMM Do YYYY, h:mm:ss a');

class Property {
  static async postProperty(req, res) {
    try {
      const {
        status,
        type,
        state,
        city,
        price,
        address,
        image_url,
      } = req.body;
      
      const _id = db.length + 1;
      const owner = req.user._id;

      const newAdvert = new PropertyModel({
        _id,
        owner,
        status,
        type,
        state,
        city,
        price,
        address,
        created_on,
        image_url,
      });
      
      await newAdvert.registerProperty()
      res.status(201)
        .json({
          status: 'success',
          data: newAdvert.result,
        });
      return;
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
};

export default Property;