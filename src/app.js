//Para configurar la aplicacion de express
import jsonwebtoken from "jsonwebtoken";
import express from 'express'; // Importa el framework Express
import config from './config'; // Importa el archivo de config para obtener las variables de entorno
import Rutas from './Rutas/TodasLasRutas.js'; // Importa todas las rutas de la aplicación CHECA
import {Metodos as Metodoss} from './Middlewares/Autorizaciones.js';
import cookieParser from 'cookie-parser';
import {ObtenerPerfilUsuario} from './Controladores/TodosLosControladores.js'



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

//Peliculas
app.get("/PeliculaDetalles",Metodoss.SoloLoggeado , (req, res) => res.sendFile(__dirname + "/Paginas/InicioPelicula.html"));


//MODERADOR //FALTA DE PROGRAMAR
app.get("/Moderador", Metodoss.SoloLoggeado, (req, res) => res.sendFile(__dirname + "/Paginas/Moderador.html"));

//ADMINISTRADOR
app.get("/Admin", Metodoss.SoloLoggeado,(req, res) => res.sendFile(__dirname + "/Paginas/Administrador.html"));


//CRUD
app.get("/CRUDPeliculas", Metodoss.SoloLoggeado,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDPeliculas.html"));
app.get("/CRUDActores",Metodoss.SoloLoggeado, (req, res) => res.sendFile(__dirname + "/Paginas/CRUDActores.html"));
app.get("/CRUDDirectores", Metodoss.SoloLoggeado,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDDirectores.html"));
app.get("/CRUDUsuarios", Metodoss.SoloLoggeado,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDUsuarios.html"));
app.get("/CRUDPaises", Metodoss.SoloLoggeado,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDPaises.html"));

//Borjas 
app.get("/Nosotros", (req, res) => res.sendFile(__dirname + "/Paginas/Nosotros.html"));
app.get("/QueEsFF", (req, res) => res.sendFile(__dirname + "/Paginas/QueEsFF.html"));

//Archivos Estaticos Para que lo de arriba pueda agarrar los js y css etcc

app.use(express.static(__dirname + '/Publico'));


// Configura el puerto del servidor usando la configuración o el puerto 3000 por defecto
app.set('port', config.port || 3000);

export default app;