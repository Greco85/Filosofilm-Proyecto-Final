
    $('#ContenedorPropuestas').on('click', '.btnBorrar', function() {
        const ID_Propuesta = $(this).data('id');
    
        const confirmacion = confirm('¿Estás seguro de que deseas borrar esta propuesta de cambio?');
    
        if (confirmacion) {
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/Error/${ID_Propuesta}`,
                success: function(response) {
                    $('#ContenedorPropuestas').empty();
                    cargarPropuestas();
                },
                error: function(xhr, status, error) {
                    console.error('Error al borrar la propuesta de cambio:', status, error);
                }
            });
        } else {
            console.log('La acción de borrado ha sido cancelada.');
        }
    });

    function cargarPropuestas() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/Error',
        success: function(propuestas) {
            
            propuestas.forEach(function(propuesta) {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/Pelicula/' + propuesta.ID_Pelicula,
                    success: function(dataPelicula) {
                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost:3000/Usuario/' + propuesta.ID_Experto,
                            success: function(dataUsuario) {
                        const CartaModelo = `
                             <div class="card mb-3 mx-auto text-center">
                             <div class="row g-0">
                                 <div class="col-md-4">
                                 <a href="/PeliculaDetalles-${propuesta.ID_Pelicula}">
                                    <img src="${dataPelicula.imagen}" alt="Imagen de la película" class="ImagenPelii">
                                    </a>
                                          </div>
                                         <div class="col-md-8">
                                           <div class="card-body">
                                          <h5 class="card-title">Propuesta de cambio</h5>
                                           <h6 class="card-subtitle mb-2 text-muted">Usuario: ${dataUsuario.Nickname}</h6>
                                           <p class="card-text">Mensaje de error: ${propuesta.Mensaje}</p>
                                            <button type="button" class="btn btn-danger btn-sm btnBorrar" data-id="${propuesta.ID_Error}">Borrar</button>
                                          </div>
                                    </div>
                                 </div>
                             </div>
                                `;
                                $('#ContenedorPropuestas').append(CartaModelo);
                            },
                            error: function(xhr, status, error) {
                                console.error('Error al obtener la información del usuario:', status, error);
                            }
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al obtener la información de la película:', status, error);
                    }
                });
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener las propuestas de cambio:', status, error);
        }
    });
    }


    $(document).ready(function() {
        cargarPropuestas();
    });    
