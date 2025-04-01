// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { Genero, Persona } from './Modelo/Persona';
import { Auto } from './Modelo/Auto';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(express.json());

let idPersona = 1;
let idAuto = 1;

let autos: Auto[] = [];
let personas: Persona[] = [];


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
    const  id = Number(req.params.id);
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
    autos = autos.filter(auto => auto.dueñoId !== id);

    if(personasFiltradas.length === personas.length){
      res.status(201).json({error: "La personas que quiere eliminar no ha sido encontrada"});
    } else {
      personas = personasFiltradas;
      res.status(400).json({mensaje: "Persona eliminada correctamente"});
    }
  });


//Endpoint Autos
app.get('/autos',(req,res) => {
  const listaDeAutos = autos.map(auto => ({
    marca: auto.marca,
    modelo:auto.modelo,
    año:auto.año,
    patente:auto.patente
}));
res.status(200).json(listaDeAutos);
});

app.get('/autos/:idPersona',(req,res) => {
  const dueñoId = Number(req.params.idPersona);
  const buscarDueño = personas.find(p => p.id === dueñoId);

  if(buscarDueño){
    res.status(200).json(buscarDueño.autos);
  }
  res.json({error:"No se ha encontrado un persona con ese id"});
})

app.get('/autos/:id',(req,res)=> {
  const id = Number(req.params.id);
    const auto = autos.find(a => a.id === id);

    if (auto) {
      res.status(200).json(auto);
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
})

app.put('/autos/:id',(req,res)=> {
    const  id = Number(req.params.id);
    const { marca, modelo, año, patente, color, numeroChasis, motor} = req.body;
    const autoIndex = autos.findIndex(a => a.id === id);

    if (autoIndex !== -1) {
      const autoAct = autos[autoIndex];
  
      autos[autoIndex] = {
        ...autoAct,
        marca : marca ?? autoAct.marca,
        modelo: modelo ?? autoAct.modelo,
        año: año ?? autoAct.año,
        patente: patente ?? autoAct.patente,
        color: color ?? autoAct.color,
        numeroChasis: numeroChasis ?? autoAct.numeroChasis,
        motor: motor ?? autoAct.motor
      };
      res.status(201).json({ mensaje: 'Auto actualizado correctamente', auto: autos[autoIndex] });
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
  });

  app.post('/autos', (req, res) => {
    const { marca, modelo, año, patente, color, numeroChasis, motor, dueñoId } = req.body;
  
    if (!marca || !modelo || !año || !patente || !color || !numeroChasis || !motor || !dueñoId) {
      res.status(400).json({ error: 'Faltan datos necesarios o incorrectos en la solicitud' });
    }
  
    const dueñoExistente = personas.find(p => p.id === dueñoId);
  
    if (!dueñoExistente) {
      res.status(404).json({ error: 'El dueño con el ID proporcionado no existe' });
    } else {
  
    const nuevoAuto = {
      id: idAuto++, 
      marca,
      modelo,
      año,
      patente,
      color,
      numeroChasis,
      motor,
      dueñoId 
    };
  
    autos.push(nuevoAuto);
    dueñoExistente.autos = dueñoExistente.autos || [];  
    dueñoExistente.autos.push(nuevoAuto)
    res.status(200).json({ id: nuevoAuto.id });
  }
  });


app.delete('/autos/:id',(req,res) => {
  const id = Number(req.params.id);
  const autosFiltrados = autos.filter(a => a.id !== id);
  const persona = personas.find(p => p.autos.some(auto => auto.id === id));

    if (persona) {
    persona.autos = persona.autos.filter(auto => auto.id !== id);
  }

  if(autosFiltrados.length === autos.length){
    res.status(200).json({error: "El auto que quiere eliminar no ha sido encontrado"});
  } else {
    autos = autosFiltrados;
    res.status(400).json({mensaje: "Auto eliminado correctamente"});
  }
});

app.get
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});