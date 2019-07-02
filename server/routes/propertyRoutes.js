import express from 'express';
import Property from '../controllers/propertyEndpoints';
import Validation from '../middleware/validation';
import auth from '../middleware/auth';
import agent from '../middleware/agent';

const router = express.Router();

router.post('/property', [auth, agent], Validation.validateProperty, Property.postProperty);
router.patch('/property/:property_id', [auth, agent], Validation.validateUpdateProperty, Property.updateProperty);
router.patch('/property/:property_id/sold', [auth, agent], Property.markSold);
router.delete('/property/:property_id', [auth, agent], Property.deleteAdvert);
router.get('/property', Property.allAdverts);

export default router;