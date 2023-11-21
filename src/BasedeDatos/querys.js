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

}