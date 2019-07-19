/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import dotenv from 'dotenv';
import _ from 'lodash';
import decode from '../helpers/decoded';
import PropertyModel from '../models/propertyModel';
import fraud from '../db/fraudulent';
import response from '../helpers/responses';
import uploader from '../helpers/uploader';


dotenv.config();

class Property {
  static async postProperty(req, res) {
    try {
      const {
        type,
        state,
        city,
        price,
        address,
      } = req.body;
      
      let image_url;
      const status = 'Available';
      const owner = req.user.id;
      const ownerEmail= req.user.email;
      if (!req.files) {
        return response.handleError(400, 'Image should not be empty', res);
      }
      const image = req.files.image;
      if (process.env.NODE_ENV !== 'test') {
      image_url = await uploader(image);
      
        if (!image_url) {
            return response.handleError(400, 'Cannot upload image', res);
        }
      }



      const newAdvert = new PropertyModel(
        owner,
        ownerEmail,
        status,
        type,
        state,
        city,
        price,
        address,
        image_url
      );

      await newAdvert.createProperty();
      return response.handleSuccess(201, newAdvert, res);
      
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async updateProperty(req, res) {
    try {
      const decoded = decode.decodeToken(req.headers.authorization);
      const user_id = decoded.id;
      const price = req.body.price;
      const id = req.params.property_id;

      const property = await PropertyModel.updateProperty(id,price);
      if (!property || user_id !== property.owner) {
        return response.handleError(404, 'You have no advert with that Id', res);
      }
      return response.handleSuccess(200, property, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async markSold(req, res) {
    try {
      const decoded = decode.decodeToken(req.headers.authorization);

      const user_id = decoded._id;

      const id = req.params.property_id;

      const property = await PropertyModel.markProperty(id)

      if (!property  || (user_id !== property.owner)) {
        return response.handleError(404, 'You have no advert with that Id', res);
      } return response.handleSuccess(200, property, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async deleteAdvert(req, res) {
    try {
      const decoded = decode.decodeToken(req.headers.authorization);

      const user_id = decoded._id;

      const id = req.params.property_id;

      const property = await PropertyModel.delete(id)

      if ( !property|| (user_id !== property.owner)) {
        return response.handleError(404, 'You have no advert with that Id', res);
      }return response.success(200, 'successfully deleted ', res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async allAdverts(req, res) {
    try {
      const properties = await PropertyModel.allproperties();
      if (!properties) {
        return response.handleError(404, 'No adverts found', res);
      }
      return response.handleSuccess(200, properties, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async specificType(req, res) {
    try {
      const { type } = req.query;
      const Type = await PropertyModel.searchbyType(type);

      // return res.send(req.query)
      if (!Type) {
        return response.handleError(404, 'No property adverts of that type found', res);
      }
      return response.handleSuccess(200, Type, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async specificAdvert(req, res) {
    try {
      const _id = req.params.property_id;
      const property = new PropertyModel({
        _id,
      });

      if (!await property.findById()) {
        return response.handleError(404, 'No property with that id found', res);
      } 
      return response.handleSuccess(200, property.result, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async reportProperty(req, res) {
    try {
      const decoded = decode.decodeToken(req.headers.authorization);
      const user_id = decoded._id;
      const { property_id } = req.params;
      const { reason, description } = req.body;

      const _id = fraud.length + 1;

      const property = new PropertyModel({
        _id,
        property_id,
        user_id,
        reason,
        description,
        created_on,
      });
      if (await property.findByIdfraud()) {
        return response.handleError(400, 'You have already reported this property', res);
      }
      if (!await property.markFraud()) {
        return response.handleError(404, 'No property with that id found', res);
      }
      return response.handleSuccess(201, property.result, res);
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Property;
