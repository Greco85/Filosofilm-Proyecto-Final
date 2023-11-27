$(document).ready(function() {

  const cerrarSesionLink = document.getElementById('cerrarSesionLink');

  cerrarSesionLink.addEventListener('click', function(e) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
  });

  $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/IDusuarioLog',
      success: function(data) {
          if (data.Nickname) {
              $('#nombreUsuario').html(`<strong>@ ${data.Nickname} </strong>`);
              $('h3.reseñas').text(`Todas las Reseñas de @ ${data.Nickname}`);

              // Obtener las reseñas del usuario por su Nickname
              $.ajax({
                  url: `http://localhost:3000/Resena/Todas/${data.ID_Usuario}`,
                  method: 'GET',
                  success: function(reseñas) {
                      if (Array.isArray(reseñas)) {
                          reseñas.forEach(function(resena) {

                            $.ajax({
                              type: 'GET',
                              url: `http://localhost:3000/Pelicula/${resena.ID_Pelicula}`,
                              success: function(peliculaData) {

                                  const nuevaResena = `
                                  <div class="container Reseña">
                                      <div class="row">
                                          <div class="col-md-6 offset-md-3 d-flex align-items-center">
                                          <img class="ImagenPelii"src="${peliculaData.imagen}" alt="Imagen de la película" class="mr-3">
                                            <div class="ContornoReseña">
                                                  <!-- Primera Fila -->
                                                  <div class="d-flex align-items-center">
                                                      <div>
                                                          <img src="img/Piper_Rubio.jpg" alt="${data.Nickname}" class="ImgUsuarioenReseña border border-2 border-white">
                                                      </div>
                                                      <div class="UsuarioReseña ms-2">
                                                          <a href="/MisResenas">@${data.Nickname}</a>
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
                                                          <button class="BotonLike">Like</button>
                                                          <span class="Likes">10 Likes</span>
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
                              $('.ContenedorReseñas').append(nuevaResena);
                              },
                              error: function(xhr, status, error) {
                                  console.error('Error al obtener la imagen de la película:', status, error);
                              }
                          });

                          });
                      } else {
                          console.log('No se recibieron datos válidos para las reseñas');
                      }
                  },
                  error: function(xhr, status, error) {
                      console.error('Error al obtener las reseñas:', status, error);
                  }
              });
          } else {
              console.log('No se recibió un Nickname válido');
          }
      },
      error: function(xhr, status, error) {
          console.error('Error al obtener el nombre del usuario:', status, error);
      }
  });
});


//NO SIRVE NADOTA