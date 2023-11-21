//Para configurar la aplicacion de express

import express from 'express'; // Importa el framework Express
import config from './config'; // Importa el archivo de config para obtener las variables de entorno
import Rutas from './Rutas/TodasLasRutas'; // Importa todas las rutas de la aplicación CHECA
const app = express(); // Inicializa una instancia de Express

// Middlewares para el análisis de solicitudes con datos JSON y codificación de URL
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uso de las rutas definidas en ActorRoutes para la aplicación
app.use(Rutas); 

//RUTAS PARA TODAS LAS PAGINAS
app.get("/", (req, res) => res.sendFile(__dirname + "/Paginas/index.html"));
app.get("/registrarse", (req, res) => res.sendFile(__dirname + "/Paginas/registrarse.html"));
/*
app.get("/registrarse", (req, res) => res.sendFile(__dirname + "/Paginas/registrarse.html")); //ADMIN
*/
 


//Archivos Estaticos Para que lo de arriba pueda agarrar los js y css etcc

app.use(express.static(__dirname + '/Publico'));


// Configura el puerto del servidor usando la configuración o el puerto 3000 por defecto
app.set('port', config.port || 3000);



export default app;