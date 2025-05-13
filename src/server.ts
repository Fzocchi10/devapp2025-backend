import process from 'process';
import app from './app';
const { MongoClient } = require('mongodb');

const url = process.env.DATABASE;
const client = new MongoClient(url);
const dbName = process.env.DATABASE_NAME;

const port = process.env.PORT || 9000;

if(process.env.DATABASE_TYPE === "memory"){
  console.log('Modo memoria activado');
} else {
  async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return 'done.';
  }
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
}


app.get
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});