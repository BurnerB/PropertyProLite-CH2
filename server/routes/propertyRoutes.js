import express from 'express';
import Property from '../controllers/propertyEndpoints';
import Validation from '../middleware/validation';

const router = express.Router();

router.post('/property', Validation.validateProperty, Property.postProperty);

export default router;