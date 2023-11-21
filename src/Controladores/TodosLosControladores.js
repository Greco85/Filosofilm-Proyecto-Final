import { getConnection, sql, queries } from "../BasedeDatos/"
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

//INICIO DE LOS CONTROLADORES DE LAS COMPROBACIONES

export const getUsuarioByCorreo = async (req, res) => {
    const {Correo_Electronico} = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('Correo_Electronico', Correo_Electronico).query(queries.getUsaurioByemail);

    res.send(result.recordset)

};

export const LoginUsuario = async (req, res) => {
    const { Correo_Electronico } = req.params;
    const { Contraseña } = req.body; // Obtén la contraseña desde la solicitud POST

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('Correo_Electronico', Correo_Electronico)
            .input('Contraseña', Contraseña)
            .query(queries.Login);

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
            const token = jsonwebtoken.sign({user: UsuarioaRevisar.user},
                process.env.JWT_SECRET,
                {expiresIn:process.env.JWT_EXPIRATION}) //TERMINAR MAÑANA
        } else {
            res.status(401).json({ message: 'Algo incorrecto' }); // Envía un mensaje de error
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en la verificación del inicio de sesión' }); // Manejo de errores
    }
};

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
