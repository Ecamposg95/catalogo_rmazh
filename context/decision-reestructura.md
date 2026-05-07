# Decisión de Reestructura

## Objetivo

Ordenar el repositorio separando sitio publicable, herramientas de generación y documentación de contexto.

## Cambios

- Se mantuvo `catalogo/` como carpeta publicable.
- Se normalizaron assets:
  - `assets/css/` pasó a `assets/styles/`.
  - `assets/js/` pasó a `assets/scripts/`.
  - `assets/img/productos/` pasó a `assets/images/productos/`.
- Las imágenes optimizadas pasan a `media/optimized/productos/`.
- Los scripts salieron de `catalogo/scripts/` hacia `tools/`.
- Se agregó `context/` para documentación técnica y operativa.
- Se eliminaron `Luego` y `Pega` porque estaban vacíos.

## Criterio

La carpeta `catalogo/` sigue siendo autosuficiente para publicar el sitio estático. La raíz del repositorio queda para documentación, dependencias y herramientas.
