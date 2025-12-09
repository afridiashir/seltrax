import express, { Request, Response } from 'express';
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/users/users.routes";
import storeRoutes from "./modules/stores/stores.route";

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/stores',storeRoutes);



app.get("/", (req, res) => res.send("API Running223"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
