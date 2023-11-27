$(document).ready(function() {


    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/IDusuarioLog', // Reemplaza la URL con tu ruta correcta
        success: function (data) {
            if (data.Nickname) {
                $('#nombreUsuario').html('<strong>@' + data.Nickname + '</strong>');
                $('h3.reseñas').text($('h3.reseñas').text() + data.Nickname);
            }
        },
        error: function () {
            console.error('Error al obtener el nombre del usuario');
        }
    });


    // Obtener el ID_Pelicula de la URL
    const url = window.location.pathname; // Obtiene la ruta de la URL
    const partes = url.split('-'); // Divide la ruta por el guion (-)
    let ID_Pelicula = partes[1]; // Toma la segunda parte como el ID_Pelicula
    console.log('ID de la película:', ID_Pelicula);

    $.ajax({
        url: 'http://localhost:3000/Estrellas/' + ID_Pelicula,
        method: 'GET',
        success: function(data) {
            const promedio = data[0].PromedioEstrellas;
            const redondeado = Math.round(promedio * 2) / 2; // Redondear al múltiplo más cercano de 0.5
            console.log(redondeado)
            const estrellasDiv = $('.estrellas'); // Elemento donde se mostrarán las estrellas
            estrellasDiv.attr('data-calificacion', redondeado); // Establecer el valor redondeado como el data-calificacion
        },
        error: function(error) {
            console.error('Error al obtener el promedio de estrellas:', error);
        }
    });
    
    

    $.ajax({
        url: `http://localhost:3000/Pelicula/${ID_Pelicula}`,
        method: 'GET',
        success: function(pelicula) {
            // Rellenar los contenedores con los datos de la película
            $('.imgpelicula').attr('src', pelicula.imagen).attr('alt', "Pelicula-"+ pelicula.Titulo);
            $('#TituloPelicula').text(pelicula.Titulo);
            $('#Sinopsis').text(pelicula.Sinopsis);
            $('#Presupuesto').text(pelicula.Presupuesto);
            $('#Recaudacion').text(pelicula.Recaudacion);
            $('#Duracion').text(pelicula.Duracion);
            const FechaRara = pelicula.Fecha_Lanzamiento;
            const Fecha = FechaRara.split('T')[0];
            $('#AñoEstreno').text(Fecha);
        },
        error: function(err) {
            console.error('Error al obtener la información de la película:', err);
        }
    });

    $.ajax({
        url: 'http://localhost:3000/Pelicula-Actor/' + ID_Pelicula,
        method: 'GET',
        success: function(data) {
            data.forEach(function(actorData) {
                const ActorID = actorData.ID_Actor;
                $.ajax({
                    url: 'http://localhost:3000/Actor/' + ActorID,
                    method: 'GET',
                    success: function(DatosActor) {
                        // Trabaja con los datos del actor recibidos en 'DatosActor'
                        console.log('Datos del actor:', DatosActor);
                        // Crea la estructura de la tarjeta con los datos del actor
                        const card = `
                            <div class="col-xs-12 col-sm-6 col-lg-3 mb-3">
                                <div class="card bg-dark text-white CartaReparto">
                                    <img src="${DatosActor.Foto_Actor}" class="ImgReparto card-img-top mx-auto border border-3 border-white mt-3 mb-3" alt="...">
                                    <div class="d-flex align-items-center">
                                        <div class="card-body h-100">
                                            <h5 class="card-title text-center text-white">Actor: ${DatosActor.Nombre}</h5>
                                            <h5 class="card-title text-center text-white">Personaje: ${actorData.Personaje}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        // Agrega la tarjeta al contenedor
                        $('.ContenedorActores').append(card);
                    },
                    error: function(error) {
                        console.error('Error al obtener los datos del actor:', error);
                    }
                });
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });

    $.ajax({
        url: 'http://localhost:3000/Pelicula-Director/' + ID_Pelicula,
        method: 'GET',
        success: function(data) {
            data.forEach(function(directorData) {
                const DirectorID = directorData.ID_Director;
                $.ajax({
                    url: 'http://localhost:3000/Director/' + DirectorID,
                    method: 'GET',
                    success: function(DatosDirector) {
                        // Trabaja con los datos del director recibidos en 'DatosDirector'
                        console.log('Datos del director:', DatosDirector);
                        // Crea la estructura de la tarjeta con los datos del director
                        const card = `
                            <div class="col-xs-12 col-sm-6 col-lg-3 mb-3">
                                <div class="card bg-dark text-white CartaReparto">
                                    <img src="${DatosDirector.Foto_Director}" class="ImgReparto card-img-top mx-auto border border-3 border-white mt-3 mb-3" alt="...">
                                    <div class="d-flex align-items-center">
                                        <div class="card-body h-100">
                                            <h5 class="card-title text-center text-white">Director: ${DatosDirector.Nombre}</h5>
                                            <!-- Puedes agregar más información aquí si es necesario -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        // Agrega la tarjeta al contenedor
                        $('.ContenedorDirectores').append(card);
                    },
                    error: function(error) {
                        console.error('Error al obtener los datos del director:', error);
                    }
                });
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });

    //CODIGO PARA CERRAR SESION
    const cerrarSesionLink = document.getElementById('cerrarSesionLink');

    // Agregar un evento de clic al enlace
    cerrarSesionLink.addEventListener('click', function(e) {
    // Evitar que el enlace ejecute su comportamiento predeterminado (navegar a otra página)
    e.preventDefault();
    // Eliminar la cookie llamada "jwt"
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
    });

    // Cuando se haga clic en el botón "Hacer Reseña"
    $('#botonHacerResena').click(function() {
        // Realizar una solicitud para obtener el ID del usuario logueado
        $.ajax({
            url: 'http://localhost:3000/IDusuarioLog',
            method: 'GET',
            success: function(data) {
                const nombreUsuario = data.Nickname;
                // Vaciar el contenedor con la clase 'contenedornickname'
                $('.contenedornickname').empty();
                // Agregar el nombre de usuario al contenedor con la clase 'contenedornickname'
                $('.contenedornickname').append(`<h3>@${nombreUsuario}</h3>`);
                
                $('#modalResena').modal('show');
            },
            error: function(err) {
                console.error('Error al obtener el nombre del usuario:', err);
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
                const peliculaID = ID_Pelicula; // Aquí estableces el ID de la película
    
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

        // Al cargar la página, obtener las reseñas
        obtenerResenas();
    
        // Función para obtener las reseñas mediante AJAX
        function obtenerResenas() {
            $.ajax({
                url: 'http://localhost:3000/Resena/Pelicula/' + ID_Pelicula,
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

           // HAZ UN AJAX A LA RUTA "http://localhost:3000/Usuario/" ID_Usuario y consulta su Nickname
            
            const contenedorResenas = $('#contenedorResenas');
            console.log("APOCO SI TILIN")
            resenas.forEach((resena) => {
                const ID_Usuario = resena.ID_Usuario
                $.ajax({
                    url: `http://localhost:3000/Usuario/${ID_Usuario}`,
                    method: 'GET',
                    success: function(usuario) {
                       console.log(usuario.Nickname)
                        const nuevaResena = `
                <div class="container Reseña">
                <div class="row">
                  <div class="col-md-6 offset-md-3 d-flex align-items-center">
                    <div class="ContornoReseña">
                      <!-- Primera Fila -->
                      <div class="d-flex align-items-center">
                        <div>
                            <img src="img/Piper_Rubio.jpg" alt="${usuario.Nickname}" class="ImgUsuarioenReseña border border-2 border-white">
                        </div>
                        <div class="UsuarioReseña ms-2">
                            <a href="">@${usuario.Nickname}</a> <!-- DESPUES PONER AQUI LA RUTA DE LA PERSONA -->
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

                $('#ContenedorReseñas').append(nuevaResena);
                    },
                    error: function(err) {
                        console.error('Error al obtener el Nickname del usuario:', err);
                    }
                });
                
    
                
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
