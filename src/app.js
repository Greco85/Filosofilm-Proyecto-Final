//Para configurar la aplicacion de express
import jsonwebtoken from "jsonwebtoken";
import express from 'express'; // Importa el framework Express
import config from './config'; // Importa el archivo de config para obtener las variables de entorno
import Rutas from './Rutas/TodasLasRutas.js'; // Importa todas las rutas de la aplicación CHECA
import {Metodos as Metodoss} from './Middlewares/Autorizaciones.js';
import cookieParser from 'cookie-parser';
import {ObtenerPerfilUsuario} from './Controladores/TodosLosControladores.js'
const secret = process.env.JWT_SECRET


const app = express(); // Inicializa una instancia de Express
app.use(cookieParser());

// Middlewares para el análisis de solicitudes con datos JSON y codificación de URL
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uso de las rutas definidas en ActorRoutes para la aplicación
app.use(Rutas); 

//RUTAS PARA TODAS LAS PAGINAS
app.get("/",Metodoss.redireccionInicio,(req, res) => res.sendFile(__dirname + "/Paginas/index.html"));
app.get("/registrarse",  (req, res) => res.sendFile(__dirname + "/Paginas/registrarse.html"));
app.get("/Inicio", Metodoss.SoloLoggeado, Metodoss.ExtraerID, (req, res) => res.sendFile(__dirname + "/Paginas/InicioDelUsuario.html"));
app.get("/Perfil", Metodoss.SoloLoggeado, Metodoss.ExtraerID , (req, res) => res.sendFile(__dirname + "/Paginas/perfil.html"));

app.get('/IDusuarioLog', Metodoss.SoloLoggeado, Metodoss.ExtraerID, (req, res) => { //UTIL PARA SACAR EL ID DEL USUARIO
    res.json({ ID_Usuario: req.ID_Usuario});
});

//EXPLORACION DE PELICULAS
app.get("/ExploracionPeliculas", (req, res) => res.sendFile(__dirname + ""));


//MODERADOR
app.get("/Moderador", (req, res) => res.sendFile(__dirname + "/Paginas/Moderador.html"));

//ADMINISTRADOR
app.get("/Admin", (req, res) => res.sendFile(__dirname + "/Paginas/Administrador.html"));
app.get("/PropuestasDeCambio", (req, res) => res.sendFile(__dirname + ""));

//CRUD
app.get("/CRUDPeliculas", (req, res) => res.sendFile(__dirname + "/Paginas/CRUDPeliculas.html"));
app.get("/CRUDActores", (req, res) => res.sendFile(__dirname + "/Paginas/CRUDActores.html"));
app.get("/CRUDDirectores", (req, res) => res.sendFile(__dirname + "/Paginas/CRUDDirectores.html"));
app.get("/CRUDUsuarios", (req, res) => res.sendFile(__dirname + "/Paginas/CRUDUsuarios.html"));
app.get("/CRUDPaises", (req, res) => res.sendFile(__dirname + "/Paginas/CRUDPaises.html"));

//Borjas 
app.get("/Nosotros", (req, res) => res.sendFile(__dirname + "/Paginas/Nosotros.html"));
app.get("/QueEsFF", (req, res) => res.sendFile(__dirname + "/Paginas/QueEsFF.html"));



<<<<<<< HEAD

=======
app.get("/Nosotros", (req, res) => res.sendFile(__dirname + "/Paginas/Nosotros.html"));
app.get("/QueEsFF", (req, res) => res.sendFile(__dirname + "/Paginas/QueEsFF.html"));
>>>>>>> d1a7da7ef64623b6e87fcd7c8f2449610fa0397c

 


//Archivos Estaticos Para que lo de arriba pueda agarrar los js y css etcc

app.use(express.static(__dirname + '/Publico'));


// Configura el puerto del servidor usando la configuración o el puerto 3000 por defecto
app.set('port', config.port || 3000);



export default app;