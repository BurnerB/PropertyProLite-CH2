import express from 'express';
import Property from '../controllers/propertyEndpoints';
import Validation from '../middleware/validation';
import auth from '../middleware/auth';
import agent from '../middleware/agent';

const router = express.Router();

router.post('/property', [auth, agent], Validation.validateProperty, Property.postProperty);

export default router;