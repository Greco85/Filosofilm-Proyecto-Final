$(document).ready(function() {
    let listaPaises = $('#ListadePaises');
    console.log("holaa")

    function obtenerPaises() {
        
        $.ajax({
            url: 'http://localhost:3000/Pais_Origen',
            method: 'GET',
            success: function(response) {
                const listaPaises = $('#ListadePaises');

                response.forEach(function(pais) {
                    const divCol = $('<div>').addClass('col-xs-12 col-sm-6 col-lg-3 mb-3');
                    const divCard = $('<div>').addClass('card');
                    const imagen = $('<img>').addClass('imgpelicula card-img-top').attr('src', pais.Pais_Imagen).attr('alt', pais.Nombre);
                    const divCardBody = $('<div>').addClass('card-body');
                    const nombrePais = $('<h5>').addClass('card-title text-center').text(pais.Nombre);
                    const idPais = $('<h5>').addClass('card-subtitle text-center mb-2').text('ID: ' + pais.ID_Pais);
                    const enlacesContainer = $('<div>').addClass('d-flex flex-column align-items-center');
                    const eliminarEnlace = $('<div>').addClass('eliminar-pais btn btn-danger').data('pais-id', pais.ID_Pais).text('Eliminar');

                    // Agregar los enlaces al contenedor
                    enlacesContainer.append(eliminarEnlace);
                    divCardBody.append(nombrePais).append(idPais).append(enlacesContainer);
                    divCard.append(imagen).append(divCardBody);
                    divCol.append(divCard);
                    listaPaises.append(divCol);

                    // Evento click para almacenar el ID del país al hacer clic en el botón de eliminar
                    eliminarEnlace.click(function() {
                        const paisSeleccionadoId = $(this).data('pais-id');
                        console.log(`Se ha seleccionado el país con ID: ${paisSeleccionadoId}`);
    
                        $.ajax({
                            url: `http://localhost:3000/Pais_Origen/ID/${paisSeleccionadoId}`,
                            method: 'DELETE',
                            success: function(response) {
                                console.log('País eliminado:', response);
                                listaPaises.empty();
                                obtenerPaises();
                            },
                            error: function(xhr, status, error) {
                                console.error('Error al eliminar el país:', error);
                                alert('No se pudo eliminar el país. Asegúrate de cambiar o eliminar todos los objetos relacionados antes de proceder.');
                            }
                        });
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    // Función para agregar un país
    $('#formAgregarPais').submit(function(event) {
        event.preventDefault();
        const nombrePais = $('#nombrePais').val();
        const paisImagen = 'img/'+nombrePais + '.jpg'; // Generar dinámicamente el nombre del archivo de imagen
    
        const nuevoPais = {
            "Nombre": nombrePais,
            "Pais_Imagen": paisImagen
        };
    
        $.ajax({
            url: 'http://localhost:3000/Pais_Origen',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoPais),
            success: function(response) {
                console.log('País agregado:', response);
                $('#nombrePais').val(''); // Limpiar el campo después de agregar
                listaPaises.empty();
                obtenerPaises();
            },
            error: function(xhr, status, error) {
                console.error('Error al agregar el país:', error);
            }
        });
    });
    // Función para mostrar la lista de países al cargar la página
    obtenerPaises();
});