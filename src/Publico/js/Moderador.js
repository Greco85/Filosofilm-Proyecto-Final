$(document).ready(function() {
    
    $('#ContenedorReseñas').on('click', '.btnBorrar', function() {
        const ID_Reseña = $(this).data('id');
    
        const confirmacion = confirm('Estas seguro de que deseas borrar esta reseña??');

        if (confirmacion) {
            // Realizar la solicitud DELETE si se confirma la acción
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/Resena/${ID_Reseña}`,
                success: function(response) {
                    console.log('Reseña borrada con éxito:', response);
                },
                error: function(xhr, status, error) {
                }
            });
        } else {
            // Cancelar la acción si el usuario no confirma
            console.log('La acción de borrado ha sido cancelada.');
        }
    });
    });

    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/Resena',
      success: function(reseñas) {
        reseñas.forEach(function(resena) {
            $.ajax({
                url: 'http://localhost:3000/Pelicula/' + resena.ID_Pelicula,
                method: 'GET',
                success: function(Pelicula) {

                    $.ajax({
                        url: 'http://localhost:3000/Usuario/' + resena.ID_Usuario,
                        method: 'GET',
                        success: function(usuarioData) {
                         
                            const nuevaResena = `
                            <div class="container Reseña">
                              <div class="row">
                                <div class="col-md-6 offset-md-3 d-flex align-items-center">
                                <a href="/PeliculaDetalles-${Pelicula.ID_Pelicula}">
                                <img class="ImagenPelii" src="${Pelicula.imagen}" alt="Imagen de la película" class="mr-3">
                                </a>
                                  <div class="ContornoReseña">
                                    <!-- Primera Fila -->
                                    <div class="d-flex align-items-center">
                                      <div>
                                        <!-- Aquí puedes mostrar la imagen del usuario si tienes la URL -->
                                        <!-- <img src="img/Piper_Rubio.jpg" alt="a" class="ImgUsuarioenReseña border border-2 border-white"> -->
                                      </div>
                                      <div class="UsuarioReseña ms-2">
                                        <a href="">@${usuarioData.Nickname}</a>
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
                                      <small class="text-muted">
                                        Publicado el ${resena.Fecha_Publicacion}
                                      </small>
                                      <!-- Botón para borrar la reseña -->
                                      <button class="btn btn-danger btn-sm btnBorrar" data-id="${resena.ID_Reseña}">Borrar</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          `;
                          $('#ContenedorReseñas').append(nuevaResena);
                
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al obtener el usuario:', status, error);
                        }
                    });

                },
                error: function(xhr, status, error) {
                    console.error('Error al obtener la reseña:', status, error);
                }
            });

          
        });
      },
      error: function(xhr, status, error) {
        console.error('Error al obtener las reseñas:', status, error);
      }
    });



  $('#botonBorrar').on('click', function() {
    // Capturar el ID de la reseña desde el atributo data
    const idReseña = $(this).data('id');

    // Mostrar el ID de la reseña en una ventana de alerta
    alert('ID de la reseña a borrar: ' + idReseña);
});
  
  
  
  