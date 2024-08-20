# Blog Personal - API REST

Este es un proyecto de API REST para un blog personal, desarrollado con Node.js, Express, y MongoDB. La API permite la gestión de artículos del blog, incluyendo la creación, lectura, actualización, eliminación, y la carga y visualización de imágenes asociadas a los artículos.

## Características

- Crear artículos
- Listar todos los artículos o los más recientes
- Obtener un artículo por su ID
- Actualizar artículos
- Eliminar artículos
- Subir imágenes asociadas a un artículo
- Visualizar imágenes almacenadas en el servidor

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose (ODM)
- Multer (para la carga de archivos)
- Validator (para validación de datos)
- CORS

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/blog-personal-api.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd blog-personal-api
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

## Endpoints

### 1. Crear Artículo

- **Método**: `POST`
- **Ruta**: `/api/crear`
- **Descripción**: Crea un nuevo artículo en la base de datos.
- **Cuerpo de la solicitud**:
  ```json
  {
    "titulo": "Título del artículo",
    "contenido": "Contenido del artículo"
  }
  ```

### 2. Listar Artículos

- **Método**: `GET`
- **Ruta**: `/api/articulos/:latest?`
- **Descripción**: Obtén una lista de todos los artículos almacenados en la base de datos. Si se proporciona el parámetro opcional `latest`, se devolverán solo los tres artículos más recientes.
- **Parámetro Opcional**:
  - `latest`: Si está presente, se devolverán solo los 3 artículos más recientes. Útil si en tu homepage quieres sólo 3 artículos.
- **Respuesta de éxito**:

  ```json
  {
    "status": "success",
    "resultados": 3,
    "articles": [
      {
        "_id": "id_del_articulo",
        "titulo": "Título del artículo",
        "contenido": "Contenido del artículo",
        "imagen": "nombre_de_la_imagen.png",
        "date": "fecha_de_creación"
      },
      {
        "_id": "id_de_otro_articulo",
        "titulo": "Otro título",
        "contenido": "Otro contenido",
        "imagen": "otra_imagen.png",
        "date": "otra_fecha"
      }
    ]
  }
  ```

- **Respuesta de error**:

```json
{
  "status": "error",
  "message": "No se encontraron artículos"
}
```

### 3. Obtener artículo por ID

- **Método**: `GET`
- **Ruta**: `/api/articulo/:id`
- **Descripción**: Devuelve un artículo específico por su ID.
- **Parámetro**: - `id`: El ID del artículo que se desea obtener. Este parámetro es obligatorio.

- **Respuesta de éxito**:

```json
{
  "status": "success",
  "articulo": {
    "_id": "id_del_articulo",
    "titulo": "Título del artículo",
    "contenido": "Contenido del artículo",
    "imagen": "nombre_de_la_imagen.png",
    "date": "fecha_de_creación"
  }
}
```

### 4. Eliminar artículo

- **Método**: `DELETE`
- **Ruta**: `/api/articulo/:id`
- **Descripción**: Elimina un artículo específico por su ID.
- **Parámetro**: - `id`: El ID del artículo que se desea eliminar. Este parámetro es obligatorio.

- **Respuesta de éxito**:

```json
{
  "status": "success",
  "mensaje": "Artículo eliminado con éxito",
  "articulo": {
    "_id": "id_del_articulo",
    "titulo": "Título del artículo",
    "contenido": "Contenido del artículo",
    "imagen": "nombre_de_la_imagen.png",
    "date": "fecha_de_creación"
  }
}
```

### 5. Actualizar artículo

- **Método**: `PUT`
- **Ruta**: `/api/articulo/:id`
- **Descripción**: Actualiza un artículo existente por su ID.
- **Parámetro**: - `id`: El ID del artículo que se desea actualizar. Este parámetro es obligatorio.

- **Cuerpo de la petición**:

```json
{
  "titulo": "Nuevo título del artículo",
  "contenido": "Nuevo contenido del artículo",
  "imagen": "nombre_de_la_imagen.png"
}
```

- **Respuesta de éxito**:

```json
{
  "status": "success",
  "mensaje": "Artículo actualizado con éxito",
  "articulo": {
    "_id": "id_del_articulo",
    "titulo": "Nuevo título del artículo",
    "contenido": "Nuevo contenido del artículo",
    "imagen": "nombre_de_la_imagen.png",
    "date": "fecha_de_actualización"
  }
}
```

### 6. Subir imagen

- **Método**: `POST`
- **Ruta**: `/api/subir-imagen/:id`
- **Descripción**: Sube una imagen asociada a un artículo existente.
- **Parámetro**: - `id`: El ID del artículo al que se desea asociar la imagen. Este parámetro es obligatorio.
- **Cuerpo de la petición**: Se debe enviar un archivo en un formulario con el campo `file0`.

- **Respuesta de éxito**:

```json
{
  "status": "success",
  "mensaje": "Imagen subida y artículo actualizado con éxito",
  "fileType": "Tipo de archivo (png, jpg, etc.)",
  "files": {
    "fieldname": "file0",
    "originalname": "nombre_original_de_la_imagen.png",
    "encoding": "7bit",
    "mimetype": "image/png",
    ...
  },
  "articulo": {
    "_id": "id_del_articulo",
    "titulo": "Título del artículo",
    "contenido": "Contenido del artículo",
    "imagen": "nombre_de_la_imagen_subida.png",
    "date": "fecha_de_creación"
  }
}


```

### 7. Ver imagen

- **Método**: `GET`
- **Ruta**: `/api/imagen/:fichero`
- **Descripción**: Devuelve la imagen almacenada en el servidor.
- **Parámetro**: - `fichero`: El nombre del archivo de la imagen que se desea obtener. Este parámetro es obligatorio.
- **Respuesta de error**:

```json
{
  "status": "error",
  "mensaje": "La imagen no existe"
}
```
