const { Schema, model } = require("mongoose");


// Definimos el esquema del objeto articulo. Objeto JSON. Cada documento "articulo" de mi BBDD va a tener este esquema
const ArticleSchema = Schema({

    titulo: {
        type: String,
        require: true // equivalente al NOT NULL de BBDD relacionales
    },
    contenido: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    }

});

// El método model permite indicar el nombre del modelo creado
module.exports = model("Article", ArticleSchema, "articles"); /* Mongoose va a coger el String del primer parámetro y lo va a pluralizar, por lo que tiene que coincidir en nombre
                                                                Tambien se le puede pasar el nombre de la collection como 3er parámetro*/