import cors from "cors";
import express from "express";
import helmet from "helmet";
import personaRutas from './Rutas/personasRutas';
import autoRutas from './Rutas/autosRutas';


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', personaRutas);
app.use('/',autoRutas)

export default app;