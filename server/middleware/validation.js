import Joi from '@hapi/joi';


class Validations {
  static async validateSignup(req, res, next) {
    try {
      const schema = {
        firstname: Joi.string().min(3).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Firstname is a required field with a min of 3 chars and no special chars or numbers'),

        lastname: Joi.string().min(3).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Firstname is a required field with a min of 3 chars and no special chars or numbers'),

        address: Joi.string().alphanum().min(5).max(50)
          .required()
          .error(() => 'Address is a required field with a min of 5 chars and no special chars'),

        phoneNumber: Joi.string().min(10).max(10).regex(/^[0-9]*$/)
          .required()
          .error(() => 'phoneNumber is a required field with a min of 10 numbers and no special chars or letters'),

        email: Joi.string().email({ minDomainSegments: 2 }).required()
          .error(() => 'Invalid Email'),

        password: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),

        is_Agent: Joi.boolean().required()
          .error(() => 'is_Agent is a required field and can only be true or false'),
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return res.status(400)
          .json({
            status: 'error',
            data: error.details[0].message,
          });
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }

  static async validateLogin(req, res, next) {
    try {
      const schema = {
        email: Joi.string().email({ minDomainSegments: 2 }).required()
          .error(() => 'Invalid Email'),
        password: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return res.status(400)
          .json({
            status: 'error',
            data: error.details[0].message,
          });
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }

  static async validateProperty(req, res, next) {
    try {
      const schema = {
        status: Joi.string().min(5).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Status is a required field with a min of 3 chars and no special chars or numbers'),

        type: Joi.string().min(5).max(15).required()
          .error(() => 'Type is a required field with a min of 3 chars and no special characters'),

        state: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'State is a required field with a min of 3 chars and no special chars'),

        city: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'City is a required field with a min of 3 chars and no special chars or numbers'),

        price: Joi.number().required()
          .error(() => 'Price is a required field with no special chars or alphabets'),

        address: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Address is a required field with a min of 3 chars and no special chars or numbers'),

        image_url: Joi.string().uri()
          .required()
          .error(() => 'Image_Url is a required field and no special chars or numbers'),

      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return res.status(400)
          .json({
            status: 'error',
            data: error.details[0].message,
          });
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }

  static async validateUpdateProperty(req, res, next) {
    try {
      const schema = {
        type: Joi.string().min(5).max(15)
          .required()
          .error(() => 'Type is a required field with a min of 3 chars and no special chars'),

        state: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'State is a required field with a min of 3 chars and no special chars'),

        city: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'City is a required field with a min of 3 chars and no special chars or numbers'),

        price: Joi.number().required()
          .error(() => 'Price is a required field with no special chars or alphabets'),

        address: Joi.string().min(5).max(15).alphanum()
          .required()
          .error(() => 'Address is a required field with a min of 3 chars and no special chars or numbers'),

        image_url: Joi.string().uri()
          .required()
          .error(() => 'Image_Url is a required field and no special chars or numbers'),

      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return res.status(400)
          .json({
            status: 'error',
            data: error.details[0].message,
          });
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }

  static async validateReset(req, res, next) {
    try {
      const schema = {
        phoneNumber: Joi.string().min(10).max(10).regex(/^[0-9]*$/)
          .optional()
          .error(() => 'phoneNumber is an opional field with a min of 10 numbers and no special chars or letters'),

        email: Joi.string().email({ minDomainSegments: 2 }).required()
          .error(() => 'Invalid Email'),
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return res.status(400)
          .json({
            status: 'error',
            data: error.details[0].message,
          });
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }
}
export default Validations;
