$(document).ready(function() {
    
//CODIGO PARA CERRAR SESION
const cerrarSesionLink = document.getElementById('cerrarSesionLink');

// Agregar un evento de clic al enlace
cerrarSesionLink.addEventListener('click', function(e) {
  // Eliminar la cookie llamada "jwt"
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
});

$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/IDusuarioLog', // Reemplaza la URL con tu ruta correcta
    success: function (data) {
        if (data.Nickname) {
            $('#nombreUsuario').html('<strong>@' + data.Nickname + '</strong>');
        }
    },
    error: function () {
        console.error('Error al obtener el nombre del usuario');
    }
});


    // Función para agregar películas al contenedor
    function mostrarPeliculas(peliculas) {
        var container = $('#ContenedorPeliculas');

        peliculas.forEach(function(pelicula) {
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
            container.append(EsqueletoCardPelicula);
        });
    }

    // Realizar la solicitud AJAX GET
    $.ajax({
        url: 'http://localhost:3000/Pelicula',
        method: 'GET',
        success: function(response) {
            // Mostrar las películas obtenidas en las tarjetas
            mostrarPeliculas(response);
        },
        error: function(error) {
            console.log('Error al obtener las películas:', error);
        }
    });
});