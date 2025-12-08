import express, { Request, Response } from 'express';
import { prisma } from './db/prisma-client';

const app = express();
const port = process.env.PORT || 5000;
const userCreate =  async (req:Request, res:Response) => {

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john1@gmail.com',
      password: 'securepassword',

    },
  });
  console.log('User created:', user);
  res.send(user);
}

app.get('/', userCreate);

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
