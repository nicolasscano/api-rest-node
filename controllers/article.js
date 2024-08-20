// Haremos las funciones dentro de objetos para poder hacer destructuring y exportar solo los métodos que nos interesan
// Cada función será una página/ruta del proyecto
const fs = require("fs");
const path = require("path");
const Article = require("../models/Article");
const { validarArticulo } = require("../helpers/validator");


// Método para crear artículos: usamos el ORM Mongoose para interactuar con la BBDD insertando documentos en nuestras colecciones
const crearArticulo = (req, res) => {

    // Recoger los datos a guardar
    let parametros = req.body;

    // Validar los datos
    try {
        validarArticulo(parametros);
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Crear el objeto a guardar
    const articulo = new Article(parametros);

    // Asignar valores al objeto (manual o automatico)
    // Manual=> articulo.titulo = parametros.titulo;

    // Guardar el artículo en la BBDD
    articulo.save()
        .then((articuloGuardado) => {
            return res.status(200).json({
                status: 'success',
                Articulo: articuloGuardado,
                mensaje: 'Articulo creado con exito'
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: 'error',
                mensaje: 'No se ha guardado el articulo: ' + error.message
            });
        });



}

// Método de consulta la BBDD para devolver resultados en una res
const listarArticulos = async (req, res) => {
    try {
        let query = Article.find({}).sort({ date: -1 });

        // Si el parámetro `latest` está presente, limitamos a 3 artículos
        if (req.params.latest) {
            query = query.limit(3); // Aplicamos el límite a la consulta
        }

        const articles = await query.exec(); // Ejecutamos la consulta

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se encontraron artículos",
            });
        }

        return res.status(200).send({
            status: "success",
            resultados: articles.length,
            articles,
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Error al listar los artículos",
        });
    }
};

const unArticulo = async (req, res) => {
    try {
        // Recoger ID por la URL
        let id = req.params.id;

        // Buscar el artículo con el método findById()
        const articulo = await Article.findById(id);

        // Si no existe devolver error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo"
            });
        }

        // Si existe devolver resultado
        return res.status(200).json({
            status: "success",
            articulo
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo",
            error: error.message
        });
    }
};

// Método para borrar artículos por ID
const borrarArticulo = async (req, res) => {
    try {
        // Recoger ID por la URL
        const id = req.params.id;

        // Buscar y eliminar el artículo con el método findByIdAndDelete()
        const articuloEliminado = await Article.findByIdAndDelete(id);

        // Si no existe el artículo, devolver error
        if (!articuloEliminado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo para eliminar"
            });
        }

        // Si se elimina con éxito, devolver mensaje de éxito
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo eliminado con éxito",
            articulo: articuloEliminado // Retornar el artículo eliminado
        });

    } catch (error) {
        // Si ocurre un error, devolver mensaje de error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar el artículo",
            error: error.message
        });
    }
};


// Método para editar artículos por ID
const editarArticulo = async (req, res) => {
    try {
        // Recoger ID por la URL
        const id = req.params.id;

        // Recoger los datos que llegan desde el body
        const parametros = req.body;

        // Validar los datos
        validarArticulo(parametros);

        // Crear un objeto con los campos a actualizar
        const camposActualizados = {
            titulo: parametros.titulo,
            contenido: parametros.contenido,
            imagen: parametros.imagen,
            fecha: Date.now() // Actualizar la fecha a la hora actual
        };

        // Buscar y actualizar el artículo con el método findByIdAndUpdate()
        const articuloActualizado = await Article.findByIdAndUpdate(id, camposActualizados, { new: true });

        // Si no se encuentra el artículo, devolver error
        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo para actualizar"
            });
        }

        // Si se actualiza con éxito, devolver el artículo actualizado
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo actualizado con éxito",
            articulo: articuloActualizado
        });

    } catch (error) {
        // Si ocurre un error, devolver mensaje de error
        return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar el artículo, faltan datos por enviar",
            error: error.message
        });
    }
};

const subirImagen = async (req, res) => {
    try {
        // Verificar si se ha subido un archivo
        if (!req.file) {
            return res.status(404).json({
                status: "error",
                mensaje: "Petición inválida: No se ha subido ninguna imagen"
            });
        }

        // Nombre del fichero subido
        const fileName = req.file.filename;

        // Extensión de la imagen para validar
        const fileSplit = fileName.split(".");
        const fileType = fileSplit[fileSplit.length - 1].toLowerCase();

        // Comprobar extensión correcta
        if (fileType !== "png" && fileType !== "jpg" && fileType !== "jpeg" && fileType !== "gif") {
            // Borrar archivos que no sean imágenes
            fs.unlink(req.file.path, (error) => {
                if (error) {
                    return res.status(500).json({
                        status: "error",
                        mensaje: "Error al eliminar el archivo no válido"
                    });
                }
            });

            return res.status(400).json({
                status: "error",
                mensaje: "Extensión de archivo inválida"
            });
        }

        // Actualizar el artículo en la base de datos con la imagen subida
        const articuloActualizado = await Article.findByIdAndUpdate(
            req.params.id,
            { imagen: fileName },
            { new: true } // Para devolver el documento actualizado
        );

        // Comprobar si se encontró y actualizó el artículo
        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo para actualizar"
            });
        }

        // Devolver la respuesta exitosa con los detalles del archivo y el artículo actualizado
        return res.status(200).json({
            status: "success",
            mensaje: "Imagen subida y artículo actualizado con éxito",
            fileType,
            files: req.file,
            articulo: articuloActualizado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al subir la imagen",
            error: error.message
        });
    }
};

const visualizarImagen = (req, res) => {
    let fichero = req.params.fichero; // Cambiado de req.params.imagen a req.params.fichero para coincidir con la ruta
    let ruta = "./imagenes/articulos/" + fichero;

    // Verificar si el archivo existe con fs.stat
    fs.stat(ruta, (error, stats) => {
        if (!error && stats) { // Si no hay error y stats existe, el archivo está presente
            return res.sendFile(path.resolve(ruta));
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            });
        }
    });
};



module.exports = {
    crearArticulo,
    listarArticulos,
    unArticulo,
    borrarArticulo,
    editarArticulo,
    subirImagen,
    visualizarImagen
}