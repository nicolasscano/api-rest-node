const express = require("express");
const multer = require("multer");
const ArticleController = require("../controllers/article");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./imagenes/articulos/")
    },

    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
});

const subidas = multer({ storage: storage });

const router = express.Router(); // Con el router de express creamos las rutas web


// Rutas
router.post("/crear", ArticleController.crearArticulo);
router.get("/articulos/:latest?", ArticleController.listarArticulos); /* Método que va a extraer info del back end para mostrarla (GET) con :latest? le pasamos un parámetro opcional donde mostraremos los 3 últimos articles*/
router.get("/articulo/:id", ArticleController.unArticulo); // Petición GET para obtener un artículo por su ID
router.delete("/articulo/:id", ArticleController.borrarArticulo); // Petición HTTP DELETE para eliminar un artículo
router.put("/articulo/:id", ArticleController.editarArticulo); // Ruta para editar artículos
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticleController.subirImagen); // La variable "subidas" actúa como middleware, ejecutándose antes que el controlador
router.get("/imagen/:fichero", ArticleController.visualizarImagen); // Ruta para servir imágenes


module.exports = router;