import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
  static async validateSignup(req, res, next) {
    try {
      const schema = {
        firstname: Joi.string().min(3).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Firstname is a required field with a min of 3 chars and no special chars or numbers'),

        lastname: Joi.string().min(3).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Lastname is a required field with a min of 3 chars and no special chars or numbers'),

        address: Joi.string().alphanum().min(5).max(50)
          .required()
          .error(() => 'Address is a required field with a min of 5 chars and no special chars'),

        phoneNumber: Joi.string().regex(/^[0-9]*$/).min(10).max(10)
          .required()
          .error(() => 'phoneNumber is a required field with a min of 10 numbers and no special chars or letters'),

        email: Joi.string().email({ minDomainSegments: 2 }).required()
          .error(() => 'Email is a required field and must be valid'),

        password: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),

        is_Agent: Joi.boolean().required()
          .error(() => 'is_Agent is a required field and can only be true or false'),
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

  static async validateLogin(req, res, next) {
    try {
      const schema = {
        email: Joi.string().email({ minDomainSegments: 2 }).required()
          .error(() => 'Email is a required field and must be valid'),
        password: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),
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

  static async validateReset(req, res, next) {
    try {
      const schema = {
        phoneNumber: Joi.string().min(10).max(10).regex(/^[0-9]*$/)
          .optional()
          .error(() => 'phoneNumber is an opional field with a min of 10 numbers and no special chars or letters'),

        email: Joi.string().email({ minDomainSegments: 2 }).required().error(() => 'Email is a required field and must be valid'),
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