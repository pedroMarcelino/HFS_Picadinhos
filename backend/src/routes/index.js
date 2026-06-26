import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import categoryRoutes from './category.routes.js';
import addressRoute from './address.routes.js';
import cartRoutes from './cart.routes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', productRoutes);
routes.use('/category', categoryRoutes);
routes.use('/address', addressRoute);
routes.use('/cart', cartRoutes)


export default routes;