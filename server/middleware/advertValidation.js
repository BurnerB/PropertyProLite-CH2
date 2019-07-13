import Joi from '@hapi/joi';
import response from '../helpers/responses';


class Validations {
  static async validateProperty(req, res, next) {
    try {
      const schema = {
        type: Joi.string().trim().valid('mini-flat','miniflat','1 bedroom','2 bedroom','3 bedroom', '4 bedroom')
          .required()
          .error(() => 'Type is a required field with a min of 3 chars and no special characters'),

        state: Joi.string().trim().min(5).max(15).alphanum()
          .required()
          .error(() => 'State is a required field with a min of 3 chars and no special chars'),

        city: Joi.string().trim().min(5).max(15)
          .alphanum()
          .required()
          .error(() => 'City is a required field with a min of 3 chars and no special chars or numbers'),

        price: Joi.number().required().error(() => 'Price is a required field with no special chars or alphabets'),

        address: Joi.string().trim().min(5).max(15)
          .alphanum()
          .required()
          .error(() => 'Address is a required field with a min of 3 chars and no special chars or numbers'),

      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return response.validationError(400, error.details[0].message, res);
      }
      next();
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

  static async validateUpdateProperty(req, res, next) {
    try {
      const schema = {
        type: Joi.string().min(5).max(15).required()
          .error(() => 'Type is a required field with a min of 3 chars and no special characters'),

        state: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'State is a required field with a min of 3 chars and no special chars'),

        city: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'City is a required field with a min of 3 chars and no special chars or numbers'),

        price: Joi.number().required().error(() => 'Price is a required field with no special chars or alphabets'),

        address: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Address is a required field with a min of 3 chars and no special chars or numbers'),
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return response.validationError(400, error.details[0].message, res);
      }
      next();
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }

 

  static async validateReport(req, res, next) {
    try {
      const schema = {
        reason: Joi.string().min(10).max(20).required()
          .error(() => 'reason is a required field with a min of 10 characters and a maximum of 20'),

        description: Joi.string().min(10).max(100).required()
          .error(() => 'description is a required field with a min of 10 characters and and a maximum of 50'),
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return response.validationError(400, error.details[0].message, res);
      }
      next();
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}
export default Validations;
