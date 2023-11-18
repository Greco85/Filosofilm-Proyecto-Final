
// Definir variable de rol
var rol = 1; 

// Función para mostrar el rol en la interfaz
function mostrarRol() {
  var rolElement = document.getElementById("r");
  
  switch (rol) {
    case 1:
      rolElement.textContent = "Normal";
      break;
    case 2:
      rolElement.textContent = "Experto";
      break;
    case 3:
      rolElement.textContent = "Moderador";
      break;
    case 4:
      rolElement.textContent = "Administrador";
      break;
    default:
      rolElement.textContent = "Desconocido";
  }
}

mostrarRol();




var nombreVisualizacion = "Karol";
var nuevaContrasena = "karol75";  
var Contraseña = "karol75";
var telefono = "8388282";        
var descripcionCuenta = "hola soy karol mucho gusto"; 
var fechaNacimiento = "2023-01-03";  
var genero = "female";          


// Función para mostrar la información del usuario en el formulario
function mostrarInformacionUsuario() {
  document.getElementById("nombreVisualizacion").value = nombreVisualizacion;
  document.getElementById('Contraseña').value = Contraseña;
  document.getElementById('nuevaContrasena').value = nuevaContrasena;
  document.getElementById('telefono').value = telefono;
  document.getElementById("campoTexto").value = descripcionCuenta;
  document.querySelector('input[name="nacimiento"]').value = fechaNacimiento;
  // Asignar otros valores a los campos según sea necesario
  if (genero === "male") {
    document.querySelector('input[value="male"]').checked = true;
  } else if (genero === "female") {
    document.querySelector('input[value="female"]').checked = true;
  }
}


function guardarConfiguracion() {
  // Obtener los nuevos valores del formulario
  var nuevoNombreVisualizacion = document.getElementById("nombreVisualizacion").value;
  var nuevaContraseña = document.getElementById("nuevaContrasena").value;
  var nuevoTelefono = document.getElementById("telefono").value;
  var nuevaDescripcionCuenta = document.getElementById("campoTexto").value;
  var nuevaFechaNacimiento = document.querySelector('input[name="nacimiento"]').value;
  var nuevoGenero = document.querySelector('input[name="gender"]:checked');
  var nuevoGeneroValor = nuevoGenero ? nuevoGenero.value : "";

  // Actualizar las variables con los nuevos valores
  nombreVisualizacion = nuevoNombreVisualizacion;
  nuevaContrasena = nuevaContraseña;
  telefono = nuevoTelefono;
  descripcionCuenta = nuevaDescripcionCuenta;
  fechaNacimiento = nuevaFechaNacimiento;
  genero = nuevoGeneroValor;

  // Mostrar una alerta con los datos actualizados
  var mensaje = "Datos actualizados:\n\n" +
                "Nombre de Visualización: " + nombreVisualizacion + "\n" +
                "Nueva Contraseña: " + nuevaContrasena + "\n" +
                "Teléfono: " + telefono + "\n" +
                "Descripción de Cuenta: " + descripcionCuenta + "\n" +
                "Fecha de Nacimiento: " + fechaNacimiento + "\n" +
                "Género: " + genero;
  alert(mensaje);
}

mostrarInformacionUsuario();




// ... (tu código existente) ...

function mostrarCambiarFoto() {
    var boton = document.getElementById("boton");
    var botonCambiarFoto = document.getElementById("c");

    // Verificar si ya hay una foto
    if (hayFoto) {

        boton.innerHTML = '<img src="img/A.jpg" alt="Imagen en el círculo">';
        botonCambiarFoto.style.display = "block"; // Muestra el botón "Cambiar foto"
    } else {
        // Si no hay foto, mostrar el símbolo '+'
        boton.innerHTML = '<img src="img/mas.png" alt="Imagen en el círculo">';
        botonCambiarFoto.style.display = "none"; // Oculta el botón "Cambiar foto"
    }

    hayFoto = !hayFoto;
}

function cambiarFoto() {
    alert("Implementa la lógica para cambiar la foto del usuario");
}

