import express from 'express';
import Users from '../controllers/authEndpoints';
import Validation from '../middleware/validation';

const router = express.Router();


router.post('/auth/signup',Validation.validateSignup, Users.registerUser);

export default router;