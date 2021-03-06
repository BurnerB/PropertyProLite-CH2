import express from 'express';
import fileUpload from 'express-fileupload';
import Property from '../controllers/propertyEndpoints';
import Validation from '../middleware/advertValidation';
import auth from '../middleware/auth';
import agent from '../middleware/agent';

const router = express.Router();
router.use(fileUpload({
  useTempFiles: true,
}));


router.post('/property', [auth, agent], Validation.validateProperty, Property.postProperty);
router.patch('/property/:property_id', [auth, agent], Validation.validateUpdateProperty, Property.updateProperty);
router.patch('/property/:property_id/sold', [auth, agent], Property.markSold);
router.delete('/property/:property_id', [auth, agent], Property.deleteAdvert);
router.get('/properties', Property.allAdverts);
router.get('/property', Property.specificType);
router.get('/property/:property_id', Property.specificAdvert);
router.patch('/property/:property_id/fraudulent', auth, Validation.validateReport, Property.reportProperty);

export default router;