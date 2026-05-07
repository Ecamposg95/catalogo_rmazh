# Catálogo Rmazh

Repositorio para un catálogo estático de productos con búsqueda, filtros por categoría y botones de WhatsApp.

## Estructura

```text
catalogo/                Sitio estático publicable
  index.html             Entrada del catálogo
  assets/styles/         CSS del sitio
  assets/scripts/        JavaScript del catálogo
  assets/images/         Imágenes fuente de productos
  data/                  Excel fuente y JSON generado
  media/optimized/       Imágenes WebP generadas para publicar
tools/                   Scripts de preparación de datos e imágenes
context/                 Contexto técnico y operativo del proyecto
```

## Uso rápido

1. Instala dependencias:

```bash
pip install -r requirements.txt
```

2. Coloca fotos fuente en `catalogo/assets/images/productos/`.
3. Edita `catalogo/data/productos.xlsx`.
4. Optimiza imágenes:

```bash
python tools/optimizar_imagenes.py
```

5. Genera el JSON del catálogo:

```bash
python tools/generar_productos.py
```

6. Revisa el sitio:

```bash
cd catalogo
python -m http.server 8000
```

Abre `http://localhost:8000`.

## Publicación

Sube el contenido completo de `catalogo/` al servidor. Los scripts y `context/` son soporte del repositorio, no necesitan publicarse.
