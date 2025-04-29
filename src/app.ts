import cors from "cors";
import express from "express";
import helmet from "helmet";
import personaRutas from './Rutas/personasRutas';
import autoRutas from './Rutas/autosRutas';


const app = express();

const corsFrontend = {
  origin: "devapp2025-frontend-production.up.railway.app",
};


app.use(cors(corsFrontend));
app.use(helmet());
app.use(express.json());

app.use('/', personaRutas);
app.use('/',autoRutas)

export default app;