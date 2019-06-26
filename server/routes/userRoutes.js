import express from 'express';
import Users from '../controllers/authEndpoints';

const router = express.Router();


router.post('/auth/signup',Users.registerUser);

export default router;