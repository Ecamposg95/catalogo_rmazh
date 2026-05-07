# Arquitectura

El proyecto es un catálogo estático. La carpeta `catalogo/` contiene todo lo necesario para publicar el sitio por FTP o servidor estático.

## Carpetas principales

```text
catalogo/
  index.html
  assets/
    styles/style.css
    scripts/catalogo.js
    images/productos/
  data/
    productos.xlsx
    productos.json
  media/
    optimized/productos/
tools/
  generar_productos.py
  optimizar_imagenes.py
context/
```

## Responsabilidades

- `catalogo/index.html`: estructura HTML y puntos de montaje del catálogo.
- `catalogo/assets/scripts/catalogo.js`: carga `data/productos.json`, filtra productos y renderiza tarjetas.
- `catalogo/assets/styles/style.css`: estilos visuales del catálogo.
- `catalogo/data/productos.xlsx`: fuente editable de productos.
- `catalogo/data/productos.json`: salida generada para el frontend.
- `catalogo/assets/images/productos/`: imágenes fuente sin optimizar.
- `catalogo/media/optimized/productos/`: imágenes WebP generadas para el sitio.
- `tools/`: automatización de datos e imágenes.
