import { Router } from 'express'
import {getActor , createNewActor, getActorbyid, deleteActor, UpdateActorbyID, 
        getDirectors, createNewDirector, getDirectorbyid, deleteDirector, UpdateDirectorbyID
        , getUsuarios, createNewUsuario, getTodasReseñabyid,getUsuariobyid, deleteUsuario, UpdateUsuariobyID,
        getReseñas, createNewReseña, getReseñabyid, deleteReseña, UpdateReseñabyID, 
        getAviso, createNewAviso, getAvisobyid, deleteAviso, UpdateAvisobyID,
        getError, createNewError, getErrorbyid, deleteError, UpdateErrorbyID,
        getPelicula, createNewPelicula, getPeliculabyid, deletePelicula, UpdatePeliculabyID
,  getUsuarioByCorreo, getUsuarioByTel, getUsuarioByNickname, getAllPeliculaActor,getUsuarioByContraseña, LoginUsuario, 
ObtenerPerfilUsuario,getAllReseñasPorPelicula, getPeliculaxTitulo,
 getPaises, deletePeliculaDirector, getPaisesIDbyNombre,putPeliculaDirector,getAllDirectorinthemovie,getAllActorinthemovie, getNombrePaisesbyID,postPeliculaDirector,getAllPeliculaDirector, postPaises, putPeliculaActor, postPeliculaActor, deletePeliculaActor, deletePais,getRoles, UpdateUsuarioRol,
 getAllPeliculaClasificacion,postPeliculaClasificacion,putPeliculaClasificacion,getGenerosbyNombre,deletePeliculaClasificacion,
 getAllPeliculaGenero, postPeliculaGenero,putPeliculaGenero,deletePeliculaGenero,
 getAllGenero, getAllClasificacion , PromediarEstrellas, TodosLosLikes,TraerLikes, DarLike, QuitarLike} from '../Controladores/TodosLosControladores.js'

const router = Router()
 



        
//ROLESSS
router.get('/Roles', getRoles);


//Controladores Usuario
router.get('/Usuario', getUsuarios);

//PERFIL DEL USUARIO
router.get('/Perfil/:Niaaaaackname', ObtenerPerfilUsuario );


//USANDO PARA REGISTRAR USUARIOS
router.post('/Usuario', createNewUsuario);
router.get('/Usuario/:ID', getUsuariobyid );
router.delete('/Usuario/:ID', deleteUsuario); 
router.put('/Usuario/:ID', UpdateUsuariobyID);
router.put('/Usuario/Cambiar/:ID', UpdateUsuarioRol )

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

router.get('/Resena/Todas/:ID_Usuario', getTodasReseñabyid );

router.get('/Resena/Pelicula/:ID_Pelicula', getAllReseñasPorPelicula);

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


router.put('/Pelicula/:ID', UpdatePeliculabyID)
router.post('/Pelicula', createNewPelicula);
router.delete('/Pelicula/:ID', deletePelicula);
router.get('/Pelicula/:ID', getPeliculabyid );
router.get('/Pelicula/Titulo/:Titulo', getPeliculaxTitulo);
//DETALLES DE LA PELICULA


router.get('/Pais_Origen', getPaises);
router.post('/Pais_Origen', postPaises);
router.get('/Pais_Origen/:Nombre', getPaisesIDbyNombre);
router.get('/Pais_Origen/ID/:ID', getNombrePaisesbyID);
router.delete('/Pais_Origen/ID/:ID', deletePais);



//COSAS DE LAS TABLAS N:M

//ACTOR - PELICULA 
router.get('/Pelicula-Actor/:ID_Pelicula', getAllActorinthemovie);
router.get('/Pelicula-Actor', getAllPeliculaActor);
router.post('/Pelicula-Actor', postPeliculaActor);
router.put('/Pelicula-Actor/:ID_Actor/:ID_Pelicula', putPeliculaActor);
router.delete('/Pelicula-Actor/:ID_Actor/:ID_Pelicula', deletePeliculaActor);

//DIRECTOR - PELICULA 
router.get('/Pelicula-Director/:ID_Pelicula', getAllDirectorinthemovie);
router.get('/Pelicula-Director', getAllPeliculaDirector);
router.post('/Pelicula-Director', postPeliculaDirector);
router.put('/Pelicula-Director/:ID_Director/:ID_Pelicula', putPeliculaDirector);
router.delete('/Pelicula-Director/:ID_Director/:ID_Pelicula', deletePeliculaDirector);

// LIKE : USUARIO - RESEÑA 


// FAVORITA : USUARIO - PELICULA 


// VISTO: ACTOR - PELICULA 

// CLASIFICACION - PELICULA
router.get('/Pelicula-Clasificacion', getAllPeliculaClasificacion);
router.post('/Pelicula-Clasificacion', postPeliculaClasificacion);
router.put('/Pelicula-Clasificacion/:ID_Clasificacion/:ID_Pelicula', putPeliculaClasificacion);
router.delete('/Pelicula-Clasificacion/:ID_Clasificacion/:ID_Pelicula', deletePeliculaClasificacion);

//GENERO - PELICULA
router.get('/Pelicula-Genero', getAllPeliculaGenero);
router.post('/Pelicula-Genero', postPeliculaGenero);
router.put('/Pelicula-Genero/:ID_Genero/:ID_Pelicula', putPeliculaGenero);
router.delete('/Pelicula-Genero/:ID_Genero/:ID_Pelicula', deletePeliculaGenero);

//GENERO 
router.get('/Genero', getAllGenero);
router.get('/Genero/:Genero', getGenerosbyNombre);

//Clasificacion
router.get('/Clasificacion', getAllClasificacion);

//ESTRELLAS
router.get('/Estrellas/:ID_Pelicula', PromediarEstrellas);


//LIKESSSSSS
router.get('/Like/:ID', TraerLikes);
router.get('/Like', TodosLosLikes);
router.put('/Like/:ID', DarLike);
router.delete('/Like/:ID/:ID_Usuario', QuitarLike);

export default router;