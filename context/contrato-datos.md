# Contrato de Datos

El archivo `catalogo/data/productos.xlsx` debe tener estos encabezados en la primera fila, en este orden:

```text
nombre, descripcion, precio, categoria, imagen, badge, whatsapp
```

## Columnas

- `nombre`: nombre visible del producto.
- `descripcion`: texto corto para la tarjeta.
- `precio`: número usado para mostrar precio en MXN.
- `categoria`: categoría usada para filtros.
- `imagen`: nombre base del archivo, sin extensión.
- `badge`: acepta `new`, `hot` o vacío.
- `whatsapp`: número con código de país, sin `+`.

## Consumo en frontend

`catalogo/assets/scripts/catalogo.js` carga `data/productos.json`. Si el JSON no existe, está vacío o no puede cargarse, muestra productos demo.

Para productos con imagen, el frontend construye esta ruta:

```text
media/optimized/productos/{imagen}.webp
```
