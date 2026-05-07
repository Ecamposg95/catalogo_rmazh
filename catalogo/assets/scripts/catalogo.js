const DEMO_PRODUCTS = [
  {
    nombre: "Cuaderno arcoiris",
    descripcion: "Cuaderno cosido de 100 hojas con portada colorida.",
    precio: 89,
    categoria: "Cuadernos",
    imagen: "",
    badge: "new",
    whatsapp: "5215555555555",
    emoji: "📒"
  },
  {
    nombre: "Set de plumones pastel",
    descripcion: "Paquete con 12 tonos suaves para apuntes y lettering.",
    precio: 135,
    categoria: "Arte",
    imagen: "",
    badge: "hot",
    whatsapp: "5215555555555",
    emoji: "🖍️"
  },
  {
    nombre: "Kit notas adhesivas",
    descripcion: "Notas de colores en varios tamaños para organizar ideas.",
    precio: 62,
    categoria: "Organización",
    imagen: "",
    badge: "",
    whatsapp: "5215555555555",
    emoji: "📝"
  }
];

const state = {
  products: [],
  activeCategory: "Todas",
  query: ""
};

const grid = document.querySelector("#grid-productos");
const filters = document.querySelector("#filtros");
const searchInput = document.querySelector("#busqueda");
const counter = document.querySelector("#contador");
const emptyDataMessage = document.querySelector("#mensaje-datos");
const noResults = document.querySelector("#sin-resultados");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const products = await loadProducts();
  state.products = products.items;
  emptyDataMessage.hidden = !products.isDemo;

  renderFilters();
  renderProducts();

  searchInput.addEventListener("input", (event) => {
    state.query = normalize(event.target.value);
    renderProducts();
  });
}

async function loadProducts() {
  try {
    const response = await fetch("data/productos.json", { cache: "no-store" });
    if (!response.ok) throw new Error("No existe productos.json");

    const data = await response.json();
    const items = Array.isArray(data) ? data : data.productos;
    if (!Array.isArray(items) || items.length === 0) {
      return { items: DEMO_PRODUCTS, isDemo: true };
    }

    return { items, isDemo: false };
  } catch (error) {
    return { items: DEMO_PRODUCTS, isDemo: true };
  }
}

function renderFilters() {
  const categories = ["Todas", ...new Set(state.products.map((product) => product.categoria).filter(Boolean))];
  filters.innerHTML = categories
    .map((category) => {
      const active = category === state.activeCategory ? " active" : "";
      return `<button class="filter-pill${active}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`;
    })
    .join("");

  filters.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  grid.innerHTML = visibleProducts.map(createProductCard).join("");
  counter.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "producto" : "productos"}`;
  noResults.hidden = visibleProducts.length > 0;
}

function getVisibleProducts() {
  return state.products.filter((product) => {
    const categoryMatches = state.activeCategory === "Todas" || product.categoria === state.activeCategory;
    const searchable = normalize(`${product.nombre} ${product.descripcion} ${product.categoria}`);
    return categoryMatches && searchable.includes(state.query);
  });
}

function createProductCard(product) {
  const badge = createBadge(product.badge);
  const imageName = product.imagen ? `media/optimized/productos/${product.imagen}.webp` : "";
  const media = imageName
    ? `<img src="${escapeHtml(imageName)}" alt="${escapeHtml(product.nombre)}" loading="lazy" onerror="showPlaceholder(this)">`
    : `<div class="placeholder" aria-hidden="true">${escapeHtml(product.emoji || "📦")}</div>`;
  const price = formatPrice(product.precio);
  const message = encodeURIComponent(`Hola, me interesa ${product.nombre}. ¿Está disponible?`);
  const phone = String(product.whatsapp || "").replace(/\D/g, "");
  const whatsappUrl = phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`;

  return `
    <article class="product-card">
      <div class="media-wrap">
        ${media}
        ${badge}
      </div>
      <div class="product-body">
        <div class="category">${escapeHtml(product.categoria || "Papelería")}</div>
        <h2 class="product-title">${escapeHtml(product.nombre || "Producto")}</h2>
        <p class="description">${escapeHtml(product.descripcion || "")}</p>
        <div class="price">${price}</div>
        <a class="whatsapp-button" href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </article>
  `;
}

function createBadge(value) {
  if (value === "new") return '<span class="badge badge-new">Nuevo</span>';
  if (value === "hot") return '<span class="badge">🔥 Tendencia</span>';
  return "";
}

function showPlaceholder(image) {
  const placeholder = document.createElement("div");
  placeholder.className = "placeholder";
  placeholder.setAttribute("aria-hidden", "true");
  placeholder.textContent = "📦";
  image.replaceWith(placeholder);
}

function formatPrice(value) {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(amount);
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
