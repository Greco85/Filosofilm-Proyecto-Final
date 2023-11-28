import { getConnection, sql, queries } from "../BasedeDatos/"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const  getAllPeliculaGenero = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllPeliculaGenero)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const postPeliculaGenero = async (req, res) => {
    const {ID_Pelicula, ID_Genero} = req.body;
    console.log(ID_Pelicula, ID_Genero);
    if (ID_Genero == null || ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Por favor completa todos los campos'});
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("ID_Genero", sql.Int, ID_Genero)
        .input("ID_Pelicula", sql.Int, ID_Pelicula)
        .query(queries.postPeliculaGenero) //Nombre que queramos
        console.log(result);
        res.json({ID_Pelicula, ID_Genero}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};





export const putPeliculaGenero = async (req, res) => {
    const {ID_Pelicula, ID_Genero, Nuevo_ID_Genero, Nuevo_ID_Pelicula } = req.body;
    
    if (ID_Pelicula == null || ID_Genero == null || Nuevo_ID_Genero == null || Nuevo_ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("ID_Genero", sql.Int, ID_Genero)
            .input("ID_Pelicula", sql.Int, ID_Pelicula)
            .input('Nuevo_ID_Genero', sql.Int, Nuevo_ID_Genero) 
            .input('Nuevo_ID_Pelicula', sql.Int, Nuevo_ID_Pelicula)
            .query(queries.UpdatePeliculaGenero);

        res.json({ ID_Genero: Nuevo_ID_Genero, ID_Pelicula: Nuevo_ID_Pelicula});
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const deletePeliculaGenero = async (req, res) => {
    const {ID_Pelicula, ID_Genero} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID_Genero', ID_Genero).input('ID_Pelicula', ID_Pelicula).query(queries.deletePeliculaGenero);

    res.sendStatus(204);
};



export const DarVisto = async (req, res) => {
    const { ID_Usuario, ID_Pelicula ,Fecha_Vista } = req.body;

    if (ID_Usuario == null || ID_Pelicula == null || Fecha_Vista == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("Fecha_Vista", sql.DateTime, Fecha_Vista)
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .input('ID_Pelicula', sql.Int, ID_Pelicula) // Changed to use ID_Reseña from req.body
            .query(queries.DarVisto);

        res.json({ Fecha_Vista, ID_Usuario, ID_Pelicula });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const QuitarVisto = async (req, res) => {
    try {
        const {ID_Pelicula, ID_Usuario} = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID_Usuario', ID_Usuario)
            .input('ID_Pelicula', ID_Pelicula)
            .query(queries.QuitarVisto);

        
        if (result.rowsAffected[0] > 0) {
            res.sendStatus(204); 
        } else {
            res.status(404).send("El like no se encontró o no se pudo eliminar.");
        }
    } catch (error) {
        console.error("Error al eliminar el like:", error);
        res.status(500).send("Error al intentar eliminar el like.");
    }
};


export const  TraerVistosDelUsuario = async(req, res) => {
    try {
        const { ID_Usuario } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('ID_Usuario', ID_Usuario)
            .query(queries.TraerVistosDelUsuario);

        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const DarFav = async (req, res) => {
    const { Fecha_Favorito, ID_Pelicula } = req.body;
    const { ID_Usuario } = req.params;
    if (ID_Usuario == null || ID_Pelicula == null || Fecha_Favorito == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("Fecha_Favorito", sql.DateTime, Fecha_Favorito)
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .input('ID_Pelicula', sql.Int, ID_Pelicula) // Changed to use ID_Reseña from req.body
            .query(queries.DarFavorito);

        res.json({ Fecha_Favorito, ID_Usuario, ID_Pelicula });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const QuitarFav = async (req, res) => {
    try {
        const {ID_Pelicula, ID_Usuario} = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID_Usuario', ID_Usuario)
            .input('ID_Pelicula', ID_Pelicula)
            .query(queries.QuitarFavorito);

        if (result.rowsAffected[0] > 0) {
            res.sendStatus(204); 
        } else {
            res.status(404).send("El like no se encontró o no se pudo eliminar.");
        }
    } catch (error) {
        console.error("Error al eliminar el like:", error);
        res.status(500).send("Error al intentar eliminar el like.");
    }
};

export const TraerFavDelUsuario = async (req, res) => {
    try {
        const { ID_Usuario } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('ID_Usuario', ID_Usuario)
            .query(queries.TraerFavoritosDelUsuario);

        res.json(result.recordset); // Retorna todos los likes de la reseña
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const DarLike = async (req, res) => {
    const { FechaLike, ID_Usuario } = req.body;
    const { ID } = req.params;

    if (FechaLike == null || ID_Usuario == null || ID == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("FechaLike", sql.DateTime, FechaLike)
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .input('ID_Reseña', sql.Int, ID) // Changed to use ID_Reseña from req.body
            .query(queries.DarLike);

        res.json({ FechaLike, ID_Usuario, ID });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const QuitarLike = async (req, res) => {
    try {
        const {ID_Resena, ID_Usuario} = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID_Usuario', ID_Usuario)
            .input('ID_Reseña', ID_Resena)
            .query(queries.QuitarLike);

        // Verificar si se eliminó el like correctamente
        if (result.rowsAffected[0] > 0) {
            res.sendStatus(204); // Indicar éxito (registro eliminado)
        } else {
            res.status(404).send("El like no se encontró o no se pudo eliminar.");
        }
    } catch (error) {
        console.error("Error al eliminar el like:", error);
        res.status(500).send("Error al intentar eliminar el like.");
    }
};

export const TraerLikes = async (req, res) => {
    try {
        const { ID } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('ID', ID)
            .query(queries.TraerLikes);

        res.json(result.recordset); // Retorna todos los likes de la reseña
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const TotalLikes = async (req, res) => {
    try {
        const { ID_Resena } = req.params;
        const pool = await getConnection();
        
        const result = await pool.request()
            .input('ID_Resena', ID_Resena)
            .query(queries.TotalLikes);
        
        const TotalLikes = result.recordset[0].TotalLikes;
        res.json({ TotalLikes });
    } catch (error) {
        res.status(500).send('Error al obtener el total de likes: ' + error.message);
    }
};

export const  TodosLosLikes = async(req, res) => {
    try {
        const { ID_Usuario } = req.params;
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('ID_Usuario', ID_Usuario)
            .query(queries.TodosLosLikes);

        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};




export const  getAllPeliculaClasificacion = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllPeliculaClasificacion)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getAllClasificacion = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllClasificacion)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  PromediarEstrellas = async(req, res) => {
    const { ID_Pelicula } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('ID_Pelicula', ID_Pelicula)
            .query(queries.PromediarEstrellas);

        // Devolver el resultado del promedio de estrellas como JSON
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const  getAllGenero = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllGenero)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getGenerosbyNombre = async(req, res) => {
    
    const {Genero} = req.params;
     
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().input('Genero', sql.VarChar, Genero).query(queries.getIDGenerobyNombre)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getClasificacionbyNombre = async(req, res) => {
    
    const {Clasificacion} = req.params;
     
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().input('Clasificacion', sql.VarChar, Clasificacion).query(queries.getClasificacionbyNombre)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getActorbyNombre = async(req, res) => {
    
    const {Nombre} = req.params;
     
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().input('Nombre', sql.VarChar, Nombre).query(queries.getActorbyNombre)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const  getDirectorbyNombre = async(req, res) => {
    
    const {Nombre} = req.params;
     
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().input('Nombre', sql.VarChar, Nombre).query(queries.getDirectorbyNombre)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};



export const postPeliculaClasificacion = async (req, res) => {
    const {ID_Clasificacion, ID_Pelicula} = req.body;
    console.log(ID_Clasificacion, ID_Pelicula);
    if (ID_Clasificacion == null || ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Por favor completa todos los campos'});
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("ID_Clasificacion", sql.Int, ID_Clasificacion)
        .input("ID_Pelicula", sql.Int, ID_Pelicula)
        .query(queries.postPeliculaClasificacion) //Nombre que queramos
        console.log(result);
        res.json({ID_Clasificacion, ID_Pelicula}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};





export const putPeliculaClasificacion = async (req, res) => {
    const { ID_Clasificacion, ID_Pelicula, Nuevo_ID_Clasificacion, Nuevo_ID_Pelicula } = req.body;
    
    if (ID_Clasificacion == null || ID_Pelicula == null || Nuevo_ID_Clasificacion == null || Nuevo_ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("ID_Clasificacion", sql.Int, ID_Clasificacion)
            .input("ID_Pelicula", sql.Int, ID_Pelicula)
            .input('Nuevo_ID_Clasificacion', sql.Int, Nuevo_ID_Clasificacion) // Nuevo valor para ID_Actor
            .input('Nuevo_ID_Pelicula', sql.Int, Nuevo_ID_Pelicula) // Nuevo valor para ID_Pelicula
            .query(queries.UpdatePeliculaClasificacion);

        res.json({ ID_Clasificacion: Nuevo_ID_Clasificacion, ID_Pelicula: Nuevo_ID_Pelicula });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



export const deletePeliculaClasificacion = async (req, res) => {
    const {ID_Clasificacion, ID_Pelicula} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID_Clasificacion', ID_Clasificacion).input('ID_Pelicula', ID_Pelicula).query(queries.deletePeliculaClasificacion);

    res.sendStatus(204);
};







export const  getActor = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllActors)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const createNewActor = async (req, res) => {
    const {Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Actor} = req.body;
    
    if(Nombre == null || Fecha_Nacimiento == null || Pais_Nacimiento == null || Biografia == null || Foto_Actor == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Nombre", sql.NVarChar, Nombre)
        .input("Fecha_Nacimiento", sql.Date, Fecha_Nacimiento)
        .input("Pais_Nacimiento", sql.Int, Pais_Nacimiento) //MEXICO
        .input("Biografia", sql.Text, Biografia)
        .input("Foto_Actor", sql.NVarChar, Foto_Actor)
    
        .query(queries.createNewActor) //Nombre que queramos
        console.log(result);
        res.json({Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Actor}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getActorbyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getActorByID);

    res.send(result.recordset[0])
};



export const deleteActor = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deleteActor);

    res.sendStatus(204);
};

export const UpdateActorbyID  = async (req, res) => {

    const {Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Actor} = req.body;
    const {ID} = req.params;

    if(Nombre == null || Fecha_Nacimiento == null || Pais_Nacimiento == null || Biografia == null || Foto_Actor == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
    
    await pool.request()
    .input("Nombre", sql.NVarChar, Nombre)
    .input("Fecha_Nacimiento", sql.Date, Fecha_Nacimiento)
    .input("Pais_Nacimiento", sql.Int, Pais_Nacimiento) //MEXICO
    .input("Biografia", sql.Text, Biografia)
    .input("Foto_Actor", sql.NVarChar, Foto_Actor)
    .input("ID", sql.Int, ID)
    .query(queries.UpdateActor);

    res.json({Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Actor});
};

//Controladores Director

export const  getDirectors = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllDirectores)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getAllActorinthemovie = async(req, res) => {
    const {ID_Pelicula} = req.params;
    
    try {
        const pool = await getConnection(); 
        const result = await pool.request().input('ID_Pelicula', ID_Pelicula).query(queries.getAllActorinthemovie)
        res.json(result.recordset)
        
   
   

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getAllDirectorinthemovie = async(req, res) => {
    const {ID_Pelicula} = req.params;
    
    try {
        const pool = await getConnection(); 
        const result = await pool.request().input('ID_Pelicula', ID_Pelicula).query(queries.getAllDirectorinthemovie)
        res.json(result.recordset)
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getAllGenerointhemovie = async(req, res) => {
    const {ID_Pelicula} = req.params;
    
    try {
        const pool = await getConnection(); 
        const result = await pool.request().input('ID_Pelicula', ID_Pelicula).query(queries.getAllGenerointhemovie)
        res.json(result.recordset)
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getAllClasificacioninthemovie = async(req, res) => {
    const {ID_Pelicula} = req.params;
    
    try {
        const pool = await getConnection(); 
        const result = await pool.request().input('ID_Pelicula', ID_Pelicula).query(queries.getAllClasificacioninthemovie)
        res.json(result.recordset)
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const createNewDirector = async (req, res) => {
    const {Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Director} = req.body;
    
    if(Nombre == null || Fecha_Nacimiento == null || Pais_Nacimiento == null || Biografia == null || Foto_Director == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Nombre", sql.NVarChar, Nombre)
        .input("Fecha_Nacimiento", sql.Date, Fecha_Nacimiento)
        .input("Pais_Nacimiento", sql.Int, Pais_Nacimiento) //MEXICO
        .input("Biografia", sql.Text, Biografia)
        .input("Foto_Director", sql.NVarChar, Foto_Director)
    
        .query(queries.createNewDirector) //Nombre que queramos
        console.log(result);
        res.json({Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Director}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getDirectorbyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getDirectorByID);

    res.send(result.recordset[0])
};

export const deleteDirector = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deleteDirector);

    res.sendStatus(204);
};

export const UpdateDirectorbyID  = async (req, res) => {

    const {Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Director} = req.body;
    const {ID} = req.params;

    if(Nombre == null || Fecha_Nacimiento == null || Pais_Nacimiento == null || Biografia == null || Foto_Director == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
    
    await pool.request()
    .input("Nombre", sql.NVarChar, Nombre)
    .input("Fecha_Nacimiento", sql.Date, Fecha_Nacimiento)
    .input("Pais_Nacimiento", sql.Int, Pais_Nacimiento) //MEXICO
    .input("Biografia", sql.Text, Biografia)
    .input("Foto_Director", sql.NVarChar, Foto_Director)
    .input("ID", sql.Int, ID)
    .query(queries.UpdateDirector);

    res.json({Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Director});
};

//USUARIO

export const  getUsuarios = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getallUsuarios)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const createNewUsuario = async (req, res) => {
    const {Nickname, ID_Rol, Correo_Electronico, Contraseña, Nombre,Apellido,Foto_Perfil, Fecha_Registro,Fecha_Nacimiento, Sexo, Telefono, Descripcion} = req.body;
    
    if(Nickname == null || ID_Rol == null || Correo_Electronico == null || Contraseña == null || Apellido == null || Sexo == null || Telefono == null || Fecha_Registro == null ||Nombre == null || Fecha_Nacimiento == null ||  Descripcion == null ){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Nickname", sql.NVarChar, Nickname)
        .input("ID_Rol", sql.Int, ID_Rol)
        .input("Correo_Electronico", sql.NVarChar, Correo_Electronico) //MEXICO
        .input("Contraseña", sql.NVarChar, Contraseña)
        .input("Nombre", sql.NVarChar, Nombre)
        .input("Apellido", sql.NVarChar, Apellido)
        .input("Foto_Perfil", sql.NVarChar, Foto_Perfil)
        .input("Fecha_Registro", sql.Date, Fecha_Registro) //MEXICO
        .input("Fecha_Nacimiento", sql.Date, Fecha_Nacimiento)
        .input("Sexo", sql.NVarChar, Sexo)
        .input("Telefono", sql.NVarChar, Telefono)
        .input("Descripcion", sql.Text, Descripcion)
    
        .query(queries.createNewUsuario) //Nombre que queramos
        console.log(result);
        res.json({Nickname, ID_Rol, Correo_Electronico, Contraseña, Nombre,Apellido,Foto_Perfil, Fecha_Registro,Fecha_Nacimiento, Sexo, Telefono, Descripcion}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getUsuariobyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getUsaurioByID);

    res.send(result.recordset[0])
};

//PERFIL DEL USUARIO

export const ObtenerPerfilUsuario = async (req, res) => {
    const {Nickname} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Nickname', Nickname).query(queries.getPerfilUsuarioLog);

    res.send(result.recordset[0])
};

//FIN DEL PERFIL DEL USUARIO

//INICIO DE LOS CONTROLADORES DE LAS COMPROBACIONES

export const getUsuarioByCorreo = async (req, res) => {
    const {Correo_Electronico} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Correo_Electronico', Correo_Electronico).query(queries.getUsaurioByemail);

    res.send(result.recordset)

};








export const LoginUsuario = async (req, res) => {
    const { Correo_Electronico } = req.params;
    const { Contraseña } = req.body;

    try {
        const pool = await getConnection();
        const request = pool.request();

        const result = await request
            .input('Correo_Electronico', sql.VarChar, Correo_Electronico)
            .input('Contraseña', sql.VarChar, Contraseña)
    .query('SELECT * FROM Usuario WHERE Correo_Electronico = @Correo_Electronico AND Contraseña = @Contraseña');

        if (result.recordset.length > 0) { //Si hay algo entonces
            const Datos = result.recordset[0];

            // Aquí, si las credenciales son correctas, puedes devolver un token como respuesta
            const payload = {
                ID_Usuario: Datos.ID_Usuario, // Suponiendo que tengas un ID de usuario
                ID_Rol: Datos.ID_Rol,
                Nickname: Datos.Nickname // Si tienes información de si es admin
              
            };

            console.log(payload)

        
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
            
            const cookieOption = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                path: "/"
            }

            res.cookie("jwt", token, cookieOption);
            res.send({status: "ok", message: "Usuario Loggeado"})
            console.log(token);

        } else {
            res.status(401).json({ message: 'Datos incorrectos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en la verificación del inicio de sesión' });
    }
};















//FIN DE LA FUNCION



export const getUsuarioByTel = async (req, res) => {
    const {Telefono} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Telefono', Telefono).query(queries.getUsaurioByTel);

    res.send(result.recordset)

};

export const getUsuarioByNickname = async (req, res) => {
    const {Nickname} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Nickname', Nickname).query(queries.getUsaurioByNickname);

   
    

    res.send(result.recordset)

   // res.send(`Número de usuarios encontrados: ${numeroUsuarios}`);

};

export const getUsuarioByContraseña= async (req, res) => {
    const {Contrasena} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Contrasena', Contrasena).query(queries.getUsaurioByContraseña);

    res.send(result.recordset)

   // res.send(`Número de usuarios encontrados: ${numeroUsuarios}`);

};

//FIN DE LOS CONTROLADORES DE LAS COMPROBACIONES


export const deleteUsuario = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deleteUsuario);

    res.sendStatus(204);
};





export const UpdateUsuarioRol  = async (req, res) => {

    const {ID_Rol} = req.body;
    const {ID} = req.params;


    const pool = await getConnection();
        await  pool.request()
        .input("ID_Rol", sql.Int, ID_Rol)
    .input("ID", sql.Int, ID)
    .query(queries.UpdateRolUsuario);

    res.json({ID_Rol});
};

export const UpdateUsuariobyID  = async (req, res) => {

    const {Nickname, ID_Rol, Correo_Electronico, Contraseña, Nombre,Apellido,Foto_Perfil, Fecha_Registro,Fecha_Nacimiento, Sexo, Telefono, Descripcion} = req.body;
    const {ID} = req.params;

    if(Nickname == null || ID_Rol == null || Correo_Electronico == null || Contraseña == null || Apellido == null || Sexo == null || Telefono == null || Fecha_Registro == null ||Nombre == null || Fecha_Nacimiento == null ||  Descripcion == null ){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
        await  pool.request()
        .input("Nickname", sql.NVarChar, Nickname)
        .input("ID_Rol", sql.Int, ID_Rol)
        .input("Correo_Electronico", sql.NVarChar, Correo_Electronico) //MEXICO
        .input("Contraseña", sql.NVarChar, Contraseña)
        .input("Nombre", sql.NVarChar, Nombre)
        .input("Apellido", sql.NVarChar, Apellido)
        .input("Foto_Perfil", sql.NVarChar, Foto_Perfil)
        .input("Fecha_Registro", sql.Date, Fecha_Registro) //MEXICO
        .input("Fecha_Nacimiento", sql.Date, Fecha_Nacimiento)
        .input("Sexo", sql.NVarChar, Sexo)
        .input("Telefono", sql.NVarChar, Telefono)
        .input("Descripcion", sql.Text, Descripcion)
    .input("ID", sql.Int, ID)
    .query(queries.UpdateUsuario);

    res.json({Nickname, ID_Rol, Correo_Electronico, Contraseña, Nombre,Apellido,Foto_Perfil, Fecha_Registro,Fecha_Nacimiento, Sexo, Telefono, Descripcion});
};

//FIN USUARIO

//INICIO RESEÑA

export const  getReseñas = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllResenas)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const createNewReseña = async (req, res) => {
    const {Contenido, Fecha_Publicacion, Calificacion, ID_Usuario, ID_Pelicula} = req.body;
    
    if(Contenido == null || Fecha_Publicacion == null || Calificacion == null || ID_Usuario == null || ID_Pelicula == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Contenido", sql.Text, Contenido)
        .input("Fecha_Publicacion", sql.Date, Fecha_Publicacion)
        .input("Calificacion", sql.Float, Calificacion) //MEXICO
        .input("ID_Usuario", sql.Int, ID_Usuario)
        .input("ID_Pelicula", sql.Int, ID_Pelicula)
        
    
        .query(queries.createNewResena) //Nombre que queramos
        console.log(result);
        res.json({Contenido, Fecha_Publicacion, Calificacion, ID_Usuario, ID_Pelicula}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getReseñabyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getResenaByID);

    res.send(result.recordset[0])
};

export const getTodasReseñabyid = async (req, res) => {
    const {ID_Usuario} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID_Usuario', ID_Usuario).query(queries.getTodasResenaByID);
    res.send(result.recordset)
};

export const deleteReseña = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deleteResena);

    res.sendStatus(204);
};

export const UpdateReseñabyID  = async (req, res) => {

    const {Contenido, Fecha_Publicacion, Calificacion, ID_Usuario, ID_Pelicula} = req.body;
    const {ID} = req.params;

    
    if(Contenido == null || Fecha_Publicacion == null || Calificacion == null || ID_Usuario == null || ID_Pelicula == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
        await  pool.request()
        .input("Contenido", sql.Text, Contenido)
        .input("Fecha_Publicacion", sql.Date, Fecha_Publicacion)
        .input("Calificacion", sql.Float, Calificacion) //MEXICO
        .input("ID_Usuario", sql.Int, ID_Usuario)
        .input("ID_Pelicula", sql.Int, ID_Pelicula)
        .input("ID", sql.Int, ID)
        .query(queries.UpdateResena);

    res.json({Contenido, Fecha_Publicacion, Calificacion, ID_Usuario, ID_Pelicula});
};

//FIN RESEÑA

//INICIO ERROR

export const  getError = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllError)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const createNewError = async (req, res) => {
    const {Mensaje, ID_Experto, ID_Pelicula, Estatus} = req.body;
    
    if(Mensaje == null || ID_Experto == null || ID_Pelicula == null || Estatus == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Mensaje", sql.NVarChar, Mensaje)
        .input("ID_Experto", sql.Int, ID_Experto)
        .input("ID_Pelicula", sql.Int, ID_Pelicula) //MEXICO
        .input("Estatus", sql.Bit, Estatus)
        .query(queries.createNewError) //Nombre que queramos
        console.log(result);
        res.json({Mensaje, ID_Experto, ID_Pelicula, Estatus}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getErrorbyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getErrorByID);

    res.send(result.recordset[0])
};

export const deleteError = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deleteError);

    res.sendStatus(204);
};

export const UpdateErrorbyID  = async (req, res) => {

    const {Mensaje, ID_Experto, ID_Pelicula, Estatus} = req.body;
    const {ID} = req.params;

    
    if(Mensaje == null || ID_Experto == null || ID_Pelicula == null || Estatus == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
        await  pool.request()
        .input("Mensaje", sql.NVarChar, Mensaje)
        .input("ID_Experto", sql.Int, ID_Experto)
        .input("ID_Pelicula", sql.Int, ID_Pelicula) //MEXICO
        .input("Estatus", sql.Bit, Estatus)
        .input("ID", sql.Int, ID)
        .query(queries.UpdateError);

    res.json({Mensaje, ID_Experto, ID_Pelicula, Estatus});
};

//FIN ERROR

//INICIO AVISO

export const  getAviso = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllAviso)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const createNewAviso = async (req, res) => {
    const {Mensaje, ID_Usuario_Receptor, ID_Moderador, Estatus} = req.body;
    
    if(Mensaje == null || ID_Usuario_Receptor == null || ID_Moderador == null || Estatus == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Mensaje", sql.NVarChar, Mensaje)
        .input("ID_Usuario_Receptor", sql.Int, ID_Usuario_Receptor)
        .input("ID_Moderador", sql.Int, ID_Moderador) //MEXICO
        .input("Estatus", sql.Bit, Estatus)
        .query(queries.createNewAviso) //Nombre que queramos
        console.log(result);
        res.json({Mensaje, ID_Usuario_Receptor, ID_Moderador, Estatus}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getAvisobyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getAvisoByID);

    res.send(result.recordset[0])
};

export const deleteAviso = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deleteAviso);

    res.sendStatus(204);
};

export const UpdateAvisobyID  = async (req, res) => {

    const {Mensaje, ID_Usuario_Receptor, ID_Moderador, Estatus} = req.body;
    const {ID} = req.params;

    
    if(Mensaje == null || ID_Usuario_Receptor == null || ID_Moderador == null || Estatus == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
        await  pool.request()
        .input("Mensaje", sql.NVarChar, Mensaje)
        .input("ID_Usuario_Receptor", sql.Int, ID_Usuario_Receptor)
        .input("ID_Moderador", sql.Int, ID_Moderador) //MEXICO
        .input("Estatus", sql.Bit, Estatus)
        .input("ID", sql.Int, ID)
        .query(queries.UpdateAviso);

    res.json({Mensaje, ID_Usuario_Receptor, ID_Moderador, Estatus});
};


//FIN AVISO

//INICIO PELICULA

export const  getPelicula= async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllPelicula)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const createNewPelicula = async (req, res) => {
    const {Titulo, Sinopsis, Fecha_Lanzamiento, Duracion, Presupuesto, imagen, Recaudacion, ID_Pais_Origen} = req.body;
    
    if(Titulo == null || Sinopsis == null || Fecha_Lanzamiento == null || Duracion == null || imagen == null || ID_Pais_Origen == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Titulo", sql.NVarChar, Titulo)
        .input("Sinopsis", sql.Text, Sinopsis)
        .input("Fecha_Lanzamiento", sql.Date, Fecha_Lanzamiento) //MEXICO
        .input("Duracion", sql.Decimal, Duracion)
        .input("Presupuesto", sql.Int, Presupuesto)
        .input("imagen", sql.NVarChar, imagen)
        .input("Recaudacion", sql.Int, Recaudacion) //MEXICO
        .input("ID_Pais_Origen", sql.Int, ID_Pais_Origen)
        .query(queries.createNewPelicula) //Nombre que queramos
        console.log(result);
        res.json({Titulo, Sinopsis, Fecha_Lanzamiento, Duracion, Presupuesto, imagen, Recaudacion,ID_Pais_Origen}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const getPeliculabyid = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID', ID).query(queries.getPeliculaByID);

    res.send(result.recordset[0])
};

export const getAllReseñasPorPelicula = async (req, res) => {
    const {ID_Pelicula} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('ID_Pelicula', ID_Pelicula).query(queries.getAllReseñasPorPelicula);

    res.json(result.recordset)
};



export const deletePelicula = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deletePelicula);

    res.sendStatus(204);
};

export const UpdatePeliculabyID  = async (req, res) => {

    const {Titulo, Sinopsis, Fecha_Lanzamiento, Duracion, Presupuesto, imagen, Recaudacion, ID_Pais_Origen} = req.body;
    const {ID} = req.params;

    
    if(Titulo == null || Sinopsis == null || Fecha_Lanzamiento == null || Duracion == null || imagen == null || ID_Pais_Origen == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }

    const pool = await getConnection();
        await  pool.request()
        .input("Titulo", sql.NVarChar, Titulo)
        .input("Sinopsis", sql.Text, Sinopsis)
        .input("Fecha_Lanzamiento", sql.Date, Fecha_Lanzamiento) //MEXICO
        .input("Duracion", sql.Decimal, Duracion)
        .input("Presupuesto", sql.Int, Presupuesto)
        .input("imagen", sql.NVarChar, imagen)
        .input("Recaudacion", sql.Int, Recaudacion) //MEXICO
        .input("ID_Pais_Origen", sql.Int, ID_Pais_Origen)
        .input("ID", sql.Int, ID)
        .query(queries.UpdatePelicula);

    res.json({Titulo, Sinopsis, Fecha_Lanzamiento, Duracion, Presupuesto, imagen, Recaudacion,ID_Pais_Origen});
};

//FIN PELICULA


export const  getPaises = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllPaises)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};




export const getPeliculaxTitulo = async (req, res) => {
        const {Titulo} = req.params;
        const pool = await getConnection();
        const result = await pool.request().input('Titulo', Titulo).query(queries.getpeliculaxtitulo);
    
        res.send(result.recordset[0])
    };



export const  getAllPeliculaActor = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllPeliculaActor)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const postPeliculaActor = async (req, res) => {
    const {ID_Actor, ID_Pelicula, Personaje} = req.body;
    console.log(ID_Actor, ID_Pelicula, Personaje);
    if (ID_Actor == null || ID_Pelicula == null || Personaje == null) {
        return res.status(400).json({ msg: 'Por favor completa los todos campos: '});
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("ID_Actor", sql.Int, ID_Actor)
        .input("ID_Pelicula", sql.Int, ID_Pelicula)
        .input("Personaje", sql.NVarChar, Personaje)
        .query(queries.postPeliculaActor) //Nombre que queramos
        console.log(result);
        res.json({ID_Actor, ID_Pelicula, Personaje}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};





export const putPeliculaActor = async (req, res) => {
    const { ID_Actor, ID_Pelicula, Personaje, Nuevo_ID_Actor, Nuevo_ID_Pelicula } = req.body;
    
    if (ID_Actor == null || ID_Pelicula == null || Personaje == null || Nuevo_ID_Actor == null || Nuevo_ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        await pool
            .request()
            .input("ID_Actor", sql.Int, ID_Actor)
            .input("ID_Pelicula", sql.Int, ID_Pelicula)
            .input("Personaje", sql.NVarChar, Personaje)
            .input('Nuevo_ID_Actor', sql.Int, Nuevo_ID_Actor) // Nuevo valor para ID_Actor
            .input('Nuevo_ID_Pelicula', sql.Int, Nuevo_ID_Pelicula) // Nuevo valor para ID_Pelicula
            .query(queries.UpdatePeliculaActor);

        res.json({ ID_Actor: Nuevo_ID_Actor, ID_Pelicula: Nuevo_ID_Pelicula, Personaje });
    } catch (error) {
        res.status(500).send(error.message);
    }
};






export const deletePeliculaActor = async (req, res) => {
    const {ID_Actor, ID_Pelicula} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID_Actor', ID_Actor).input('ID_Pelicula', ID_Pelicula).query(queries.deletePeliculaActor);

    res.sendStatus(204);
};


export const  getAllPeliculaDirector  = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllPeliculaDirector )
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};


export const postPeliculaDirector  = async (req, res) => {
    const {ID_Director , ID_Pelicula} = req.body;
    if (ID_Director == null || ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Por favor completa todos los campos'});
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("ID_Director", sql.Int, ID_Director)
        .input("ID_Pelicula", sql.Int, ID_Pelicula)
        .query(queries.postPeliculaDirector) //Nombre que queramos
        console.log(result);
        res.json({ID_Director, ID_Pelicula}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};





export const putPeliculaDirector = async (req, res) => {
    const { ID_Director, ID_Pelicula } = req.params; // Accediendo a los parámetros de la URL
    const { Nuevo_ID_Director, Nuevo_ID_Pelicula } = req.body; // Obteniendo nuevos datos del cuerpo de la solicitud

    if (ID_Director == null || ID_Pelicula == null) {
        return res.status(400).json({ msg: 'Bad request. Por favor, llena todos los campos' });
    }

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('ID_Director', sql.Int, ID_Director)
            .input('ID_Pelicula', sql.Int, ID_Pelicula)
            .input('Nuevo_ID_Director', sql.Int, Nuevo_ID_Director) // Nuevo valor para ID_Director
            .input('Nuevo_ID_Pelicula', sql.Int, Nuevo_ID_Pelicula) // Nuevo valor para ID_Pelicula
            .query(queries.UpdatePeliculaDirector);

        res.json({ ID_Director, ID_Pelicula, Nuevo_ID_Director, Nuevo_ID_Pelicula });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
``






export const deletePeliculaDirector = async (req, res) => {
    const {ID_Director, ID_Pelicula} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID_Director', ID_Director).input('ID_Pelicula', ID_Pelicula).query(queries.deletePeliculaDirector);

    res.sendStatus(204);
};




export const  getPaisesIDbyNombre = async(req, res) => {
    
    const {Nombre} = req.params;
     
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().input('Nombre', sql.VarChar, Nombre).query(queries.getIDPaisbyNombre)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getNombrePaisesbyID = async(req, res) => {
    
    const {ID} = req.params;
     
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().input('ID',sql.Int, ID).query(queries.getNombrePaisesbyID)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const deletePais = async (req, res) => {
    const {ID} = req.params;
    const pool = await getConnection();
    await pool.request().input('ID', ID).query(queries.deletePais);

    res.sendStatus(204);
};


export const postPaises = async (req, res) => {
    const {Nombre, Pais_Imagen} = req.body;
    
    if(Nombre == null || Pais_Imagen == null){
        return res.status(400).json({msg: 'Bad request. Porfavor llena todos los campos'})
    }
    
    try {
        const pool = await getConnection();
        const result = await  pool.request()
        .input("Nombre", sql.VarChar, Nombre)
        .input("Pais_Imagen", sql.NVarChar, Pais_Imagen)
        .query(queries.createNewPais) //Nombre que queramos
        console.log(result);
        res.json({Nombre, Pais_Imagen}); // Objeto JSON como respuesta
    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};

export const  getRoles = async(req, res) => {
    try {
        const pool = await getConnection(); 
        const result = await  pool.request().query(queries.getAllRoles)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
};
