from pathlib import Path

from PIL import Image, ImageOps


ROOT_DIR = Path(__file__).resolve().parents[1]
CATALOG_DIR = ROOT_DIR / "catalogo"
INPUT_DIR = CATALOG_DIR / "assets" / "images" / "productos"
OUTPUT_DIR = CATALOG_DIR / "media" / "optimized" / "productos"
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
TARGET_SIZE = (600, 600)


def process_image(path: Path) -> None:
    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image)
        image = image.convert("RGB")
        image = ImageOps.fit(image, TARGET_SIZE, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

        output_path = OUTPUT_DIR / f"{path.stem}.webp"
        image.save(output_path, "WEBP", quality=86, method=6)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    images = sorted(path for path in INPUT_DIR.iterdir() if path.suffix.lower() in SUPPORTED_EXTENSIONS)

    processed = 0
    errors: list[tuple[Path, str]] = []

    for image_path in images:
        try:
            process_image(image_path)
            processed += 1
        except Exception as exc:
            errors.append((image_path, str(exc)))

    print(f"Imagenes procesadas: {processed}")
    if errors:
        print(f"Errores: {len(errors)}")
        for path, message in errors:
            print(f"- {path.name}: {message}")
    else:
        print("Errores: 0")


if __name__ == "__main__":
    main()
