// Accede a node_modules e importa mongoose
// Importamos con el require y exportamos con el module.exports (ver abajo)
const mongoose = require("mongoose");

// Método para conexion
const connection = async () => {

    try {

        await mongoose.connect("mongodb://localhost:27017/blog-personal");

        // Parámetros a pasar dentro de objeto en caso de error
        // userNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

        console.log("Conectado correctamente a la BBDD")

    } catch (err) {
        console.log(err)
        throw new Error("No se ha podido establecer conexión con la BBDD")
    }

}

// Exportamos la conexión de nodeJS
module.exports = {
    connection
}