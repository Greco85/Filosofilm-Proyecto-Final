$(document).ready(function() {
    // Código para obtener la lista de países
    $.ajax({
        url: 'http://localhost:3000/Pais_Origen',
        method: 'GET', 
        success: function(response) {
            const selectPais = $('#selectPais');
            response.forEach(function(pais) {
                selectPais.append(`<option value="${pais.Nombre}">${pais.Nombre}</option>`);
            });
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });

    function obtenerActores() {
        $('#formAgregarActor').submit(function(event) {
            event.preventDefault();
        
            // Obtener los valores del formulario
             const nombre = $('#nombreActor').val();
            const fechaNacimiento = $('#fechaNacimiento').val();
            const selectPais = $('#selectPais').val();
            const biografia = $('#biografia').val();
            const imagenURL = `./img/${nombre}.jpg`;
        
            console.log(selectPais);

            $.ajax({
                url: 'http://localhost:3000/Pais_Origen/' + selectPais,
                method: 'GET',
                success: function(response) {
                    var idPais = response[0].ID_Pais;
    
                    const peliculaData = {
                        Nombre: nombre,
                        Fecha_Nacimiento: fechaNacimiento,
                        Pais_Nacimiento: idPais,
                        Biografia: biografia,
                        Foto_Actor: imagenURL,
                        
                    };
    
                    // AJAX para enviar los datos de la película
                    $.ajax({
                        url: 'http://localhost:3000/Actor',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(peliculaData),
                        success: function(response) {
                            obtenerActores()
                            console.log('Actor Agregado:', response);
                    
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al agregar al Actor:', error);
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error al obtener el ID del país:', error);
                }
            });
        
            
        });

        $.ajax({
            url: 'http://localhost:3000/Actor',
            method: 'GET',
            success: function(response) {
                const listaActores = $('#ListadeActores');
                listaActores.empty(); // Limpiar la lista antes de agregar los actores
        
                const row = $('<div>').addClass('row'); 
        
                response.forEach(function(actor) {
                    const divCol = $('<div>').addClass('col-xs-12 col-sm-6 col-lg-3 mb-3');
                    const divCard = $('<div>').addClass('card');
                    const imagen = $('<img>').addClass('imgpelicula card-img-top').attr('src', `img/${actor.Nombre}.jpg`).attr('alt', '...');
                    const divCardBody = $('<div>').addClass('card-body');
                    const titulo = $('<h5>').addClass('card-title text-center').text(actor.Nombre);
                    const idActor = $('<h5>').addClass('card-subtitle text-center mb-2').text('ID: ' + actor.ID_Actor);
                    const enlacesContainer = $('<div>').addClass('d-flex flex-column align-items-center');
                    const LeerEnlace = $('<a>').addClass('leer-actor btn btn-primary mb-2').attr('href', '#').data('actor-id', actor.ID_Actor).text('Leer');
                    const EditarEnlace = $('<a>').addClass('editar-actor btn btn-primary mb-2').attr('href', '#').data('actor-id', actor.ID_Actor).text('Editar');
                    const eliminarEnlace = $('<a>').addClass('eliminar-actor btn btn-danger').attr('href', '#').data('actor-id', actor.ID_Actor).text('Eliminar');
        
                    // Agregar los enlaces al contenedor
                    enlacesContainer.append(LeerEnlace).append(EditarEnlace).append(eliminarEnlace);
                    divCardBody.append(titulo).append(idActor).append(enlacesContainer);
                    divCard.append(imagen).append(divCardBody);
                    divCol.append(divCard);
                    row.append(divCol);
                });
                
                listaActores.append(row); // Agrega la fila con todos los actores

                $('.leer-actor').click(function(event) {
                    event.preventDefault();
                    const actorID = $(this).data('actor-id');
                
                    // Solicitud AJAX para obtener los datos del actor
                    $.ajax({
                        url: 'http://localhost:3000/Actor/' + actorID,
                        method: 'GET',
                        success: function(response) {
                            // Lógica para cargar los datos del actor en el modal
                            const detallesActor = $('#detallesActor');
                            detallesActor.empty(); // Limpiar el contenido del modal antes de agregar nuevos datos
                
                            // Agregar los datos del actor al modal
                            detallesActor.append(`
                                <p><strong>Nombre del Actor:</strong> ${response.Nombre}</p>
                                <p><strong>Fecha de Nacimiento:</strong> ${response.Fecha_Nacimiento}</p>
                                <p><strong>País de Origen:</strong> ${response.Pais_Nacimiento}</p>
                                <p><strong>Biografía:</strong> ${response.Biografia}</p>
                            `);
                            // Mostrar el modal después de cargar todos los datos
                            $('#modalDetallesActor').modal('show');
                        },
                        error: function(xhr, status, error) {
                            console.error(error);
                        }
                    });
                });


 
// Esta variable almacenará el ID del actor seleccionado
let actorID;
let imagenActual;

$('.editar-actor').click(function(event) {
    event.preventDefault();
    actorID = $(this).data('actor-id');

    $.ajax({
        url: 'http://localhost:3000/Actor/' + actorID,
        method: 'GET',
        success: function(response) {
            imagenActual = response.Foto_Actor;
            $('#ActorID').val(response.ID_Actor);
            $('#TituloModalEditar').val(response.Nombre);
            $('#SinopsisModalEditar').val(response.Fecha_Nacimiento);
            $('#PaisModalEditar').val(response.Pais_Nacimiento);
            $('#BibliografiaModalEditar').val(response.Biografia);

            // Actualización de la lista de países en el modal
            $.ajax({
                url: 'http://localhost:3000/Pais_Origen',
                method: 'GET',
                success: function(paises) {
                    const selectPais = $('#PaisModalEditar');
                    selectPais.empty();

                    paises.forEach(function(pais) {
                        selectPais.append(`<option value="${pais.Nombre}">${pais.Nombre}</option>`);
                    });

                    $('#modalDetallesEditarActor').modal('show');
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
});

$('#formEditarActor').submit(function(event) {
    event.preventDefault();

    const paisSeleccionado = $('#PaisModalEditar').val();

    $.ajax({
        url: 'http://localhost:3000/Pais_Origen/' + paisSeleccionado,
        method: 'GET',
        success: function(data) {

            const paisID = data[0].ID_Pais;

            const updatedActor = {
                Nombre: $('#TituloModalEditar').val(),
                Fecha_Nacimiento: $('#SinopsisModalEditar').val(),
                Pais_Nacimiento: paisID,
                Biografia: $('#BibliografiaModalEditar').val(),
                Foto_Actor: imagenActual
            };

            console.log(updatedActor)

            $.ajax({
                url: `http://localhost:3000/Actor/${actorID}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedActor),
                success: function(response) {
                    console.log('Actor actualizado:', response);
                    $('#modalDetallesEditarActor').modal('hide');
                    obtenerActores()
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
});
                

                

$('.eliminar-actor').click(function(event) {
    event.preventDefault();
    const actorID = $(this).data('actor-id');

    // Confirmar con el usuario antes de eliminar el actor
    if (confirm('¿Estás seguro de que quieres eliminar este actor?')) {
        // Enviar solicitud DELETE al servidor
        $.ajax({
            url: `http://localhost:3000/Actor/${actorID}`,
            method: 'DELETE',
            success: function(response) {
                // Manejar la respuesta del servidor si es necesario
                console.log('Actor eliminado:', response);
                // Volver a cargar la lista de actores después de eliminar
                obtenerActores();
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar el actor:', error);
            }
        });
    }
});

            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los actores:', error);
            }
        });

    }

    obtenerActores();

});