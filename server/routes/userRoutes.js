import express from 'express';
import Users from '../controllers/authEndpoints';
import Validation from '../middleware/validation';

const router = express.Router();


router.post('/auth/signup', Validation.validateSignup, Users.registerUser);
router.post('/login', Users.userLogin);

export default router;