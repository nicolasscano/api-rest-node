const validator = require("validator");

const validarArticulo = (parametros) => {
    // Validar que el título no esté vacío y tenga al menos 5 caracteres
    let validarTitulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 5 });

    // Validar que el contenido no esté vacío
    let validarContenido = !validator.isEmpty(parametros.contenido);

    // Verificar que todas las validaciones se cumplan
    if (!validarTitulo || !validarContenido) {
        throw new Error("No se ha validado la información");
    }

    // Si todo es correcto, retornar true
    return true;
}

module.exports = {
    validarArticulo
}