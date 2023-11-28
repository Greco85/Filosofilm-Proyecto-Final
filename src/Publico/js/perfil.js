$(document).ready(function() {

    const cerrarSesionLink = document.getElementById('cerrarSesionLink');
    cerrarSesionLink.addEventListener('click', function(e) {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/IDusuarioLog',
        success: function (data) {
            if (data.Nickname) {
                $('#nombreUsuario').html('<strong>@' + data.Nickname + '</strong>');
                $('h3.reseñas').text($('h3.reseñas').text() + data.Nickname);
                const Rol = data.ID_Rol;
                if (Rol == 3) {
                    const nuevoLink = $('<li class="nav-item"><a class="nav-link" href="/Moderador"><strong>Moderador</strong></a></li>');
                    $('.nav').prepend(nuevoLink);
                }
                if (Rol == 4) {
                    const nuevoLink = $('<li class="nav-item"><a class="nav-link" href="/Admin"><strong>Administrador</strong></a></li>');
                    $('.nav').prepend(nuevoLink);
                }
            }
        },
        error: function () {
            console.error('Error al obtener el nombre del usuario');
        }
    });

    function mostrarPeliculasEnContenedor(peliculas, contenedor) {
        peliculas.forEach(function(pelicula) {
           $.ajax({
        type: 'GET',
        url: `http://localhost:3000/Pelicula/${pelicula.ID_Pelicula}`,
        success: function(pelicula) {
            console.log(pelicula)
            var EsqueletoCardPelicula = `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <a href="/PeliculaDetalles-${pelicula.ID_Pelicula}"> 
                        <div class="card">
                            <img src="${pelicula.imagen}" class="imgpelicula card-img-top" alt="${pelicula.Titulo}">
                            <div class="d-flex align-items-center">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${pelicula.Titulo}</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            contenedor.append(EsqueletoCardPelicula);
        },
        error: function(error) {
            console.log('Error al obtener la película:', error);
        }
    });
        });
    }
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/IDusuarioLog', 
        success: function (data) {
            $.ajax({
                url: 'http://localhost:3000/Favorito/Usuario/' + data.ID_Usuario, 
                method: 'GET',
                success: function(response) {
                    console.log(response)
                    var contenedorFavoritos = $('#ContenedorFavoritos');
                    mostrarPeliculasEnContenedor(response, contenedorFavoritos);
                },
                error: function(error) {
                    console.log('Error al obtener las películas favoritas:', error);
                }
            });

            $.ajax({
                url: 'http://localhost:3000/Visto/Usuario/' + data.ID_Usuario, 
                method: 'GET',
                success: function(response) {
                    console.log(response)
                    var contenedorVistasRecientes = $('#ContenedorVistasRecientes');
                    mostrarPeliculasEnContenedor(response, contenedorVistasRecientes);
                },
                error: function(error) {
                    console.log('Error al obtener las películas vistas recientemente:', error);
                }
            });
        },
        error: function () {
            console.error('Error al obtener el nombre del usuario');
        }
    });
 
    
  
    
    







});
