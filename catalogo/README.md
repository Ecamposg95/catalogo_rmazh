# Catálogo estático

Catálogo estático en HTML para publicar productos de papelería con búsqueda, filtros por categoría y botones de WhatsApp.

## Requisitos

- Python 3.8+
- Librerías del archivo raíz `requirements.txt`:

```bash
pip install -r ../requirements.txt
```

## Pasos de uso

1. Pega tus fotos en `assets/images/productos/` con formato `jpg`, `jpeg`, `png` o `webp`.
2. Llena `data/productos.xlsx` con tus productos reales siguiendo los encabezados de la plantilla.
3. Ejecuta:

```bash
python ../tools/optimizar_imagenes.py
```

4. Ejecuta:

```bash
python ../tools/generar_productos.py
```

5. Abre `index.html` en el navegador para revisar el catálogo. Si tu navegador bloquea la carga local de `data/productos.json`, ejecuta `python -m http.server` dentro de `catalogo/` y abre `http://localhost:8000`.
6. Sube toda la carpeta `catalogo/` a tu servidor por FTP.

## Columnas del Excel

- `nombre`: nombre visible del producto.
- `descripcion`: texto corto para la tarjeta.
- `precio`: precio numérico.
- `categoria`: categoría usada para los filtros.
- `imagen`: nombre del archivo sin extensión. Ejemplo: si la foto es `cuaderno_rojo.jpg`, escribe `cuaderno_rojo`.
- `badge`: usa `new`, `hot` o deja vacío.
- `whatsapp`: número del negocio con código de país, sin `+`.

Si cambias fotos o datos, vuelve a ejecutar los dos scripts desde la raíz del repositorio.
