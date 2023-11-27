//Para configurar la aplicacion de express
import express from 'express'; // Importa el framework Express
import config from './config'; // Importa el archivo de config para obtener las variables de entorno
import Rutas from './Rutas/TodasLasRutas.js'; // Importa todas las rutas de la aplicación CHECA
import {Metodos as Metodoss} from './Middlewares/Autorizaciones.js';
import cookieParser from 'cookie-parser';




const app = express(); // Inicializa una instancia de Express
app.use(cookieParser());

// Middlewares para el análisis de solicitudes con datos JSON y codificación de URL
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uso de las rutas definidas en ActorRoutes para la aplicación
app.use(Rutas); 

//RUTAS PARA TODAS LAS PAGINAS

//SIN TENER INICIAR SESION
app.get("/",Metodoss.redireccionInicio,(req, res) => res.sendFile(__dirname + "/Paginas/index.html"));
app.get("/registrarse",  (req, res) => res.sendFile(__dirname + "/Paginas/registrarse.html"));
app.get("/Nosotros", (req, res) => res.sendFile(__dirname + "/Paginas/Nosotros.html"));
app.get("/QueEsFF", (req, res) => res.sendFile(__dirname + "/Paginas/QueEsFF.html"));


//SIN SOLO TENIENDO LA SESION ACTIVA
app.get("/Inicio", Metodoss.SoloLoggeado, Metodoss.ExtraerID, (req, res) => res.sendFile(__dirname + "/Paginas/InicioDelUsuario.html"));
app.get("/Perfil",Metodoss.SoloLoggeado, (req, res) => res.sendFile(__dirname + "/Paginas/perfil.html"));
app.get("/MisLikes",Metodoss.SoloLoggeado, (req, res) => res.sendFile(__dirname + "/Paginas/MisLikes.html"));
app.get("/MisResenas",Metodoss.SoloLoggeado, (req, res) => res.sendFile(__dirname + "/Paginas/MisResenas.html"));
app.get("/MiInformacion",Metodoss.SoloLoggeado, (req, res) => res.sendFile(__dirname + "/Paginas/Miinformacion.html"));

app.get('/IDusuarioLog', Metodoss.ExtraerID, (req, res) => { //UTIL PARA SACAR EL ID DEL USUARIO
    res.json({ ID_Rol: req.ID_Rol,
    ID_Usuario: req.ID_Usuario,
    Nickname: req.Nickname});
});

app.get('/IDPelicula', Metodoss.ExtraerID, (req, res) => { //UTIL PARA SACAR EL ID DE LA PELICULA?????
    res.json({ ID_Rol: req.ID_Rol,
    ID_Usuario: req.ID_Usuario});
});

//Peliculas
app.get("/PeliculaDetalles-:ID_Pelicula", Metodoss.SoloLoggeado, (req, res) => {
    const ID_Pelicula = req.params.ID_Pelicula;
    res.sendFile(__dirname + "/Paginas/InicioPelicula.html");
});



app.get("/Exploracion",Metodoss.SoloLoggeado , (req, res) => res.sendFile(__dirname + "/Paginas/ExplorarPeliculas.html"));


//ADMINISTRADOR Y MODERADOR
app.get("/Admin",Metodoss.SoloLoggeado,Metodoss.SoloAdmin, (req, res) => res.sendFile(__dirname + "/Paginas/Administrador.html"));
app.get("/Moderador",Metodoss.SoloLoggeado, Metodoss.SoloModerador, (req, res) => res.sendFile(__dirname + "/Paginas/Moderador.html"));

//CRUD
app.get("/CRUDPeliculas",Metodoss.SoloLoggeado, Metodoss.SoloAdmin,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDPeliculas.html"));
app.get("/CRUDActores",Metodoss.SoloLoggeado,Metodoss.SoloAdmin, (req, res) => res.sendFile(__dirname + "/Paginas/CRUDActores.html"));
app.get("/CRUDDirectores", Metodoss.SoloLoggeado,Metodoss.SoloAdmin,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDDirectores.html"));
app.get("/CRUDUsuarios", Metodoss.SoloLoggeado,Metodoss.SoloAdmin,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDUsuarios.html"));
app.get("/CRUDPaises",Metodoss.SoloLoggeado, Metodoss.SoloAdmin,(req, res) => res.sendFile(__dirname + "/Paginas/CRUDPaises.html"));
app.get("/PropuestasDeCambio",Metodoss.SoloLoggeado, Metodoss.SoloAdmin, (req, res) => res.sendFile(__dirname + "/Paginas/Propuestasdecambio.html"));


//Archivos Estaticos Para que lo de arriba pueda agarrar los js y css etcc

app.use(express.static(__dirname + '/Publico'));


// Configura el puerto del servidor usando la configuración o el puerto 3000 por defecto
app.set('port', config.port || 3000);

export default app;