// Archivo informacion.js


var nombreVisualizacion = "@usuario";
var fechaCreacion = "2023-01-03"; 
var descripcionCuenta = "¡Hola! Soy un usuario.";
var fechaNacimiento = "2002-12-02"; 
var genero = "female"; 

// Función para mostrar la información del usuario en el formulario
function mostrarInformacionUsuario() {
  document.getElementById("nombreVisualizacion").value = nombreVisualizacion;
  document.getElementById("fechacreacion").value = fechaCreacion;
  document.getElementById("campoTexto").value = descripcionCuenta;
  document.querySelector('input[name="nacimiento"]').value = fechaNacimiento;

  if (genero === "male") {
    document.querySelector('input[value="male"]').checked = true;
  } else if (genero === "female") {
    document.querySelector('input[value="female"]').checked = true;
  }

  // Mostrar el formulario después de cargar la información
  document.getElementById("configForm").style.display = "block";
}

// Función para guardar la configuración
function guardarConfiguracion() {
  var nuevoNombreVisualizacion = document.getElementById("nombreVisualizacion").value;
  var nuevaFechaCreacion = document.getElementById("fechacreacion").value;
  var nuevaDescripcionCuenta = document.getElementById("campoTexto").value;
  var nuevaFechaNacimiento = document.querySelector('input[name="nacimiento"]').value;
  var nuevoGenero = document.querySelector('input[name="gender"]:checked');

  nombreVisualizacion = nuevoNombreVisualizacion;
  fechaCreacion = nuevaFechaCreacion;
  descripcionCuenta = nuevaDescripcionCuenta;
  fechaNacimiento = nuevaFechaNacimiento;

  if (nuevoGenero) {
    genero = nuevoGenero.value;
  }

  // Puedes hacer lo que necesites con estos valores, por ejemplo, enviarlos al servidor
  // En este ejemplo, solo los estamos mostrando en la consola
  console.log("Nuevo Nombre de Visualización:", nuevoNombreVisualizacion);
  console.log("Nueva Fecha de Creación:", nuevaFechaCreacion);
  console.log("Nueva Descripción de Cuenta:", nuevaDescripcionCuenta);
  console.log("Nueva Fecha de Nacimiento:", nuevaFechaNacimiento);
  console.log("Nuevo Género:", genero);


}

// Agregar un evento de clic al enlace "Información" para mostrar la información del usuario
document.getElementById("mostrarInformacion").addEventListener("click", function(event) {
  event.preventDefault();
  mostrarInformacionUsuario();
});

// Agregar un evento de clic al botón "Guardar Configuración"
document.querySelector('button[type="button"]').addEventListener("click", function() {
    guardarConfiguracion();
    // Agregar una alerta para notificar al usuario que los cambios se han guardado
    alert("Cambios guardados exitosamente");
  });