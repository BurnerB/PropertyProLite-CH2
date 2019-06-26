import Joi from '@hapi/joi';


class Validations {
  static async validateSignup(req, res, next) {
    try {
      const schema = {
        firstname: Joi.string().min(3).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case 'any.empty':
                  err.message = 'firstName should not be empty!';
                  break;
                case 'string.min':
                  err.message = `firstName should have at least ${err.context.limit} characters!`;
                  break;
                case 'string.max':
                  err.message = `firstName should have at most ${err.context.limit} characters!`;
                  break;
                case 'string.regex.base':
                  err.message = 'firstName must be a word with no special characters';
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),

        lastname: Joi.string().min(3).max(15).regex(/^[a-zA-Z]*$/)
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case 'any.empty':
                  err.message = 'lastName should not be empty!';
                  break;
                case 'string.min':
                  err.message = `lastName should have at least ${err.context.limit} characters!`;
                  break;
                case 'string.max':
                  err.message = `lastName should have at most ${err.context.limit} characters!`;
                  break;
                case 'string.regex.base':
                  err.message = 'lastName must be a word with no special characters';
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        address: Joi.string().alphanum().min(5).max(50)
          .required(),

        phoneNumber: Joi.string().min(10).max(10).regex(/^[0-9]*$/)
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case 'any.empty':
                  err.message = 'PhoneNumber should not be empty!';
                  break;
                case 'string.min':
                  err.message = `PhoneNumber should have at least ${err.context.limit} characters!`;
                  break;
                case 'string.max':
                  err.message = `PhoneNumber should have at most ${err.context.limit} characters!`;
                  break;
                case 'string.regex.base':
                  err.message = 'PhoneNumber must be made up of numbers with no special characters or letters';
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),

        email: Joi.string().email({ minDomainSegments: 2 }).required(),

        password: Joi.string().min(5).max(15).regex(/^[a-zA-Z0-9]*$/)
          .required()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case 'any.empty':
                  err.message = 'password should not be empty!';
                  break;
                case 'string.min':
                  err.message = `password should have at least ${err.context.limit} characters!`;
                  break;
                case 'string.regex.base':
                  err.message = 'password must contain alphabets and numbers only, no special characters';
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
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