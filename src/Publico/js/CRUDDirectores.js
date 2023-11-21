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

    function obtenerDirectores() {
        $('#formAgregarDirector').submit(function(event) {
            event.preventDefault();
        
            // Obtener los valores del formulario
            const nombre = $('#nombreDirector').val();
            const fechaNacimiento = $('#fechaNacimiento').val();
            const selectPais = $('#selectPais').val();
            const biografia = $('#biografia').val();
            const imagenURL = `./img/${nombre}.jpg`;
        
            $.ajax({
                url: 'http://localhost:3000/Pais_Origen/' + selectPais,
                method: 'GET',
                success: function(response) {
                    var idPais = response[0].ID_Pais;
        
                    const directorData = {
                        Nombre: nombre,
                        Fecha_Nacimiento: fechaNacimiento,
                        Pais_Nacimiento: idPais,
                        Biografia: biografia,
                        Foto_Director: imagenURL,
                    };
        
                    // AJAX para enviar los datos del director
                    $.ajax({
                        url: 'http://localhost:3000/Director',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(directorData),
                        success: function(response) {
                            obtenerDirectores();
                            console.log('Director Agregado:', response);
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al agregar al Director:', error);
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error al obtener el ID del país:', error);
                }
            });
        });
        
        $.ajax({
            url: 'http://localhost:3000/Director',
            method: 'GET',
            success: function(response) {
                const listaDirectores = $('#ListadeDirectores');
                listaDirectores.empty(); // Limpiar la lista antes de agregar los directores
        
                const row = $('<div>').addClass('row');
        
                response.forEach(function(director) {
                    const divCol = $('<div>').addClass('col-xs-12 col-sm-6 col-lg-3 mb-3');
                    const divCard = $('<div>').addClass('card');
                    const imagen = $('<img>').addClass('imgpelicula card-img-top').attr('src', `img/${director.Nombre}.jpg`).attr('alt', '...');
                    const divCardBody = $('<div>').addClass('card-body');
                    const titulo = $('<h5>').addClass('card-title text-center').text(director.Nombre);
                    const idDirector = $('<h5>').addClass('card-subtitle text-center mb-2').text('ID: ' + director.ID_Director);
                    const enlacesContainer = $('<div>').addClass('d-flex flex-column align-items-center');
                    const LeerEnlace = $('<a>').addClass('leer-director btn btn-primary mb-2').attr('href', '#').data('director-id', director.ID_Director).text('Leer');
                    const EditarEnlace = $('<a>').addClass('editar-director btn btn-primary mb-2').attr('href', '#').data('director-id', director.ID_Director).text('Editar');
                    const eliminarEnlace = $('<a>').addClass('eliminar-director btn btn-danger').attr('href', '#').data('director-id', director.ID_Director).text('Eliminar');
        
                    // Agregar los enlaces al contenedor
                    enlacesContainer.append(LeerEnlace).append(EditarEnlace).append(eliminarEnlace);
                    divCardBody.append(titulo).append(idDirector).append(enlacesContainer);
                    divCard.append(imagen).append(divCardBody);
                    divCol.append(divCard);
                    row.append(divCol);
                });
        
                listaDirectores.append(row); // Agrega la fila con todos los directores
        
                $('.leer-director').click(function(event) {
                    event.preventDefault();
                    const directorID = $(this).data('director-id');
        
                    // Solicitud AJAX para obtener los datos del director
                    $.ajax({
                        url: 'http://localhost:3000/Director/' + directorID,
                        method: 'GET',
                        success: function(response) {
                            // Lógica para cargar los datos del director en el modal
                            const detallesDirector = $('#detallesDirector');
                            detallesDirector.empty(); // Limpiar el contenido del modal antes de agregar nuevos datos
        
                            // Agregar los datos del director al modal
                            detallesDirector.append(`
                                <p><strong>Nombre del Director:</strong> ${response.Nombre}</p>
                                <p><strong>Fecha de Nacimiento:</strong> ${response.Fecha_Nacimiento}</p>
                                <p><strong>País de Origen:</strong> ${response.Pais_Nacimiento}</p>
                                <p><strong>Biografía:</strong> ${response.Biografia}</p>
                            `);
                            // Mostrar el modal después de cargar todos los datos
                            $('#modalDetallesDirector').modal('show');
                        },
                        error: function(xhr, status, error) {
                            console.error(error);
                        }
                    });
                });


// Esta variable almacenará el ID del director seleccionado
let directorID;
let imagenActualDirector;

$('.editar-director').click(function(event) {
    event.preventDefault();
    directorID = $(this).data('director-id');

    $.ajax({
        url: 'http://localhost:3000/Director/' + directorID,
        method: 'GET',
        success: function(response) {
            imagenActualDirector = response.Foto_Director;
            $('#DirectorID').val(response.ID_Director);
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

                    $('#modalDetallesEditarDirector').modal('show');
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

$('#formEditarDirector').submit(function(event) {
    event.preventDefault();

    const paisSeleccionadoDirector = $('#PaisModalEditar').val();

    $.ajax({
        url: 'http://localhost:3000/Pais_Origen/' + paisSeleccionadoDirector,
        method: 'GET',
        success: function(data) {

            const paisIDDirector = data[0].ID_Pais;

            const updatedDirector = {
                Nombre: $('#TituloModalEditar').val(),
                Fecha_Nacimiento: $('#SinopsisModalEditar').val(),
                Pais_Nacimiento: paisIDDirector,
                Biografia: $('#BibliografiaModalEditar').val(),
                Foto_Director: imagenActualDirector
            };

            console.log(updatedDirector);

            $.ajax({
                url: `http://localhost:3000/Director/${directorID}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedDirector),
                success: function(response) {
                    console.log('Director actualizado:', response);
                    $('#modalDetallesEditarDirector').modal('hide');
                    obtenerDirectores(); // Suponiendo que tienes una función para obtener directores similar a obtenerActores
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


$('.eliminar-director').click(function(event) {
    event.preventDefault();
    const directorID = $(this).data('director-id');

    // Confirmar con el usuario antes de eliminar el director
    if (confirm('¿Estás seguro de que quieres eliminar este director?')) {
        // Enviar solicitud DELETE al servidor
        $.ajax({
            url: `http://localhost:3000/Director/${directorID}`,
            method: 'DELETE',
            success: function(response) {
                // Manejar la respuesta del servidor si es necesario
                console.log('Director eliminado:', response);
                // Volver a cargar la lista de directores después de eliminar
                obtenerDirectores(); // Asegúrate de tener una función similar a obtenerActores para cargar los directores
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar el director:', error);
            }
        });
    }
});

            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los directores:', error);
            }
        });
        
    }

    obtenerDirectores();

});