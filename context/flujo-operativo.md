# Flujo Operativo

## Actualizar productos

1. Edita `catalogo/data/productos.xlsx`.
2. Ejecuta desde la raíz:

```bash
python tools/generar_productos.py
```

3. Revisa que `catalogo/data/productos.json` se haya actualizado.

## Actualizar imágenes

1. Coloca imágenes fuente en `catalogo/assets/images/productos/`.
2. Usa en el Excel el nombre del archivo sin extensión en la columna `imagen`.
3. Ejecuta desde la raíz:

```bash
python tools/optimizar_imagenes.py
```

4. El sitio buscará cada imagen en `catalogo/media/optimized/productos/{imagen}.webp`.

## Revisión local

```bash
cd catalogo
python -m http.server 8000
```

Abre `http://localhost:8000`.
