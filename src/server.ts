import process from 'process';
import app from './app';
import dotenv from 'dotenv';
import { PersonaService } from './Services/personaService';
import { autoRepo, ConnectMemoryDB, ConnectMongoDB, personaRepo } from './inyeccionBBDD';
import { AutoService } from './Services/autoService';
dotenv.config();

const port = process.env.PORT || 9000;
export let personaService: PersonaService;
export let autosService: AutoService;

async function main() {
  if(process.env.DATABASE_TYPE === "memory"){
    ConnectMemoryDB();
    console.log('Modo memoria activado');
  } else {
    await ConnectMongoDB();
    console.log('Modo mongoDB activado');
  }
  personaService = new PersonaService(personaRepo);
  autosService = new AutoService(autoRepo);

  app.get
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
  });
}

main().catch((err) => {
  console.error('Error iniciando la aplicación:', err);
});
