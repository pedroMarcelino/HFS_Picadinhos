import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import categoryRoutes from './category.routes.js';
import adressRoute from './address.routes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', productRoutes);
routes.use('/category', categoryRoutes);
routes.use('/adress', adressRoute);


export default routes;