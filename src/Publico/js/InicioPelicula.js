$(document).ready(function() {
    // Cuando se haga clic en el botón "Hacer Reseña"
    $('#botonHacerResena').click(function() {
        // Realizar una solicitud para obtener el ID del usuario logueado
        $.ajax({
            url: 'http://localhost:3000/IDusuarioLog',
            method: 'GET',
            success: function(data) {
                const userID = data.ID_Usuario;

                // Obtener el nombre del usuario
                $.ajax({
                    url: 'http://localhost:3000/Usuario/' + userID,
                    method: 'GET',
                    success: function(usuario) {
                        const nombreUsuario = usuario.nombre;

                        // Colocar el nombre en el formulario de reseña
                        $('#nombreUsuario').val(nombreUsuario);
                        $('#modalResena').modal('show');
                    },
                    error: function(err) {
                        console.error('Error al obtener el nombre del usuario:', err);
                    }
                });
            },
            error: function(err) {
                console.error('Error al obtener el ID del usuario:', err);
            }
        });
    });

    // Cuando se haga clic en el botón "Guardar"
    $('#guardarResena').click(function() {
        const contenidoResena = $('#contenidoResena').val();
        const calificacion = $('#calificacion').val();
    
        // Realizar una solicitud para obtener el ID del usuario logueado
        $.ajax({
            url: 'http://localhost:3000/IDusuarioLog',
            method: 'GET',
            success: function(data) {
                const userID = data.ID_Usuario;
                const peliculaID = 1; // Aquí estableces el ID de la película
    
                const today = new Date();
                const fechaPublicacion = today.toISOString().split('T')[0];
    
                const nuevaResena = {
                    Contenido: contenidoResena,
                    Fecha_Publicacion: fechaPublicacion,
                    Calificacion: calificacion,
                    ID_Usuario: userID,
                    ID_Pelicula: peliculaID
                };
    
                // Ahora puedes hacer la solicitud POST con la información de la reseña
                $.ajax({
                    url: 'http://localhost:3000/Resena',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(nuevaResena),
                    success: function(response) {
                        console.log('Reseña guardada:', response);
                        // Hacer algo más si es necesario después de guardar la reseña
                    },
                    error: function(err) {
                        console.error('Error al guardar la reseña:', err);
                    }
                });
            },
            error: function(err) {
                console.error('Error al obtener el ID del usuario:', err);
            }
        });
    });

    $(document).ready(function() {
        // Al cargar la página, obtener las reseñas
        obtenerResenas();
    
        // Función para obtener las reseñas mediante AJAX
        function obtenerResenas() {
            $.ajax({
                url: 'localhost:3000/Resena',
                method: 'GET',
                success: function(resenas) {
                    generarResenasHTML(resenas);
                },
                error: function(err) {
                    console.error('Error al obtener las reseñas:', err);
                }
            });
        }
    
        // Función para generar el HTML de las reseñas
        function generarResenasHTML(resenas) {
            const contenedorResenas = $('#contenedorResenas');
    
            resenas.forEach((resena) => {
                const nuevaResena = `
                    <div class="container Reseña">
                        <div class="row">
                            <div class="col-md-6 offset-md-3 d-flex align-items-center">
                                <div class="ContornoReseña">
                                    <!-- Primera Fila -->
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <img src="img/Piper_Rubio.jpg" alt="" class="ImgUsuarioenReseña border border-2 border-white">
                                        </div>
                                        <div class="UsuarioReseña ms-2">
                                            <a href="#">@Usuario${resena.ID_Usuario}</a>
                                        </div>
                                        <div class="Estrellas ms-auto">
                                            
                                        </div>
                                    </div>
    
                                    <!-- Segunda Fila -->
                                    <div class="mt-3">
                                        <p>
                                            ${resena.Contenido}
                                        </p>
                                    </div>
    
                                    <!-- Tercera Fila -->
                                    <div class="d-flex align-items-center justify-content-between mt-3">
                                        <div>
                                            <button class="BotonLike">Like</button>
                                            <span class="Likes">10 Likes</span>
                                        </div>
                                        <small class="text-muted">
                                            Publicado el ${formatearFecha(resena.Fecha_Publicacion)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    
                contenedorResenas.append(nuevaResena);
            });
        }
    
        // Función para formatear la fecha
        function formatearFecha(fecha) {
            const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return fechaFormateada;
        }
    });
});