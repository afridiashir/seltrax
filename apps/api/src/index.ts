import express, { Request, Response } from 'express';
import morgan from 'morgan';
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/users/users.routes";
import storeRoutes from "./modules/stores/stores.route";
import customerRoutes from "./modules/customers/customers.route";
import domainRoutes from "./modules/domains/domains.route";
import { domain } from 'zod/v4/core/regexes.cjs';

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/stores',storeRoutes);
app.use('/customers', customerRoutes);
app.use('/domains', domainRoutes);



app.get("/", (req, res) => res.status(200).json({ message: "Welcome to the Seltrax API" }));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
