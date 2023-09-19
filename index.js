// Función para manejar un array
function manejarArray(arr) {
  // Mostrar el contenido del array en la consola
  console.log("Contenido del array:", arr);

  // Calcular la suma de los elementos del array
  const suma = arr.reduce((total, elemento) => total + elemento, 0);
  console.log("Suma de elementos:", suma);

  // Aquí puedes agregar más operaciones con el array según tus necesidades
}

// Ejemplo de uso de la función con un array
const ejemploArray = [1, 2, 3, 4, 5];
manejarArray(ejemploArray);

// Función para cargar datos desde una API
async function cargarDatosDesdeAPI(
  apiUrl,
  token,
  requestData,
  onSuccess,
  onError
) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    } else {
      throw new Error("Error al cargar los datos desde la API");
    }
  } catch (error) {
    onError(error);
  }
}

// Función para mostrar datos en tarjetas
function mostrarDatosEnTarjetas(datos) {
  const listaDatosDolarSi = document.getElementById("listaDatosDolarSi");
  listaDatosDolarSi.innerHTML = "";

  datos.forEach((dato) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    const cardHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${dato.nombre}</h5>
          <p class="card-text">Venta: ${dato.venta}</p>
        </div>
      </div>
    `;

    card.innerHTML = cardHTML;
    listaDatosDolarSi.appendChild(card);
  });
}

// Función para manejar el éxito al cargar datos desde la API
function onSuccess(data) {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = JSON.stringify(data);
}

// Función para manejar errores al cargar datos desde la API
function onError(error) {
  console.error("Error al cargar los datos desde la API:", error);
}

// Llamada a la función para cargar datos desde la API
const apiUrl = "https://api.m3o.com/v1/user/Create"; // URL real de la API
const token = "YOUR_M3O_API_TOKEN"; // Reemplaza con tu token real

const requestData = {
  email: "joe@example.com",
  id: "user-1",
  password: "Password1",
  username: "joe",
};

cargarDatosDesdeAPI(apiUrl, token, requestData, onSuccess, onError);

// Resto de tu código para obtener datos de DolarSi
let mostrarDatosDolar = false;

async function getDatosDolarSi() {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares");
    if (response.ok) {
      const data = await response.json();
      console.log("Dolares", data);
      return data;
    } else {
      throw new Error("Error al obtener los datos de DolarSi");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const botonObtenerDatosDolarSi = document.getElementById("obtenerDatosDolarSi");

botonObtenerDatosDolarSi.addEventListener("click", async () => {
  if (mostrarDatosDolar) {
    // Si se están mostrando los datos, ocultarlos
    const listaDatosDolarSi = document.getElementById("listaDatosDolarSi");
    listaDatosDolarSi.innerHTML = "";
    botonObtenerDatosDolarSi.textContent = "Obtener Datos Dolar";
    mostrarDatosDolar = false;
  } else {
    // Si no se están mostrando los datos, obtenerlos y mostrarlos
    try {
      const datos = await getDatosDolarSi();
      mostrarDatosEnTarjetas(datos);
      botonObtenerDatosDolarSi.textContent = "Ocultar Datos Dolar";
      mostrarDatosDolar = true;

      // Mostrar el toast cuando se hace clic en el botón
      var liveToast = new bootstrap.Toast(document.getElementById("liveToast"));
      liveToast.show();
    } catch (error) {}
  }
});
// ...
// Resto de tu código para mostrar datos en tarjetas y manejar eventos