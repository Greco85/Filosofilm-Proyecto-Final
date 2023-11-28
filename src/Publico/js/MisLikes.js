$(document).ready(function() {

    const cerrarSesionLink = document.getElementById('cerrarSesionLink');
    cerrarSesionLink.addEventListener('click', function(e) {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    });

    function obtenerLikesDeUsuario(UsuarioLogDatos) {
        $.ajax({
            url: `http://localhost:3000/Like/Usuario/${UsuarioLogDatos.ID_Usuario}`,
            method: 'GET',
            success: function(reseñas) {
                const Nickname = UsuarioLogDatos.Nickname;
                if (Array.isArray(reseñas)) {
                    reseñas.forEach(function(resena) {
                        
                        obtenerDetallesResena(resena, UsuarioLogDatos);
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

    function obtenerDetallesResena(resena, UsuarioLogDatos) {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/Resena/${resena.ID_Reseña}`,
            success: function(reseñaa) {
                console.log("APOCOSI")
                obtenerTotalLikes(resena, reseñaa, UsuarioLogDatos);
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener la reseña:', status, error);
            }
        });
    }

    function obtenerTotalLikes(resena, reseñaa, UsuarioLogDatos) {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/TotalLikes/${resena.ID_Reseña}`,
            success: function(response) {
                mostrarResena(resena, reseñaa, response.TotalLikes, UsuarioLogDatos);
            },
            error: function(error) {
                console.error('Error al obtener el total de likes:', error);
            }
        });
    }

    function mostrarResena(resena, reseñaa, TotalLikes, UsuarioLogDatos) {
        console.log("APOCO SI")
        console.log(TotalLikes)
        console.log("APOCO SI")

        $.ajax({
            url: 'http://localhost:3000/Pelicula/' + reseñaa.ID_Pelicula,
            method: 'GET',
            dataType: 'json', // Tipo de datos esperados en la respuesta
            success: function(DatosPelicula) {
                console.log('Datos de la película:', DatosPelicula);
                
                const nuevaResena = `
            <div class="container Reseña">
            <div class="row">
            <div class="col-md-6 offset-md-3 d-flex align-items-center">
            <img class="ImagenPelii" src="${DatosPelicula.imagen}" alt="Imagen de la película" class="mr-3">
                <div class="ContornoReseña">
                    <!-- Primera Fila -->
                    <div class="d-flex align-items-center">
                        <div>
                            <img src="img/Piper_Rubio.jpg" alt="${UsuarioLogDatos.Nickname}" class="ImgUsuarioenReseña border border-2 border-white">
                        </div>
                        <div class="UsuarioReseña ms-2">
                            <a href="">@${UsuarioLogDatos.Nickname}</a>
                        </div>
                        <div class="ml-3 col-lg-3 estrellas text-center" data-calificacion="${reseñaa.Calificacion}">
                            <!-- ESTRELLAS AÚN NO IMPLEMENTADAS -->
                        </div>
                    </div>

                    <!-- Segunda Fila -->
                    <div class="mt-3">
                        <p>
                            ${reseñaa.Contenido}
                        </p>
                    </div>

                    <!-- Tercera Fila -->
                    <div class="d-flex align-items-center justify-content-between mt-3">
                        <div>
                            <button class=" BotonLike BotonLike${reseñaa.ID_Reseña}" data-id="${reseñaa.ID_Reseña}">Like</button>
                            <span class="Likes">${TotalLikes}  Likes</span>
                        </div>
                        <small class="text-muted">
                            Publicado el ${reseñaa.Fecha_Publicacion}
                        </small>
                    </div>
                </div>
            </div>
        </div>
            </div>
        `;
        $('#ContenedorReseñas').append(nuevaResena);
            },
            error: function(xhr, status, error) {
                console.error('Hubo un problema con la solicitud:', status, error);
            }
        });

        // Aquí puedes construir el HTML para mostrar la reseña
        
    }

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/IDusuarioLog',
        success: function(UsuarioLogDatos) {
            if (UsuarioLogDatos.Nickname) {
                $('#nombreUsuario').html(`<strong>@${UsuarioLogDatos.Nickname} </strong>`);
                $('h3.reseñas').text(`Reseñas a las que @${UsuarioLogDatos.Nickname} ha dado like`);
                obtenerLikesDeUsuario(UsuarioLogDatos);
            } else {
                console.log('No se recibió un Nickname válido');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener el nombre del usuario:', status, error);
        }
    });

});








    


