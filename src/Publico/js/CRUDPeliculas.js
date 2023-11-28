$(document).ready(function() {

    const listaGeneros = [];
    const listaClasificaciones = [];
    const listaActores = [];
    const listaDirectores = []; 

    // Función genérica para realizar solicitudes AJAX
function fetchData(url, selectElement, optionValue, optionText) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            const select = $(selectElement);
            data.forEach(function(item) {
                select.append(`<option value="${item[optionValue]}">${item[optionText]}</option>`);
            });
        },
        error: function() {
            console.error(`Error al obtener datos desde ${url}.`);
        }
    });
}

// Llamadas a las funciones para obtener datos
fetchData('http://localhost:3000/Pais_Origen', '#selectPais', 'Nombre', 'Nombre');
fetchData('http://localhost:3000/Genero', '#Genero', 'Genero', 'Genero');
fetchData('http://localhost:3000/Clasificacion', '#Clasificacion', 'Clasificacion', 'Clasificacion');
fetchData('http://localhost:3000/Actor', '#Actor', 'Nombre', 'Nombre');
fetchData('http://localhost:3000/Director', '#Director', 'Nombre', 'Nombre');
    
    $('#agregarGenero').on('click', function() {
        const generoSeleccionado = $('#Genero').val(); // Obtener el género seleccionado
        event.preventDefault();
        // Verificar si el género ya ha sido seleccionado
        if (listaGeneros.includes(generoSeleccionado)) {
            window.alert("Este genero ya fue seleccionado")
            return;
        }

        listaGeneros.push(generoSeleccionado); // Agregar el género a la lista

        // Mostrar la lista de géneros seleccionados
        const listaGenerosHTML = listaGeneros.map(genero => `<span>${genero}</span>`).join(', ');
        $('#listaGeneros').html(`<p>Géneros seleccionados: ${listaGenerosHTML}</p>`);
    });

    $('#agregarClasificacion').on('click', function() {
        const clasificacionSeleccionada = $('#Clasificacion').val(); 
        event.preventDefault(); 
        // Verificar si la clasificación ya ha sido seleccionada
        if (listaClasificaciones.includes(clasificacionSeleccionada)) {
            console.log('Esta clasificación ya ha sido seleccionada');
            return; // Evitar agregar una clasificación duplicada
        }

        listaClasificaciones.push(clasificacionSeleccionada); // Agregar la clasificación a la lista

        // Mostrar la lista de clasificaciones seleccionadas
        const listaClasificacionesHTML = listaClasificaciones.map(clasificacion => `<span>${clasificacion}</span>`).join(', ');
        $('#listaClasificaciones').html(`<p>Clasificaciones seleccionadas: ${listaClasificacionesHTML}</p>`);
    });
    // Agregar un actor y su personaje al hacer clic en el botón "Agregar"
    $('#agregarActor').on('click', function() {
        const actorSeleccionado = $('#Actor').val(); // Obtener el actor seleccionado
        const personaje = prompt(`¿Qué personaje interpreta ${actorSeleccionado}?`); // Pedir al usuario el personaje
        event.preventDefault();
        // Verificar si el actor ya ha sido seleccionado
        if (listaActores.some(actor => actor.nombre == actorSeleccionado)) {
            console.log('¡Este actor ya ha sido seleccionado!');
            return; // Evitar agregar un actor duplicado
        }

        // Agregar el actor y su personaje a la lista
        listaActores.push({ nombre: actorSeleccionado, personaje: personaje });

        // Mostrar la lista de actores seleccionados
        const listaActoresHTML = listaActores.map(actor => `<p>${actor.nombre} interpreta a ${actor.personaje}</p>`).join('');
        $('#listaActores').html(`<div><strong>Actores seleccionados:</strong>${listaActoresHTML}</div>`);
    });
    // Agregar un director al hacer clic en el botón "Agregar"
    $('#agregarDirector').on('click', function() {
        event.preventDefault();
        const directorSeleccionado = $('#Director').val(); // Obtener el director seleccionado

        // Verificar si el director ya ha sido seleccionado
        if (listaDirectores.includes(directorSeleccionado)) {
            console.log('¡Este director ya ha sido seleccionado!');
            return; // Evitar agregar un director duplicado
        }

        // Agregar el director a la lista
        listaDirectores.push(directorSeleccionado);

        // Mostrar la lista de directores seleccionados
        const listaDirectoresHTML = listaDirectores.map(director => `<p>${director}</p>`).join('');
        $('#listaDirectores').html(`<div><strong>Directores seleccionados:</strong>${listaDirectoresHTML}</div>`);
    });
    obtenerPeliculas();

    function obtenerPeliculas() {
        $('#formAgregarPelicula').submit(function(event) {
            event.preventDefault(); // Prevenir el envío por defecto del formulario
    
            // Obtener los valores del formulario
            const titulo = $('#TituloPelicula').val();
            const sinopsis = $('#SinopsisPelicula').val();
            const fechaLanzamiento = $('#fechaLanzamiento').val();
            const duracion = $('#duracion').val();
            const presupuesto = $('#presupuesto').val();
            const recaudacion = $('#recaudacion').val();
            const paisOrigen = $('#selectPais').val();
            const imagenURL = `img/${titulo}.jpg`; 
            
            $.ajax({    //AJAX PARA OBTENER EL ID DEL PAIS
                url: 'http://localhost:3000/Pais_Origen/' + paisOrigen,
                method: 'GET',
                success: function(response) {
                    var idPais = response[0].ID_Pais;
                
                    const peliculaData = {
                        Titulo: titulo,
                        Sinopsis: sinopsis,
                        Fecha_Lanzamiento: fechaLanzamiento,
                        Duracion: duracion,
                        Presupuesto: presupuesto,
                        imagen: imagenURL,
                        Recaudacion: recaudacion,
                        ID_Pais_Origen: idPais 
                    };
                    console.log(peliculaData)
                    // AJAX para enviar los datos de la película
                    $.ajax({
                        url: 'http://localhost:3000/Pelicula',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(peliculaData),
                        success: function(response) {
                            console.log('Película agregada:', response);
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al agregar la película:', error);
                            // Manejar el error de agregar la película
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error al obtener el ID del país:', error);
                }
            });
        });

        //ES IMPOSIBLE 

        

        $.ajax({
            url: 'http://localhost:3000/Pelicula', 
            method: 'GET',
            success: function(response) {
                const listaPeliculas = $('#ListadePeliculas');
                listaPeliculas.empty(); // Limpiar la lista antes de agregar las películas
                
                const row = $('<div>').addClass('row'); // Crea una fila Bootstrap
    
                response.forEach(function(pelicula) {
                    const divCol = $('<div>').addClass('col-xs-12 col-sm-6 col-lg-3 mb-3');
                    const divCard = $('<div>').addClass('card');
                    const imagen = $('<img>').addClass('imgpelicula card-img-top').attr('src', pelicula.imagen).attr('alt', '...');
                    const divCardBody = $('<div>').addClass('card-body');
                    const titulo = $('<h5>').addClass('card-title text-center').text(pelicula.Titulo);
                    const idPelicula = $('<h5>').addClass('card-subtitle text-center mb-2').text('ID: ' + pelicula.ID_Pelicula);
                    const enlacesContainer = $('<div>').addClass('d-flex flex-column align-items-center');
                    const LeerEnlace = $('<a>').addClass('leer-pelicula btn btn-primary mb-2').attr('href', '#').data('pelicula-id', pelicula.ID_Pelicula).text('Leer');
                    const IngresarDatos = $('<a>').addClass('ingresar-datos btn btn-primary mb-2').attr('href', '#').data('pelicula-id', pelicula.ID_Pelicula).text('Ingresar Datos');
                    const EditarEnlace = $('<a>').addClass('editar-pelicula btn btn-primary mb-2').attr('href', '#').data('pelicula-id', pelicula.ID_Pelicula).text('Editar');
                    const eliminarEnlace = $('<a>').addClass('eliminar-pelicula btn btn-danger').attr('href', '#').data('pelicula-id', pelicula.ID_Pelicula).text('Eliminar');
                
                    // Agregar los enlaces al contenedor
                    enlacesContainer.append(LeerEnlace).append(IngresarDatos).append(EditarEnlace).append(eliminarEnlace);
                    divCardBody.append(titulo).append(idPelicula).append(enlacesContainer);
                    divCard.append(imagen).append(divCardBody); 
                    divCol.append(divCard);
                    row.append(divCol); 
                });
    
                    listaPeliculas.append(row); // Agrega la fila con todas las películas
                    
                    $('.ingresar-datos').on('click', function(event) {
                        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                        const peliculaID = $(this).data('pelicula-id');
                        $('#modalEditarPelicula').modal('show');

                        $('.GuardarCambios').on('click', function(event) {
                            event.preventDefault();
                            const peliculaID = $(this).data('pelicula-id');
                            console.log('ID de la película:', peliculaID);
                    
                            //GENERO
                            console.log(listaGeneros)
                            
                            function obtenerDetallesGeneros() {
                                listaGeneros.forEach(function(genero) {
                                    $.ajax({
                                        url: `http://localhost:3000/Genero/${genero}`,
                                        method: 'GET',
                                        success: function(response) {
                                            
                                            const datosPeliculaGenero = {
                                                ID_Pelicula: peliculaID,
                                                ID_Genero: response.ID_Genero
                                            };   

                                            $.ajax({
                                                url: 'http://localhost:3000/Pelicula-Genero',
                                                method: 'POST',
                                                contentType: 'application/json',
                                                data: JSON.stringify(datosPeliculaGenero),
                                                success: function(response) {
                                                    console.log('Se ha agregado la relación película-género:', response);
                                                    // Manejar la respuesta del servidor si es necesario
                                                },
                                                error: function(xhr, status, error) {
                                                    console.error('Error al agregar la relación película-género:', error);
                                                    // Manejar el error si la solicitud no se realiza correctamente
                                                }
                                            });

                                        },
                                        error: function(xhr, status, error) {
                                            console.error(`Error al obtener detalles del género ${genero}:`, error);
                                            // Manejar el error si la solicitud no se realiza correctamente
                                        }
                                    });
                                });
                            }
                            
                            
                            obtenerDetallesGeneros();
                    
                            //CLASIFICACION
                            console.log(listaClasificaciones)
                            //ACTORES
                            console.log(listaActores)

                            //DIRECTORES
                            console.log(listaDirectores)
                    
                            
                        });






                    });

                    $('.leer-pelicula').click(function(event) {
                        event.preventDefault();
                        const peliculaID = $(this).data('pelicula-id');
                    
                        // Solicitud AJAX para obtener los datos de la película
                        $.ajax({
                            url: 'http://localhost:3000/Pelicula/' + peliculaID,
                            method: 'GET',
                            success: function(response) {
                                // Lógica para cargar los datos de la película en el modal
                                const detallesPelicula = $('#detallesPelicula');
                                detallesPelicula.empty(); // Limpiar el contenido del modal antes de agregar nuevos datos
                    
                                // Agregar los datos de la película al modal
                                detallesPelicula.append(`
                                    <p><strong>Título:</strong> ${response.Titulo}</p>
                                    <p><strong>Sinopsis:</strong> ${response.Sinopsis}</p>
                                    <p><strong>Fecha de Lanzamiento:</strong> ${response.Fecha_Lanzamiento}</p>
                                    <p><strong>Duración:</strong> ${response.Duracion} MINUTOS </p>
                                    <p><strong>Presupuesto:</strong> ${response.Presupuesto} PESOS</p>
                                    <p><strong>Recaudación:</strong> ${response.Recaudacion} PESOS</p>
                                `);
                    
                                // Solicitud AJAX para obtener el nombre del país utilizando el ID del país de la película
                                $.ajax({
                                    url: 'http://localhost:3000/Pais_Origen/ID/' + response.ID_Pais_Origen,
                                    method: 'GET',
                                    success: function(paisResponse) {
                                        // Agregar el nombre del país al modal
                                        detallesPelicula.append(`<p><strong>País de Origen:</strong> ${paisResponse[0].Nombre}</p>`);
                                        // Mostrar el modal después de cargar todos los datos
                                        $('#modalDetallesPelicula').modal('show');
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


     
// Esta variable almacenará el ID de la película seleccionada
let peliculaID;
let imagenActual = response.imagen;

$('.editar-pelicula').click(function(event) {
    event.preventDefault();
    peliculaID = $(this).data('pelicula-id');

    $.ajax({
        url: 'http://localhost:3000/Pelicula/' + peliculaID,
        method: 'GET',
        success: function(response) {
            imagenActual = response.imagen;
            $('#peliculaID').val(response.id);
            $('#TituloModalEditar').val(response.Titulo);
            $('#SinopsisModalEditar').val(response.Sinopsis);
            $('#FechaLanzamientoModalEditar').val(response.Fecha_Lanzamiento);
            $('#DuracionModalEditar').val(response.Duracion);
            $('#PresupuestoModalEditar').val(response.Presupuesto);
            $('#RecaudacionModalEditar').val(response.Recaudacion);

            $.ajax({
                url: 'http://localhost:3000/Pais_Origen',
                method: 'GET',
                success: function(paises) {
                    const selectPais = $('#PaisModalEditar');
                    selectPais.empty();

                    paises.forEach(function(pais) {
                        selectPais.append(`<option value="${pais.Nombre}">${pais.Nombre}</option>`);
                    });

                    $('#modalDetallesEditarPelicula').modal('show');
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

$('#formEditarPelicula').submit(function(event) {
    event.preventDefault();

    const paisSeleccionado = $('#PaisModalEditar').val();
    console.log(peliculaID); // Asegúrate de que imprima el ID de la película

    $.ajax({
        url: 'http://localhost:3000/Pais_Origen/' + paisSeleccionado,
        method: 'GET',
        success: function(data) {
            const paisID = data[0].ID_Pais;

            const updatedPelicula = {
                Titulo: $('#TituloModalEditar').val(),
                Sinopsis: $('#SinopsisModalEditar').val(),
                Fecha_Lanzamiento: $('#FechaLanzamientoModalEditar').val(),
                Duracion: $('#DuracionModalEditar').val(),
                Presupuesto: $('#PresupuestoModalEditar').val(),
                "imagen": imagenActual,
                Recaudacion: $('#RecaudacionModalEditar').val(),
                ID_Pais_Origen: paisID
            };

            $.ajax({
                url: `http://localhost:3000/Pelicula/${peliculaID}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedPelicula),
                success: function(response) {
                    console.log('Película actualizada:', response);
                    $('#modalDetallesEditarPelicula').modal('hide');
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
                    

                    
    

            $('.eliminar-pelicula').click(function(event) {
                    event.preventDefault();
                    const peliculaID = $(this).data('pelicula-id');
                
                    // Confirmar con el usuario antes de eliminar la película
                    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
                        // Enviar solicitud DELETE al servidor
                        $.ajax({
                            url: `http://localhost:3000/Pelicula/${peliculaID}`,
                            method: 'DELETE',
                            success: function(response) {
                                // Aquí puedes manejar la respuesta del servidor si es necesario
                                console.log('Película eliminada:', response);
                                // Volver a cargar la lista de películas después de eliminar
                                obtenerPeliculas();
                            },
                            error: function(xhr, status, error) {
                                console.error('Error al eliminar la película:', error);
                            }
                        });
                    }
                });
                
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener las películas:', error);
            }
        });
    }

});




