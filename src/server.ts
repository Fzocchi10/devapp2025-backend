// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { Genero, Persona } from './Modelo/Persona';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(express.json());

let idPersona = 2;
let personas: Persona[] = [
    {
            id: 1,
            nombre: 'Juan',
            apellido: 'Perez',
            dni: '20348784',
            fechaNacimiento: new Date ('1980-10-20'),
            genero: Genero.Masculino,
            donanteDeOrganos: false,
            autos:  [
                {
                    marca: 'Chevrolet',
                    modelo: 'Corsa',
                    año: 2010,
                    patente: 'ARG010',
                    color: 'Gris',
                    numeroChasis: '87052',
                    motor: 'FFAANN',
                    dueñoId: '1',
                    id: 1
                }
            ]
        }
];


// Mis endpoints van acá
app.get('/', (req, res) => {
    res.json('Hello world');
})


//Endpoint Personas
app.get('/persona', (req, res) => {
    const listaDePersonas = personas.map(persona => ({
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido
    }));
    res.status(200).json(listaDePersonas);
});


app.get('/persona/:id', (req, res) => {
    const id = Number(req.params.id);
    const persona = personas.find(p => p.id === id);

    if (persona) {
      res.status(200).json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  });

  app.put('/persona/:id', (req, res) => {
    const  id = Number(req.params);
    const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;

    //findIndex devuelve la posicion en la lista, si no existe devuelve menos 1
    const personaIndex = personas.findIndex(p => p.id === id);

    if (personaIndex !== -1) {
      //Creo una copia de la misma persona
      const personaAct = personas[personaIndex];
      //Modifico los valores
      personas[personaIndex] = {
        //...personaAct: Esto es spread operator. Lo que hace es copiar todas las propiedades actuales de personaAct en el nuevo objeto
        ...personaAct,
        //Operador ?? si es el valor que se pasa en la request es valido toma el de la izquierda sino el de la derecha
        nombre: nombre ?? personaAct.nombre,
        apellido: apellido ?? personaAct.apellido,
        dni: dni ?? personaAct.dni,
        fechaNacimiento: fechaNacimiento ?? personaAct.fechaNacimiento,
        genero: genero ?? personaAct.genero,
        donanteDeOrganos: donanteDeOrganos ?? personaAct.donanteDeOrganos,
      };
      res.status(201).json({ mensaje: 'Persona actualizada correctamente', persona: personas[personaIndex] });
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  });

  app.post('/persona', (req, res) => {
    const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;
  
    if (!nombre || !apellido || !dni || !fechaNacimiento || !genero || typeof donanteDeOrganos === 'undefined') {
      res.status(400).json({ error: 'Faltan datos necesarios o incorrectos en la solicitud' });
    }else{
      const nuevaPersona = {
        id: idPersona++, 
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        genero,
        donanteDeOrganos,
        autos: [] 
      };
    
      personas.push(nuevaPersona); 
      res.status(200).json({ id: nuevaPersona.id });  
    }
  });

  app.delete('/persona/:id',(req,res) => {
    const id = Number(req.params.id);
    const personasFiltradas = personas.filter(p => p.id !== id);

    if(personasFiltradas.length === personas.length){
      res.json({error: "La personas que quiere eliminar no ha sido encontrada"});
    } else {
      personas = personasFiltradas;
      res.json({mensaje: "Persona eliminada correctamente"});
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});