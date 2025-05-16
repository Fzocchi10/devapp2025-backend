import process from 'process';
import app from './app';
import dotenv from 'dotenv';
import { mongoPersonaRepository } from './Repositories/mongo/mongoPersonaRepository';
import { mongoAutoRepository } from './Repositories/mongo/mongoAutoRepository';
import { Db } from 'mongodb';
import { PersonaService } from './Services/personaService';
import { autoRepo, ConnectMemoryDB, ConnectMongoDB, personaRepo } from './inyeccionBBDD';
import { AutoService } from './Services/autoService';
dotenv.config();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 9000;
export let personaService: PersonaService;
export let autosService: AutoService;


if(process.env.DATABASE_TYPE === "memory"){
  ConnectMemoryDB();

  personaService = new PersonaService(personaRepo);
  autosService = new AutoService(autoRepo);
  
  console.log('Modo memoria activado');
} else {
  ConnectMongoDB();

  personaService = new PersonaService(personaRepo);
  autosService = new AutoService(autoRepo);
  
  console.log('Modo mongo activado');
}


app.get
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});