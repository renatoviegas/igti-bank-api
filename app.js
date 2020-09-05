import express from 'express';
import connectionDatabase from './config/database.js';
import accountsRouter from './src/routes/accounts.router.js';

const port = process.env.PORT || 8000;

connectionDatabase
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use('/accounts', accountsRouter);

    app.get('/test', (req, res) => {
      res.send('ok');
    })

    app.listen(port, () => console.log('API Started...'));
  })
  .catch((err) => console.log(err));