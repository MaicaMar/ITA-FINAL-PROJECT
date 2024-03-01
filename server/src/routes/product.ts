import { Router } from 'express';
import { getProducts } from '../controllers/product';
import validateToken from './validate-token';

const router = Router();
// Usuario ingresa en localhost:3001/api/products, se ejecuta validate token y luego se accede a products
router.get('/', validateToken, getProducts)

export default router;