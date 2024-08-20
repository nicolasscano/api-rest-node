const { connection } = require("./databases/connection"); // Similar a los imports en Angular
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de Node inicializada")

// Conectar a la BBDD
connection();

// Crear servidor Node
const app = express();
const port = 3900;

// Configurar cors
app.use(cors()); // Middleware para que el cors se ejecute antes que cualquier otra ruta

// Convertir body a objeto.js
app.use(express.json()); /* Esto es para parsear a un objeto JS usable los datos recibidos de peticiones HTTP
                            Recibe datos sólo de content-type app/json*/
app.use(express.urlencoded({ extended: true })) // Recibe datos URL Encoded form-url-encoded


// RUTAS 
const rutas_articulo = require("./routes/article")

// Cargar rutas
app.use("/api", rutas_articulo) // A partir de /api pueden nacer el resto de rutas. Todas las rutas empezarán por /api


/*
Primer parámetro => la ruta
Segundo parámetro => lo que muestra el endpoint/ruta (req es request y res la respuesta)
*/

// Crear server y escuchar peticiones
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
});