/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PropertyModel from '../models/propertyModel';
import db from '../db/adverts';


dotenv.config();

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

      await newAdvert.createProperty();
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

  static async updateProperty(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const user_id = decoded._id;
      const {
        type,
        state,
        city,
        price,
        address,
        image_url,
      } = req.body;
      const _id = req.params.property_id;

      const property = new PropertyModel({
        _id,
        type,
        state,
        city,
        price,
        address,
        image_url,
      });

      if (!await property.updateProperty() || (user_id !== property.result.owner)) {
        return res.status(404)
          .json({
            status: 'Error',
            data: 'You have no advert with that Id',
          });
      } return res.status(200)
        .json({
          status: 'Success',
          data: property.result,
        });
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  static async markSold(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const user_id = decoded._id;

      const _id = req.params.property_id;

      const property = new PropertyModel({
        _id,
      });

      if (!await property.markProperty() || (user_id !== property.result.owner)) {
        return res.status(404)
          .json({
            status: 'Error',
            data: 'You have no advert with that Id',
          });
      } return res.status(200)
        .json({
          status: 'Success',
          data: property.result,
        });
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  static async deleteAdvert(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const user_id = decoded._id;

      const _id = req.params.property_id;

      const property = new PropertyModel({
        _id,
      });

      if (!await property.delete() || (user_id !== property.result.owner)) {
        return res.status(404)
          .json({
            status: 'Error',
            data: 'You have no advert with that Id',
          });
      } return res.status(200)
        .json({
          status: 'Success',
          data: 'successfully deleted ',
        });
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
}

export default Property;
