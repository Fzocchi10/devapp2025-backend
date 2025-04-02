import process from 'process';
import app from './app';

const port = process.env.PORT || 9000;

app.get
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});