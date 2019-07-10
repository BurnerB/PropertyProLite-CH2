import express from 'express';
import Users from '../controllers/authEndpoints';
import Validation from '../middleware/userValidations';

const router = express.Router();


router.post('/auth/signup', Validation.validateSignup, Users.registerUser);
router.post('/auth/signin', Validation.validateLogin, Users.userLogin);
router.post('/auth/reset', Validation.validateReset, Users.resetPassword);

export default router;