import { Router } from 'express'
import {getActor , createNewActor, getActorbyid, deleteActor, UpdateActorbyID, 
        getDirectors, createNewDirector, getDirectorbyid, deleteDirector, UpdateDirectorbyID
        , getUsuarios, createNewUsuario, getUsuariobyid, deleteUsuario, UpdateUsuariobyID,
        getReseñas, createNewReseña, getReseñabyid, deleteReseña, UpdateReseñabyID, 
        getAviso, createNewAviso, getAvisobyid, deleteAviso, UpdateAvisobyID,
        getError, createNewError, getErrorbyid, deleteError, UpdateErrorbyID,
        getPelicula, createNewPelicula, getPeliculabyid, deletePelicula, UpdatePeliculabyID
,  getUsuarioByCorreo, getUsuarioByTel, getUsuarioByNickname, getUsuarioByContraseña, LoginUsuario} from '../Controladores/TodosLosControladores.js'

const router = Router()
 
        
//Controladores Usuario

router.get('/Usuario', getUsuarios);

//USANDO PARA REGISTRAR USUARIOS
router.post('/Usuario', createNewUsuario);
router.get('/Usuario/:ID', getUsuariobyid );
router.delete('/Usuario/:ID', deleteUsuario);
router.put('/Usuario/:ID', UpdateUsuariobyID);

//COMPROBACION PARA EL LOGIN
router.post('/Usuario/Verificacion/Correo/:Correo_Electronico', LoginUsuario);

//PRUEBA PARA COMPROBACION DE USUARIO EN EL REGISTRO
router.get('/Usuario/Verificacion/Correo/:Correo_Electronico', getUsuarioByCorreo);
router.get('/Usuario/Verificacion/Telefono/:Telefono', getUsuarioByTel);
router.get('/Usuario/Verificacion/Nickname/:Nickname', getUsuarioByNickname);
router.get('/Usuario/Verificacion/Contrasenas/:Contrasena', getUsuarioByContraseña);

//Controladores Actor

router.get('/Actor', getActor);
router.post('/Actor', createNewActor);
router.get('/Actor/:ID', getActorbyid );
router.delete('/Actor/:ID', deleteActor);
router.put('/Actor/:ID', UpdateActorbyID);


//Controladores Director
router.get('/Director', getDirectors);
router.post('/Director', createNewDirector);
router.get('/Director/:ID', getDirectorbyid );
router.delete('/Director/:ID', deleteDirector);
router.put('/Director/:ID', UpdateDirectorbyID);

//Controladores Reseña
router.get('/Resena', getReseñas);
router.post('/Resena', createNewReseña);
router.get('/Resena/:ID', getReseñabyid );
router.delete('/Resena/:ID', deleteReseña);
router.put('/Resena/:ID', UpdateReseñabyID);

//Controladores Error
router.get('/Error', getError);
router.post('/Error', createNewError);
router.get('/Error/:ID', getErrorbyid );
router.delete('/Error/:ID', deleteError);
router.put('/Error/:ID', UpdateErrorbyID);

//Controladores Aviso
router.get('/Aviso', getAviso);
router.post('/Aviso', createNewAviso);
router.get('/Aviso/:ID', getAvisobyid );
router.delete('/Aviso/:ID', deleteAviso);
router.put('/Aviso/:ID', UpdateAvisobyID);

//Controladores Pelicula
router.get('/Pelicula', getPelicula);
router.post('/Pelicula', createNewPelicula);
router.get('/Pelicula/:ID', getPeliculabyid );
router.delete('/Pelicula/:ID', deletePelicula);
router.put('/Pelicula/:ID', UpdatePeliculabyID);


export default router;