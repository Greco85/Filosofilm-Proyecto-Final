$(document).ready(function() {

    function obtenerUsuarios() {
        $.ajax({
            url: 'http://localhost:3000/Usuario',
            method: 'GET',
            success: function(response) {
                const listaUsuarios = $('#ListadeUsuarios');
                listaUsuarios.empty(); // Limpiar la lista antes de agregar los usuarios

                const row = $('<div>').addClass('row');

                response.forEach(function(usuario) {

                    // Creación de elementos para mostrar cada usuario en tarjetas
                    const divCol = $('<div>').addClass('col-xs-12 col-sm-4 col-lg-3 mb-3');
                    const divCard = $('<div>').addClass('card');
                    const imagen = $('<img>').addClass('imgpelicula card-img-top').attr('src', `img/Usuario.jpg`).attr('alt', '...');
                    const divCardBody = $('<div>').addClass('card-body');
                    const titulo = $('<h5>').addClass('card-title text-center').text(usuario.Nombre);
                    const idUsuario = $('<h5>').addClass('card-subtitle text-center mb-2').text('ID: ' + usuario.ID_Usuario);
                    const idRol = $('<h5>').addClass('card-subtitle text-center mb-2').text('ID ROL: ' + usuario.ID_Rol);
                    const enlacesContainer = $('<div>').addClass('d-flex flex-column align-items-center');
                    const LeerEnlace = $('<a>').addClass('leer-usuario btn btn-primary mb-2').attr('href', '#').data('usuario-id', usuario.ID_Usuario).text('Leer');
                    const CambiarRolEnlace = $('<a>').addClass('cambiar-rol-usuario btn btn-success mb-2').attr('href', '#').data('usuario-id', usuario.ID_Usuario).text('Cambiar Rol');
                    const eliminarEnlace = $('<a>').addClass('eliminar-usuario btn btn-danger').attr('href', '#').data('usuario-id', usuario.ID_Usuario).text('Eliminar');

                    // Agregar los enlaces al contenedor
                    enlacesContainer.append(LeerEnlace).append(CambiarRolEnlace).append(eliminarEnlace);
                    divCardBody.append(titulo).append(idUsuario).append(idRol).append(enlacesContainer);
                    divCard.append(imagen).append(divCardBody);
                    divCol.append(divCard);
                    row.append(divCol);
                });

                listaUsuarios.append(row);
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    }

    obtenerUsuarios();

    $('#ListadeUsuarios').on('click', '.leer-usuario', function() {
        const usuarioID = $(this).data('usuario-id');
        $.ajax({
            url: `http://localhost:3000/Usuario/${usuarioID}`,
            method: 'GET',
            success: function(usuario) {
                const detallesUsuario = $('#detallesUsuario');
                detallesUsuario.empty();
                detallesUsuario.append(`
                    <p><strong>ID del Usuario:</strong> ${usuario.ID_Usuario}</p>
                    <p><strong>ID del Rol:</strong> ${usuario.ID_Rol}</p>
                    <p><strong>Nickname:</strong> ${usuario.Nickname}</p>
                    <p><strong>Correo Electrónico:</strong> ${usuario.Correo_Electronico}</p>
                    <p><strong>Nombre:</strong> ${usuario.Nombre}</p>
                    <p><strong>Apellido:</strong> ${usuario.Apellido}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${usuario.Fecha_Nacimiento}</p>
                    <p><strong>Fecha de Registro:</strong> ${usuario.Fecha_Registro}</p>
                    <p><strong>Sexo:</strong> ${usuario.Sexo}</p>
                    <p><strong>Teléfono:</strong> ${usuario.Telefono}</p>
                    <p><strong>Descripción:</strong> ${usuario.Descripcion}</p>
                `);
    
                $('#modalDetallesUsuario').modal('show');
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener detalles del usuario:', error);
            }
        });
    });

    // Evento para cambiar el rol de un usuario
    $('#ListadeUsuarios').on('click', '.cambiar-rol-usuario', function() {
        const usuarioID = $(this).data('usuario-id');
        $('#userNickname').text(usuarioID);
        $.ajax({
            url: 'http://localhost:3000/Roles',
            method: 'GET',
            success: function(roles) {
                const selectRol = $('#selectRol');
                selectRol.empty(); // Limpiar el select antes de agregar los roles
                roles.forEach(function(rol) {
                    const option = $('<option>').attr('value', rol.ID_Rol).text(rol.Nombre);
                    selectRol.append(option);
                });
                $('#modalRoles').modal('show');

                // Desvincular evento click previo antes de agregar uno nuevo
                $('#cambiarRolBtn').off('click').click(function() {
                    const RolNuevo = $('#selectRol').val();
                    console.log('ID del Rol seleccionado:', RolNuevo);
                    
                    $.ajax({
                        url: `http://localhost:3000/Usuario/Cambiar/${usuarioID}`, 
                        method: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify({ ID_Rol: RolNuevo }), // Datos a enviar, el nuevo ID_Rol
                        success: function(response) {
                            obtenerUsuarios();
                            console.log('Usuario actualizado:', response);
                            // Aquí puedes hacer algo después de que se actualice el usuario (si es necesario)
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al actualizar el usuario:', error);
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los roles:', error);
            }
        });
    });

    // Evento para eliminar un director
    $('#ListadeUsuarios').on('click', '.eliminar-usuario', function() {
       
        const usuarioID = $(this).data('usuario-id');
        console.log(usuarioID)
            
        
        if (confirm('¿Estás seguro de que quieres eliminar este Usuario?')) {
            // Enviar solicitud DELETE al servidor
            $.ajax({
                url: `http://localhost:3000/Usuario/${usuarioID}`,
                method: 'DELETE',
                success: function(response) {
                    // Manejar la respuesta del servidor si es necesario
                    console.log('Usuario eliminado:', response);
                    // Volver a cargar la lista de directores después de eliminar
                    obtenerUsuarios();

                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar el Usuario:', error);
                }
            });
        }
    });

});
