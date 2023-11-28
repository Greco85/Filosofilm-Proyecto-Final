$(document).ready(function() {

    // Función para obtener las reseñas del usuario por su Nickname
    function obtenerReseñasDeUsuario(data) {
        $.ajax({
            url: `http://localhost:3000/Resena/Todas/${data.ID_Usuario}`,
            method: 'GET',
            
            success: function(reseñas) {
                const Nickname = data.Nickname;
                if (Array.isArray(reseñas)) {
                    reseñas.forEach(function(resena) {
                        obtenerDetallesResena(resena , data);
                    });
                } else {
                    console.log('No se recibieron datos válidos para las reseñas');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener las reseñas:', status, error);
            }
        });
    }

    // Función para obtener los detalles de la reseña
    function obtenerDetallesResena(resena , data) {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/Pelicula/${resena.ID_Pelicula}`,
            success: function(peliculaData) {
                obtenerTotalLikes(resena, peliculaData , data);
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener la imagen de la película:', status, error);
            }
        });
    }

    // Función para obtener el total de likes de una reseña
    function obtenerTotalLikes(resena, peliculaData, data) {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/TotalLikes/${resena.ID_Reseña}`,
            success: function(response) {
                mostrarResena(resena, peliculaData, response.TotalLikes , data);
            },
            error: function(error) {
                console.error('Error al obtener el total de likes:', error);
            }
        });
    }

    // Función para mostrar una reseña en la página
    function mostrarResena(resena, peliculaData, TotalLikes, data) {
        
        console.log(data, resena, peliculaData)
        const nuevaResena = `
        <div class="container Reseña">
        <div class="row">
            <div class="col-md-6 offset-md-3 d-flex align-items-center">
            <img class="ImagenPelii" src="${peliculaData.imagen}" alt="Imagen de la película" class="mr-3">
                <div class="ContornoReseña">
                    <!-- Primera Fila -->
                    <div class="d-flex align-items-center">
                        <div>
                            <img src="img/Piper_Rubio.jpg" alt="${data.Nickname}" class="ImgUsuarioenReseña border border-2 border-white">
                        </div>
                        <div class="UsuarioReseña ms-2">
                            <a href="">@${data.Nickname}</a>
                        </div>
                        <div class="ml-3 col-lg-3 estrellas text-center" data-calificacion="${resena.Calificacion}">
                            <!-- ESTRELLAS AÚN NO IMPLEMENTADAS -->
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
                            <button class=" BotonLike BotonLike${resena.ID_Reseña}" data-id="${resena.ID_Reseña}">Like</button>
                            <span class="Likes">${TotalLikes}  Likes</span>
                        </div>
                        <small class="text-muted">
                            Publicado el ${resena.Fecha_Publicacion}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        $('#ContenedorReseñas').append(nuevaResena);
    }

    // Función principal al obtener el usuario logueado
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/IDusuarioLog',
        success: function(data) {
            if (data.Nickname) {
                $('#nombreUsuario').html(`<strong>@ ${data.Nickname} </strong>`);
                $('h3.reseñas').text(`Todas las Reseñas de @ ${data.Nickname}`);
                obtenerReseñasDeUsuario(data);
            } else {
                console.log('No se recibió un Nickname válido');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener el nombre del usuario:', status, error);
        }
    });

    // Código para cerrar sesión
    const cerrarSesionLink = document.getElementById('cerrarSesionLink');
    cerrarSesionLink.addEventListener('click', function(e) {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    });

    function mostrarTodasLasReseñas() {
        // Obtener todas las reseñas almacenadas en la constante nuevaResena
        nuevaResena.forEach(function(resena) {
            $('#ContenedorReseñas').append(resena); // Insertar cada reseña en el contenedor en tu HTML
        });
    }

    mostrarTodasLasReseñas();


});