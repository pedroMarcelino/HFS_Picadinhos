import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import categoryRoutes from './category.routes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', productRoutes);
routes.use('/category', categoryRoutes);


export default routes;