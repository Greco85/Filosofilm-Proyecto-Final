export const queries = {
    //Actores
    getAllActors: 'SELECT * FROM [DIAGRAMA].[dbo].[Actor]',
    createNewActor: 'INSERT INTO Actor (Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Actor) VALUES (@Nombre, @Fecha_Nacimiento , @Pais_Nacimiento, @Biografia ,@Foto_Actor)',
    getActorByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Actor] WHERE ID_Actor = @ID',
    deleteActor: 'DELETE FROM [DIAGRAMA].[dbo].[Actor] WHERE ID_Actor = @ID',
    UpdateActor: 'UPDATE [DIAGRAMA].[dbo].[Actor] SET Nombre = @Nombre, Fecha_Nacimiento = @Fecha_Nacimiento, Pais_Nacimiento = @Pais_Nacimiento, Biografia = @Biografia, Foto_Actor = @Foto_Actor WHERE ID_Actor = @ID;',
    
    //Directores
    getAllDirectores: 'SELECT * FROM [DIAGRAMA].[dbo].[Director]',
    createNewDirector: 'INSERT INTO Director (Nombre, Fecha_Nacimiento, Pais_Nacimiento, Biografia, Foto_Director) VALUES (@Nombre, @Fecha_Nacimiento , @Pais_Nacimiento, @Biografia ,@Foto_Director)',
    getDirectorByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Director] WHERE ID_Director = @ID',
    deleteDirector: 'DELETE FROM [DIAGRAMA].[dbo].[Director] WHERE ID_Director = @ID',
    UpdateDirector: 'UPDATE [DIAGRAMA].[dbo].[Director] SET Nombre = @Nombre, Fecha_Nacimiento = @Fecha_Nacimiento, Pais_Nacimiento = @Pais_Nacimiento, Biografia = @Biografia, Foto_Director = @Foto_Director WHERE ID_Director = @ID;',


    //Usuarios
    getallUsuarios: 'SELECT * FROM [DIAGRAMA].[dbo].[Usuario]',
    createNewUsuario: 'INSERT INTO Usuario (Nickname, ID_Rol, Correo_Electronico, Contraseña, Nombre,Apellido,Foto_Perfil, Fecha_Registro,Fecha_Nacimiento, Sexo, Telefono, Descripcion) VALUES (@Nickname,@ID_Rol,@Correo_Electronico,@Contraseña,@Nombre,@Apellido,@Foto_Perfil, @Fecha_Registro,@Fecha_Nacimiento,@Sexo,@Telefono,@Descripcion)',
    getUsaurioByID: "SELECT * FROM [DIAGRAMA].[dbo].[Usuario] WHERE ID_Usuario = @ID",
    deleteUsuario: 'DELETE FROM [DIAGRAMA].[dbo].[Usuario] WHERE ID_Usuario = @ID',
    UpdateUsuario: 'UPDATE [DIAGRAMA].[dbo].[Usuario] SET Nickname = @Nickname, ID_Rol = @ID_Rol, Correo_Electronico = @Correo_Electronico, Contraseña = @Contraseña, Nombre = @Nombre, Apellido = @Apellido, Foto_Perfil = @Foto_Perfil, Fecha_Registro = @Fecha_Registro, Fecha_Nacimiento = @Fecha_Nacimiento, Sexo = @Sexo, Telefono = @Telefono, Descripcion = @Descripcion WHERE ID_Usuario = @ID;',
    UpdateRolUsuario: 'UPDATE [DIAGRAMA].[dbo].[Usuario] SET ID_Rol = @ID_Rol WHERE ID_Usuario = @ID;',

    //PERFIL DEL USUARIO LOGGEADO
    getPerfilUsuarioLog: "SELECT * FROM [DIAGRAMA].[dbo].[Usuario] WHERE Nickname = @Nickname",

    //COMPROBACIONES DE EMAIL, NICKNAME Y TELEFONO
    getUsaurioByemail: "SELECT * FROM [DIAGRAMA].[dbo].[Usuario] WHERE Correo_Electronico = @Correo_Electronico",
    getUsaurioByTel: "SELECT * FROM [DIAGRAMA].[dbo].[Usuario] WHERE Telefono = @Telefono",
    getUsaurioByNickname: "SELECT * FROM [DIAGRAMA].[dbo].[Usuario] WHERE Nickname = @Nickname",
    getUsaurioByContraseña: "SELECT * FROM [DIAGRAMA].[dbo].[Usuario] WHERE Contraseña = @Contrasena",
    Login: "SELECT * FROM Usuario WHERE Correo_Electronico = @Correo_Electronico AND Contraseña = @Contraseña ",
    
    
    
    
    
    

     //Reseña
     getAllResenas: 'SELECT * FROM [DIAGRAMA].[dbo].[Reseña]',
     createNewResena: 'INSERT INTO Reseña (Contenido, Fecha_Publicacion, Calificacion, ID_Usuario, ID_Pelicula) VALUES (@Contenido,@Fecha_Publicacion,@Calificacion,@ID_Usuario,@ID_Pelicula)',
     getResenaByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Reseña] WHERE ID_Reseña = @ID',
     deleteResena: 'DELETE FROM [DIAGRAMA].[dbo].[Reseña] WHERE ID_Reseña = @ID',
     UpdateResena: 'UPDATE [DIAGRAMA].[dbo].[Reseña] SET Contenido = @Contenido, Fecha_Publicacion = @Fecha_Publicacion, Calificacion = @Calificacion, ID_Usuario = @ID_Usuario, ID_Pelicula = @ID_Pelicula WHERE ID_Reseña = @ID;',

     getTodasResenaByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Reseña] WHERE ID_Usuario = @ID_Usuario',
     //AVISO
     getAllAviso: 'SELECT * FROM [DIAGRAMA].[dbo].[Aviso]',
     createNewAviso: 'INSERT INTO Aviso (Mensaje, ID_Usuario_Receptor, ID_Moderador, Estatus) VALUES (@Mensaje,@ID_Usuario_Receptor,@ID_Moderador,@Estatus)',
     getAvisoByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Aviso] WHERE ID_Aviso = @ID',
     deleteAviso: 'DELETE FROM [DIAGRAMA].[dbo].[Aviso] WHERE ID_Aviso = @ID',
     UpdateAviso: 'UPDATE [DIAGRAMA].[dbo].[Aviso] SET Mensaje = @Mensaje, ID_Usuario_Receptor = @ID_Usuario_Receptor, ID_Moderador = @ID_Moderador, Estatus = @Estatus WHERE ID_Aviso = @ID;' ,

      //ERROR
      getAllError: 'SELECT * FROM [DIAGRAMA].[dbo].[Error]',
      createNewError: 'INSERT INTO Error (Mensaje, ID_Experto, ID_Pelicula, Estatus) VALUES (@Mensaje,@ID_Experto,@ID_Pelicula,@Estatus)',
      getErrorByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Error] WHERE ID_Error = @ID',
      deleteError: 'DELETE FROM [DIAGRAMA].[dbo].[Error] WHERE ID_Error = @ID',
      UpdateError: 'UPDATE [DIAGRAMA].[dbo].[Error] SET Mensaje = @Mensaje, ID_Experto = @ID_Experto, ID_Pelicula = @ID_Pelicula, Estatus = @Estatus WHERE ID_Error = @ID;' ,

      //PELICULA
      getAllPelicula: 'SELECT * FROM [DIAGRAMA].[dbo].[Pelicula]',
      createNewPelicula: 'INSERT INTO Pelicula (Titulo, Sinopsis, Fecha_Lanzamiento, Duracion, Presupuesto, imagen, Recaudacion, ID_Pais_Origen) VALUES (@Titulo,@Sinopsis,@Fecha_Lanzamiento,@Duracion , @Presupuesto, @imagen, @Recaudacion, @ID_Pais_Origen)',
      getPeliculaByID: 'SELECT * FROM [DIAGRAMA].[dbo].[Pelicula] WHERE ID_Pelicula = @ID',
      deletePelicula: 'DELETE FROM [DIAGRAMA].[dbo].[Pelicula] WHERE ID_Pelicula = @ID',
      UpdatePelicula: 'UPDATE [DIAGRAMA].[dbo].[Pelicula] SET Titulo = @Titulo, Sinopsis = @Sinopsis, Fecha_Lanzamiento = @Fecha_Lanzamiento, Duracion = @Duracion, Presupuesto = @Presupuesto, imagen = @imagen, Recaudacion = @Recaudacion, ID_Pais_Origen = @ID_Pais_Origen WHERE ID_Pelicula = @ID;' ,
      getpeliculaxtitulo: 'SELECT * FROM [DIAGRAMA].[dbo].[Pelicula] WHERE Titulo = @Titulo',

      //Obtener el PAIS
      getAllPaises: 'SELECT * FROM [DIAGRAMA].[dbo].[Pais_Origen]',
      getIDPaisbyNombre: "SELECT ID_Pais FROM [DIAGRAMA].[dbo].[Pais_Origen] WHERE Nombre = @Nombre;",
      getNombrePaisesbyID: "SELECT * FROM [DIAGRAMA].[dbo].[Pais_Origen] WHERE ID_Pais = @ID;",
      createNewPais: 'INSERT INTO Pais_Origen (Nombre, Pais_Imagen) VALUES (@Nombre,@Pais_Imagen)',
      deletePais: 'DELETE FROM [DIAGRAMA].[dbo].[Pais_Origen] WHERE ID_Pais = @ID',


      getIDGenerobyNombre: "SELECT ID_Genero FROM [DIAGRAMA].[dbo].[Genero] WHERE Genero = @Genero;",



      //ROLESS
      getAllRoles: 'SELECT * FROM [DIAGRAMA].[dbo].[Rol]',


      getAllReseñasPorPelicula: 'SELECT * FROM [DIAGRAMA].[dbo].[Reseña] WHERE ID_Pelicula = @ID_Pelicula',

      //ACTOR-PELICULA
      getAllPeliculaActor: 'SELECT * FROM [DIAGRAMA].[dbo].[Actor_Pelicula]',
      postPeliculaActor: "INSERT INTO Actor_Pelicula (ID_Actor, ID_Pelicula, Personaje) VALUES (@ID_Actor,@ID_Pelicula, @Personaje)",
      deletePeliculaActor: 'DELETE FROM [DIAGRAMA].[dbo].[Actor_Pelicula] WHERE ID_Pelicula = @ID_Pelicula AND ID_Actor = @ID_Actor',
      UpdatePeliculaActor: 'UPDATE [DIAGRAMA].[dbo].[Actor_Pelicula] SET ID_Actor = @ID_Actor, ID_Pelicula = @ID_Pelicula, Personaje = @Personaje WHERE ID_Pelicula = @ID_Pelicula AND ID_Actor = @ID_Actor',

    //DIRECTOR-PELICULA
    getAllPeliculaDirector: 'SELECT * FROM [DIAGRAMA].[dbo].[Director_Pelicula]',
    postPeliculaDirector: 'INSERT INTO Director_Pelicula (ID_Director, ID_Pelicula) VALUES (@ID_Director,@ID_Pelicula)',
    deletePeliculaDirector: 'DELETE FROM [DIAGRAMA].[dbo].[Director_Pelicula] WHERE ID_Pelicula = @ID_Pelicula AND ID_Director = @ID_Director',
    UpdatePeliculaDirector: 'UPDATE [DIAGRAMA].[dbo].[Director_Pelicula] SET ID_Director = @Nuevo_ID_Director, ID_Pelicula = @Nuevo_ID_Pelicula WHERE ID_Director = @ID_Director AND ID_Pelicula = @ID_Pelicula',

    //GENERO-PELICULA
    getAllPeliculaGenero: 'SELECT * FROM [DIAGRAMA].[dbo].[Pelicula_Genero]',
    postPeliculaGenero: 'INSERT INTO Pelicula_Genero (ID_Pelicula, ID_Genero) VALUES (@ID_Pelicula, @ID_Genero)',
    deletePeliculaGenero: 'DELETE FROM [DIAGRAMA].[dbo].[Pelicula_Genero] WHERE ID_Pelicula = @ID_Pelicula AND ID_Genero = @ID_Genero',
    UpdatePeliculaGenero: 'UPDATE [DIAGRAMA].[dbo].[Pelicula_Genero] SET ID_Genero = @Nuevo_ID_Genero, ID_Pelicula = @Nuevo_ID_Pelicula WHERE ID_Genero = @ID_Genero AND ID_Pelicula = @ID_Pelicula',

    //CLASIFICACION-PELICULA
    getAllPeliculaClasificacion: 'SELECT * FROM [DIAGRAMA].[dbo].[Clasificacion_Pelicula]',
    postPeliculaClasificacion: 'INSERT INTO Clasificacion_Pelicula (ID_Clasificacion, ID_Pelicula) VALUES (@ID_Clasificacion,@ID_Pelicula)',
    deletePeliculaClasificacion: 'DELETE FROM [DIAGRAMA].[dbo].[Clasificacion_Pelicula] WHERE ID_Pelicula = @ID_Pelicula AND ID_Clasificacion = @ID_Clasificacion',
    UpdatePeliculaClasificacion: 'UPDATE [DIAGRAMA].[dbo].[Clasificacion_Pelicula] SET ID_Clasificacion = @Nuevo_ID_Clasificacion, ID_Pelicula = @Nuevo_ID_Pelicula WHERE ID_Clasificacion = @ID_Clasificacion AND ID_Pelicula = @ID_Pelicula',

    //
    getAllClasificacion: 'SELECT * FROM [DIAGRAMA].[dbo].[Clasificacion]',
    getAllGenero: 'SELECT * FROM [DIAGRAMA].[dbo].[Genero]',


    getAllActorinthemovie: 'SELECT * FROM [DIAGRAMA].[dbo].[Actor_Pelicula] WHERE ID_Pelicula = @ID_Pelicula',
    getAllDirectorinthemovie: 'SELECT * FROM [DIAGRAMA].[dbo].[Director_Pelicula] WHERE ID_Pelicula = @ID_Pelicula',

    PromediarEstrellas: 'SELECT AVG(Calificacion) AS PromedioEstrellas FROM Reseña WHERE ID_Pelicula = @ID_Pelicula;',

    DarLike: 'INSERT INTO [DIAGRAMA].[dbo].[Like] (FechaLike, ID_Usuario, ID_Reseña) VALUES (@FechaLike, @ID_Usuario, @ID_Reseña)',
    TodosLosLikes:'SELECT * FROM [DIAGRAMA].[dbo].[Like]',
    TraerLikes: 'SELECT * FROM [DIAGRAMA].[dbo].[Like] WHERE ID_Reseña = @ID',
}   